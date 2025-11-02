import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: 'black' | 'yellow';
}

const defaultSize = 32;

// Rocket Icon - Enterprise AI & Distributed Systems
export const RocketIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rocket body */}
      <path d="M32 10 L38 26 L32 60 L26 26 Z" fill={fillColor} />

      {/* Left fin */}
      <path d="M26 40 L10 50 L16 44 Z" fill={fillColor} />

      {/* Right fin */}
      <path d="M38 40 L54 50 L48 44 Z" fill={fillColor} />

      {/* Rocket window */}
      <circle cx="32" cy="22" r="4" fill="white" stroke={fillColor} strokeWidth="2" />
    </svg>
  );
};

// Brain Icon - Machine Learning & AI
export const BrainIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left hemisphere */}
      <path d="M20 32 C20 20 26 14 32 14 C32 14 28 20 28 32 C28 44 26 50 20 50" fill={fillColor} />

      {/* Right hemisphere */}
      <path d="M44 32 C44 20 38 14 32 14 C32 14 36 20 36 32 C36 44 38 50 44 50" fill={fillColor} />

      {/* Center connection */}
      <line x1="28" y1="32" x2="36" y2="32" stroke={fillColor} strokeWidth="2" />

      {/* Lobes detail */}
      <circle cx="20" cy="24" r="3" fill={fillColor} />
      <circle cx="44" cy="24" r="3" fill={fillColor} />
      <circle cx="20" cy="40" r="3" fill={fillColor} />
      <circle cx="44" cy="40" r="3" fill={fillColor} />
    </svg>
  );
};

// Code/Terminal Icon - Fullstack Development
export const CodeIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Terminal window */}
      <rect x="10" y="12" width="44" height="40" fill="none" stroke={fillColor} />

      {/* Title bar */}
      <line x1="10" y1="20" x2="54" y2="20" stroke={fillColor} />

      {/* Code lines */}
      <line x1="16" y1="28" x2="32" y2="28" stroke={fillColor} />
      <line x1="16" y1="36" x2="42" y2="36" stroke={fillColor} />
      <line x1="16" y1="44" x2="38" y2="44" stroke={fillColor} />

      {/* Angle brackets */}
      <path d="M42 26 L46 30" stroke={fillColor} strokeWidth="2" />
      <path d="M46 30 L42 34" stroke={fillColor} strokeWidth="2" />
    </svg>
  );
};

// Cloud Icon - Cloud & Infrastructure
export const CloudIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cloud shape */}
      <path
        d="M16 42 C12 42 10 38 10 34 C10 30 12 28 16 26 C16 20 20 16 26 16 C28 12 32 10 36 10 C44 10 50 16 50 24 C54 24 56 26 56 30 C56 36 52 42 46 42 Z"
        fill={fillColor}
      />
    </svg>
  );
};

// Lock Icon - Enterprise Security
export const LockIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Lock body */}
      <rect x="18" y="28" width="28" height="26" fill={fillColor} />

      {/* Lock top/shackle */}
      <path
        d="M24 28 C24 18 24 12 32 12 C40 12 40 18 40 28"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
      />

      {/* Keyhole */}
      <circle cx="32" cy="38" r="3" fill="white" stroke={fillColor} strokeWidth="2" />
    </svg>
  );
};

// Analytics/Graph Icon - Data Engineering
export const AnalyticsIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Base line */}
      <line x1="10" y1="50" x2="54" y2="50" stroke={fillColor} />

      {/* Y axis */}
      <line x1="10" y1="50" x2="10" y2="14" stroke={fillColor} />

      {/* Bar 1 */}
      <rect x="16" y="36" width="6" height="14" fill={fillColor} />

      {/* Bar 2 */}
      <rect x="26" y="28" width="6" height="22" fill={fillColor} />

      {/* Bar 3 */}
      <rect x="36" y="20" width="6" height="30" fill={fillColor} />

      {/* Bar 4 */}
      <rect x="46" y="26" width="6" height="24" fill={fillColor} />
    </svg>
  );
};

// Hospital/Health Icon - Healthcare Projects
export const HealthIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hospital building */}
      <rect x="14" y="20" width="36" height="34" fill={fillColor} />

      {/* Roof */}
      <path d="M14 20 L32 8 L50 20" fill={fillColor} />

      {/* Medical cross */}
      <g fill="white">
        <rect x="28" y="28" width="8" height="20" />
        <rect x="22" y="34" width="20" height="8" />
      </g>

      {/* Window */}
      <rect x="20" y="26" width="6" height="6" fill="white" stroke={fillColor} strokeWidth="1.5" />
      <rect x="38" y="26" width="6" height="6" fill="white" stroke={fillColor} strokeWidth="1.5" />
    </svg>
  );
};

// Robot/AI Icon - AI Projects
export const RobotIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <rect x="18" y="12" width="28" height="24" fill={fillColor} />

      {/* Body */}
      <rect x="22" y="36" width="20" height="22" fill={fillColor} />

      {/* Left eye */}
      <circle cx="26" cy="20" r="4" fill="white" stroke={fillColor} strokeWidth="1.5" />

      {/* Right eye */}
      <circle cx="38" cy="20" r="4" fill="white" stroke={fillColor} strokeWidth="1.5" />

      {/* Antenna left */}
      <line x1="24" y1="12" x2="20" y2="4" stroke={fillColor} strokeWidth="2" />

      {/* Antenna right */}
      <line x1="40" y1="12" x2="44" y2="4" stroke={fillColor} strokeWidth="2" />
    </svg>
  );
};

// Search/Magnifying Glass Icon - Research Projects
export const SearchIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circle (magnifying glass) */}
      <circle cx="26" cy="26" r="14" fill="none" stroke={fillColor} />

      {/* Handle */}
      <line x1="38" y1="38" x2="50" y2="50" stroke={fillColor} strokeWidth="2" />

      {/* Center dot */}
      <circle cx="26" cy="26" r="3" fill={fillColor} />
    </svg>
  );
};

// Chat/Message Icon - Chatbot projects
export const ChatIcon: React.FC<IconProps> = ({ className = '', size = defaultSize, color = 'black' }) => {
  const fillColor = color === 'yellow' ? '#FCD34D' : '#000000';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bubble 1 */}
      <path
        d="M10 16 C10 14 12 12 14 12 L42 12 C44 12 46 14 46 16 L46 32 C46 34 44 36 42 36 L18 36 L12 42 L16 36 L14 36 C12 36 10 34 10 32 Z"
        fill={fillColor}
      />

      {/* Bubble 2 */}
      <path
        d="M50 28 C50 26 52 24 54 24 L56 24 C58 24 60 26 60 28 L60 36 C60 38 58 40 56 40 L54 40 L50 44 L52 40 L54 40 C52 40 50 38 50 36 Z"
        fill={fillColor}
      />

      {/* Text lines in bubble 1 */}
      <line x1="18" y1="20" x2="38" y2="20" stroke="white" strokeWidth="1" />
      <line x1="18" y1="26" x2="38" y2="26" stroke="white" strokeWidth="1" />
    </svg>
  );
};

// Export all icons as a map for easy access
export const iconMap: Record<string, React.FC<IconProps>> = {
  '🚀': RocketIcon,
  '🧠': BrainIcon,
  '💻': CodeIcon,
  '☁️': CloudIcon,
  '🔒': LockIcon,
  '📊': AnalyticsIcon,
  '🏥': HealthIcon,
  '🤖': RobotIcon,
  '🔍': SearchIcon,
  '💬': ChatIcon,
};

// Icon wrapper component that maps emoji to SVG
interface IconWrapperProps extends IconProps {
  emoji: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  emoji,
  className = '',
  size = defaultSize,
  color = 'black',
}) => {
  const IconComponent = iconMap[emoji];
  if (!IconComponent) {
    return <span className={className}>{emoji}</span>;
  }
  return <IconComponent className={className} size={size} color={color} />;
};
