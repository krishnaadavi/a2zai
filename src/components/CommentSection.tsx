'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MessageCircle, Send, Trash2, Reply, User, LogIn } from 'lucide-react';
import Link from 'next/link';

interface CommentUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: CommentUser;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleId: string;
  articleType: 'news' | 'glossary' | 'explainer';
}

export default function CommentSection({ articleId, articleType }: CommentSectionProps) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `/api/comments?articleId=${encodeURIComponent(articleId)}&articleType=${articleType}`
        );
        const data = await res.json();
        if (data.success) {
          setComments(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId, articleType]);

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const content = parentId ? replyContent : newComment;

    if (!content.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          articleType,
          content: content.trim(),
          parentId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (parentId) {
          // Add reply to parent comment
          setComments(prev =>
            prev.map(c =>
              c.id === parentId
                ? { ...c, replies: [...(c.replies || []), data.data] }
                : c
            )
          );
          setReplyContent('');
          setReplyingTo(null);
        } else {
          // Add new top-level comment
          setComments(prev => [data.data, ...prev]);
          setNewComment('');
        }
      } else {
        setError(data.error || 'Failed to post comment');
      }
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        // Remove from comments or replies
        setComments(prev =>
          prev
            .filter(c => c.id !== commentId)
            .map(c => ({
              ...c,
              replies: c.replies?.filter(r => r.id !== commentId),
            }))
        );
      }
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const isOwner = session?.user?.email && comment.user.id === session.user.email;

    return (
      <div className={`${isReply ? 'ml-8 mt-3' : 'mb-4'}`}>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-start gap-3">
            {comment.user.image ? (
              <img
                src={comment.user.image}
                alt={comment.user.name || 'User'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-white text-sm">
                  {comment.user.name || 'Anonymous'}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
              <div className="flex items-center gap-3 mt-2">
                {!isReply && session && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-gray-400 hover:text-purple-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                )}
                {session?.user?.email === comment.user.id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reply form */}
          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-3 pl-11">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={2}
                maxLength={2000}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!replyContent.trim() || submitting}
                  className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reply
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="border-l-2 border-gray-700 ml-4">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 border-t border-gray-800 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">
          Discussion {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {/* Comment form */}
      {status === 'loading' ? (
        <div className="bg-gray-800/30 rounded-lg p-4 mb-6 animate-pulse">
          <div className="h-20 bg-gray-700/50 rounded" />
        </div>
      ) : session ? (
        <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
          <div className="flex items-start gap-3">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'You'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
                maxLength={2000}
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-xs">
                  {newComment.length}/2000
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-800/30 rounded-lg p-6 mb-6 text-center">
          <LogIn className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400 mb-3">Sign in to join the discussion</p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-700 rounded mb-1" />
                  <div className="h-3 w-3/4 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
