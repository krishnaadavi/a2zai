import { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageSquare,
  Code,
  PenTool,
  Briefcase,
  GraduationCap,
  Search,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Zap,
  Brain,
  FileText,
} from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import { ShareButtons } from '@/components/ShareButton';

export const metadata: Metadata = {
  title: 'AI Prompt Library | Ready-to-Use Prompts | A2Z AI',
  description: 'Curated collection of AI prompts for ChatGPT, Claude, Gemini, and more. Copy-paste prompts for coding, writing, marketing, research, and creative work.',
};

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  model?: string;
}

const promptCategories = [
  { id: 'all', name: 'All Prompts', icon: Sparkles },
  { id: 'coding', name: 'Coding', icon: Code },
  { id: 'writing', name: 'Writing', icon: PenTool },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'learning', name: 'Learning', icon: GraduationCap },
  { id: 'research', name: 'Research', icon: Search },
  { id: 'creative', name: 'Creative', icon: Lightbulb },
];

const prompts: Prompt[] = [
  // Coding Prompts
  {
    id: 'code-review',
    title: 'Code Review Assistant',
    description: 'Get a thorough code review with suggestions for improvement',
    prompt: `Review this code and provide feedback on:
1. Potential bugs or errors
2. Performance optimizations
3. Security vulnerabilities
4. Code style and readability
5. Best practices

For each issue found, explain why it's a problem and suggest a fix.

Code to review:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``,
    category: 'coding',
    tags: ['code review', 'debugging', 'best practices'],
  },
  {
    id: 'explain-code',
    title: 'Code Explainer',
    description: 'Get a detailed explanation of how code works',
    prompt: `Explain this code in detail:
1. What does this code do overall?
2. Walk through it line by line
3. Explain any complex logic or patterns used
4. What are the inputs and outputs?
5. Are there any edge cases to consider?

Code:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``,
    category: 'coding',
    tags: ['learning', 'explanation', 'documentation'],
  },
  {
    id: 'convert-code',
    title: 'Code Converter',
    description: 'Convert code from one language to another',
    prompt: `Convert this [SOURCE LANGUAGE] code to [TARGET LANGUAGE].

Requirements:
- Maintain the same functionality
- Use idiomatic patterns for the target language
- Add comments explaining any significant changes
- Handle any language-specific differences (e.g., null handling, async patterns)

Original code:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``,
    category: 'coding',
    tags: ['conversion', 'translation', 'migration'],
  },
  {
    id: 'regex-helper',
    title: 'Regex Generator',
    description: 'Generate and explain regular expressions',
    prompt: `Create a regular expression that matches: [DESCRIBE WHAT YOU WANT TO MATCH]

Please provide:
1. The regex pattern
2. A breakdown of each part of the pattern
3. Test cases showing what it matches and doesn't match
4. Any edge cases to be aware of
5. The regex in multiple flavors if needed (JavaScript, Python, etc.)`,
    category: 'coding',
    tags: ['regex', 'pattern matching', 'validation'],
  },
  {
    id: 'api-design',
    title: 'API Designer',
    description: 'Design RESTful API endpoints',
    prompt: `Design a RESTful API for: [DESCRIBE YOUR USE CASE]

Please include:
1. Endpoint URLs and HTTP methods
2. Request/response schemas (JSON)
3. Authentication approach
4. Error handling and status codes
5. Pagination strategy (if applicable)
6. Rate limiting considerations
7. Example requests and responses`,
    category: 'coding',
    tags: ['api', 'design', 'architecture'],
  },

  // Writing Prompts
  {
    id: 'blog-outline',
    title: 'Blog Post Outliner',
    description: 'Create a structured outline for a blog post',
    prompt: `Create a detailed blog post outline for: "[TOPIC]"

Target audience: [DESCRIBE YOUR AUDIENCE]
Tone: [casual/professional/educational/entertaining]
Target length: [word count]

Include:
1. Compelling title options (3 variations)
2. Hook/introduction angle
3. Main sections with subpoints
4. Key takeaways
5. Call-to-action ideas
6. SEO keywords to target`,
    category: 'writing',
    tags: ['blog', 'content', 'outline'],
  },
  {
    id: 'rewrite-tone',
    title: 'Tone Adjuster',
    description: 'Rewrite text in a different tone or style',
    prompt: `Rewrite the following text in a [TARGET TONE] tone.

Target tone options: professional, casual, friendly, formal, persuasive, empathetic, authoritative, humorous

Original text:
"""
[PASTE YOUR TEXT HERE]
"""

Please:
1. Maintain the core message
2. Adjust vocabulary and sentence structure
3. Keep approximately the same length
4. Highlight key changes you made`,
    category: 'writing',
    tags: ['editing', 'tone', 'rewriting'],
  },
  {
    id: 'summarizer',
    title: 'Smart Summarizer',
    description: 'Summarize long content at different levels',
    prompt: `Summarize the following content at three levels:

1. **TL;DR** (1-2 sentences)
2. **Executive Summary** (1 paragraph)
3. **Detailed Summary** (bullet points covering all key points)

Also extract:
- Key statistics or data points
- Main arguments or claims
- Action items (if any)

Content to summarize:
"""
[PASTE YOUR CONTENT HERE]
"""`,
    category: 'writing',
    tags: ['summary', 'condensing', 'analysis'],
  },
  {
    id: 'email-writer',
    title: 'Professional Email Writer',
    description: 'Draft professional emails for any situation',
    prompt: `Write a professional email for the following situation:

Context: [DESCRIBE THE SITUATION]
Recipient: [WHO ARE YOU WRITING TO]
Goal: [WHAT DO YOU WANT TO ACHIEVE]
Tone: [formal/friendly/urgent/apologetic]

Please provide:
1. Subject line (3 options)
2. Full email body
3. Appropriate sign-off
4. Follow-up reminder suggestion`,
    category: 'writing',
    tags: ['email', 'professional', 'communication'],
  },

  // Business Prompts
  {
    id: 'swot-analysis',
    title: 'SWOT Analysis Generator',
    description: 'Create a comprehensive SWOT analysis',
    prompt: `Perform a SWOT analysis for: [COMPANY/PRODUCT/IDEA]

Industry context: [DESCRIBE THE INDUSTRY]
Competitors: [LIST MAIN COMPETITORS]

Provide a detailed analysis of:

**Strengths** (internal positive factors)
- List 5-7 key strengths with explanations

**Weaknesses** (internal negative factors)
- List 5-7 key weaknesses with explanations

**Opportunities** (external positive factors)
- List 5-7 opportunities with potential impact

**Threats** (external negative factors)
- List 5-7 threats with risk assessment

Conclude with strategic recommendations based on the analysis.`,
    category: 'business',
    tags: ['strategy', 'analysis', 'planning'],
  },
  {
    id: 'pitch-deck',
    title: 'Pitch Deck Outline',
    description: 'Structure a compelling startup pitch deck',
    prompt: `Create a pitch deck outline for: [YOUR STARTUP/IDEA]

Provide slide-by-slide content for:

1. **Title Slide** - Company name, tagline, presenter
2. **Problem** - What problem are you solving?
3. **Solution** - How do you solve it?
4. **Market Size** - TAM, SAM, SOM
5. **Business Model** - How do you make money?
6. **Traction** - Key metrics and milestones
7. **Competition** - Competitive landscape
8. **Team** - Why are you the right team?
9. **Financials** - Projections and key metrics
10. **Ask** - What are you raising and for what?

For each slide, provide:
- Key points to include
- Suggested visuals
- Common mistakes to avoid`,
    category: 'business',
    tags: ['startup', 'pitch', 'fundraising'],
  },
  {
    id: 'meeting-agenda',
    title: 'Meeting Agenda Creator',
    description: 'Create effective meeting agendas',
    prompt: `Create a meeting agenda for: [MEETING PURPOSE]

Meeting details:
- Duration: [TIME]
- Attendees: [WHO'S ATTENDING]
- Meeting type: [standup/brainstorm/review/planning/1:1]

Please provide:
1. Pre-meeting preparation items for attendees
2. Timed agenda items with owners
3. Discussion questions for each topic
4. Decision points needed
5. Action items template
6. Follow-up meeting needs`,
    category: 'business',
    tags: ['meetings', 'productivity', 'planning'],
  },

  // Learning Prompts
  {
    id: 'explain-concept',
    title: 'Concept Explainer',
    description: 'Learn any concept with the Feynman technique',
    prompt: `Explain [CONCEPT] using the Feynman Technique:

1. **Simple Explanation**: Explain it like I'm 12 years old
2. **Analogy**: Give me a real-world analogy
3. **Technical Explanation**: Now explain it more technically
4. **Common Misconceptions**: What do people often get wrong?
5. **Practical Application**: How is this used in practice?
6. **Further Learning**: What should I learn next?

Current knowledge level: [beginner/intermediate/advanced]`,
    category: 'learning',
    tags: ['education', 'concepts', 'learning'],
  },
  {
    id: 'study-plan',
    title: 'Study Plan Generator',
    description: 'Create a personalized study plan',
    prompt: `Create a study plan for learning: [SUBJECT/SKILL]

My details:
- Current level: [beginner/intermediate/advanced]
- Available time: [hours per week]
- Learning goal: [what do you want to achieve]
- Deadline: [if any]
- Learning style: [visual/reading/hands-on/video]

Please provide:
1. Week-by-week breakdown
2. Specific resources (books, courses, videos)
3. Practice exercises for each phase
4. Milestones to track progress
5. Common pitfalls to avoid
6. How to know when I've mastered it`,
    category: 'learning',
    tags: ['study', 'planning', 'education'],
  },
  {
    id: 'flashcards',
    title: 'Flashcard Generator',
    description: 'Create effective flashcards for any topic',
    prompt: `Create 20 flashcards for studying: [TOPIC]

For each flashcard provide:
- **Front**: Question or prompt
- **Back**: Answer with brief explanation
- **Mnemonic**: Memory trick (if applicable)

Organize them by:
1. Basic concepts (5 cards)
2. Intermediate concepts (10 cards)
3. Advanced applications (5 cards)

Content to create flashcards from:
"""
[PASTE YOUR STUDY MATERIAL OR LEAVE BLANK FOR GENERAL TOPIC]
"""`,
    category: 'learning',
    tags: ['flashcards', 'memorization', 'study'],
  },

  // Research Prompts
  {
    id: 'literature-review',
    title: 'Literature Review Helper',
    description: 'Analyze and synthesize research papers',
    prompt: `Help me create a literature review structure for: [RESEARCH TOPIC]

Please provide:
1. Key themes to organize the review around
2. Important questions to address
3. How to identify seminal papers vs recent advances
4. Framework for comparing methodologies
5. Template for synthesizing findings
6. How to identify gaps in the literature

If I provide paper summaries, help me:
- Identify common themes
- Note contradictions
- Synthesize findings
- Identify research gaps`,
    category: 'research',
    tags: ['academic', 'literature', 'research'],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis Guide',
    description: 'Get guidance on analyzing your data',
    prompt: `Guide me through analyzing this data:

Data description: [DESCRIBE YOUR DATASET]
Variables: [LIST KEY VARIABLES]
Research question: [WHAT ARE YOU TRYING TO FIND OUT]
Sample size: [N]

Please provide:
1. Appropriate statistical tests to use
2. Assumptions to check
3. Step-by-step analysis process
4. How to interpret results
5. Visualizations to create
6. Common pitfalls to avoid
7. How to report findings`,
    category: 'research',
    tags: ['data', 'statistics', 'analysis'],
  },

  // Creative Prompts
  {
    id: 'image-prompt',
    title: 'Image Prompt Generator',
    description: 'Create detailed prompts for AI image generation',
    prompt: `Create 5 detailed image generation prompts for: [DESCRIBE WHAT YOU WANT]

For each prompt, include:
1. Main subject description
2. Art style (e.g., photorealistic, digital art, oil painting)
3. Lighting and mood
4. Composition and framing
5. Color palette
6. Technical specifications (aspect ratio, quality tags)

Optimize for: [Midjourney/DALL-E/Stable Diffusion]

Example format:
"[subject], [style], [lighting], [mood], [details], [technical specs]"`,
    category: 'creative',
    tags: ['image', 'art', 'midjourney', 'dall-e'],
  },
  {
    id: 'story-starter',
    title: 'Story Starter',
    description: 'Generate creative story ideas and openings',
    prompt: `Generate a story concept for:

Genre: [GENRE]
Tone: [dark/light/humorous/serious]
Setting: [TIME PERIOD AND LOCATION]
Length: [short story/novella/novel]

Please provide:
1. High-concept premise (1 sentence)
2. Three potential opening hooks
3. Main character sketch
4. Central conflict
5. Key plot points
6. Potential themes to explore
7. First 200 words of the story`,
    category: 'creative',
    tags: ['writing', 'fiction', 'storytelling'],
  },
  {
    id: 'brainstorm',
    title: 'Creative Brainstormer',
    description: 'Generate creative ideas using various techniques',
    prompt: `Help me brainstorm ideas for: [YOUR CHALLENGE/TOPIC]

Use these techniques:

1. **SCAMPER Method**
   - Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse

2. **Random Word Association**
   - Generate 5 random concepts and connect them to the challenge

3. **What If Scenarios**
   - 5 "What if..." questions that challenge assumptions

4. **Opposite Thinking**
   - What's the opposite of the obvious solution?

5. **Analogy Thinking**
   - How do other industries solve similar problems?

Provide at least 15 unique ideas ranging from practical to wild.`,
    category: 'creative',
    tags: ['brainstorming', 'ideation', 'creativity'],
  },
];

export default function PromptsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <MessageSquare className="h-4 w-4" />
            {prompts.length} Ready-to-Use Prompts
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Prompt Library</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Copy-paste prompts for ChatGPT, Claude, Gemini, and more. Tested and optimized for best results.
          </p>
          <div className="mt-6">
            <ShareButtons url="https://a2zai.ai/prompts" title="AI Prompt Library - A2Z AI" />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-4 border-b border-gray-800 sticky top-0 bg-gray-950/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {promptCategories.map((cat) => (
              <a
                key={cat.id}
                href={cat.id === 'all' ? '#prompts' : `#${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section id="prompts" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {promptCategories.slice(1).map((category) => {
            const categoryPrompts = prompts.filter((p) => p.category === category.id);
            if (categoryPrompts.length === 0) return null;

            return (
              <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <span className="text-sm text-gray-500">({categoryPrompts.length} prompts)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{prompt.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>

                      {/* Prompt Preview */}
                      <div className="relative group">
                        <pre className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-sm text-gray-300 overflow-x-auto max-h-48 overflow-y-auto whitespace-pre-wrap font-mono">
                          {prompt.prompt}
                        </pre>
                        <CopyButton
                          text={prompt.prompt}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {prompt.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Prompt Engineering Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white">Be Specific</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Include context, constraints, and examples. The more specific your prompt, the better the output.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Brain className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Assign a Role</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Start with "You are a..." to give the AI context about the perspective you want.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">Structure Output</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Ask for numbered lists, headers, or specific formats to get organized responses.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white">Iterate</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Refine your prompts based on outputs. Ask follow-up questions to improve results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/20 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Learn more about prompting</h2>
          <p className="text-gray-400 mb-8">
            Check out our AI 101 course to learn the fundamentals, or explore use cases for more ideas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/learn/101/prompting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-colors"
            >
              Learn Prompting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Explore Use Cases
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
