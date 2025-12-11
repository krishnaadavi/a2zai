type Props = {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
};

export default function Logo({ size = 'md', showTagline = false, className = '' }: Props) {
  const sizes = {
    sm: { height: 24, text: 'text-lg' },
    md: { height: 32, text: 'text-xl' },
    lg: { height: 48, text: 'text-3xl' },
  };

  const { height, text } = sizes[size];

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-1.5">
        {/* A2Z Logo Mark */}
        <svg
          height={height}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          {/* Rounded square background */}
          <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#logoGradient)" />
          {/* A→Z text */}
          <text
            x="20"
            y="27"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            A→Z
          </text>
        </svg>

        {/* Wordmark */}
        <div className="flex flex-col leading-none">
          <span className={`${text} font-black tracking-tight`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              A2Z
            </span>
            <span className="text-white ml-1">AI</span>
          </span>
          {showTagline && (
            <span className="text-[10px] text-gray-500 tracking-wide mt-0.5">
              Stay AI-current
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
