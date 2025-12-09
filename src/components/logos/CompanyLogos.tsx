// Company Logo SVG Components
// Simplified, recognizable logos for AI companies

import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
}

// NVIDIA Logo - Stylized "eye" mark
export const NvidiaLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#76B900" />
        <path d="M8 16C8 11.5 11.5 8 16 8V12C13.8 12 12 13.8 12 16C12 18.2 13.8 20 16 20V24C11.5 24 8 20.5 8 16Z" fill="white" />
        <path d="M16 8V12C18.2 12 20 13.8 20 16H24C24 11.5 20.5 8 16 8Z" fill="white" fillOpacity="0.7" />
        <path d="M20 16C20 18.2 18.2 20 16 20V24C20.5 24 24 20.5 24 16H20Z" fill="white" fillOpacity="0.4" />
    </svg>
);

// Meta Logo - Infinity symbol
export const MetaLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#0866FF" />
        <path d="M8 16C8 13.2 9.5 11 11.5 11C13.5 11 15 13 16 15C17 13 18.5 11 20.5 11C22.5 11 24 13.2 24 16C24 18.8 22.5 21 20.5 21C18.5 21 17 19 16 17C15 19 13.5 21 11.5 21C9.5 21 8 18.8 8 16Z" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);

// Google Logo - Multicolor G
export const GoogleLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#4285F4" />
        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">G</text>
    </svg>
);

// Microsoft Logo - Four squares
export const MicrosoftLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#00A4EF" />
        <rect x="8" y="8" width="7" height="7" fill="#F25022" />
        <rect x="17" y="8" width="7" height="7" fill="#7FBA00" />
        <rect x="8" y="17" width="7" height="7" fill="#00A4EF" />
        <rect x="17" y="17" width="7" height="7" fill="#FFB900" />
    </svg>
);

// OpenAI Logo - Hexagon/flower
export const OpenAILogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#10A37F" />
        <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="3" fill="white" />
    </svg>
);

// Anthropic Logo - Abstract A
export const AnthropicLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#D4A27F" />
        <path d="M16 8L24 24H20L18 20H14L12 24H8L16 8Z" fill="white" />
        <path d="M16 14L17.5 17.5H14.5L16 14Z" fill="#D4A27F" />
    </svg>
);

// Amazon Logo - Arrow/smile
export const AmazonLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#FF9900" />
        <text x="16" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">a</text>
        <path d="M10 22C13 24 19 24 22 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
);

// Apple Logo
export const AppleLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#555555" />
        <path d="M16 10C17 8 19 8 19 8C19 8 19 10 18 11C17 12 16 12 16 12C16 12 15 10 16 10Z" fill="white" />
        <path d="M12 13C14 12 15 13 16 13C17 13 18 12 20 13C22 14 23 17 22 21C21 24 19 25 18 25C17 25 16.5 24.5 16 24.5C15.5 24.5 15 25 14 25C13 25 11 24 10 21C9 17 10 14 12 13Z" fill="white" />
    </svg>
);

// xAI Logo - X mark
export const XAILogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#000000" />
        <path d="M10 10L22 22M22 10L10 22" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// Mistral Logo - Wind/spiral
export const MistralLogo = ({ className = '', size = 32 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
        <rect width="32" height="32" rx="6" fill="#F7D046" />
        <rect x="8" y="10" width="4" height="4" fill="#000" />
        <rect x="14" y="10" width="4" height="4" fill="#000" />
        <rect x="20" y="10" width="4" height="4" fill="#000" />
        <rect x="8" y="18" width="4" height="4" fill="#000" />
        <rect x="14" y="18" width="4" height="4" fill="#000" />
        <rect x="20" y="18" width="4" height="4" fill="#000" />
    </svg>
);

// Mapping of company IDs to logo components
export const COMPANY_LOGOS: Record<string, React.FC<LogoProps>> = {
    nvidia: NvidiaLogo,
    meta: MetaLogo,
    google: GoogleLogo,
    microsoft: MicrosoftLogo,
    openai: OpenAILogo,
    anthropic: AnthropicLogo,
    amazon: AmazonLogo,
    apple: AppleLogo,
    xai: XAILogo,
    mistral: MistralLogo,
};

// Generic company logo component
export const CompanyLogo = ({
    companyId,
    className = '',
    size = 32,
    fallbackColor = '#6B7280'
}: LogoProps & { companyId: string; fallbackColor?: string }) => {
    const LogoComponent = COMPANY_LOGOS[companyId];

    if (LogoComponent) {
        return <LogoComponent className={className} size={size} />;
    }

    // Fallback: colored square with first letter
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
            <rect width="32" height="32" rx="6" fill={fallbackColor} />
            <text x="16" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">
                {companyId.charAt(0).toUpperCase()}
            </text>
        </svg>
    );
};

export default CompanyLogo;
