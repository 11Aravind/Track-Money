import * as LucideIcons from 'lucide-react';

const IconRenderer = ({ iconName, className = 'w-6 h-6', fallback = '💰' }) => {
  if (!iconName) return <span className={className}>{fallback}</span>;

  // Format to standard PascalCase if necessary (e.g. coffee -> Coffee, paw-print -> PawPrint)
  const formattedName = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const IconComponent = LucideIcons[formattedName] || LucideIcons[iconName];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  // If not a Lucide icon, assume it's an emoji (legacy)
  return <span className={className}>{iconName}</span>;
};

export default IconRenderer;
