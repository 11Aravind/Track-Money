import { ICON_MAP } from '../../utils/iconMapping';

const IconRenderer = ({ iconName, className = 'w-6 h-6', fallback = '💰' }) => {
  if (!iconName) return <span className={className}>{fallback}</span>;

  // Check if iconName is already a Lucide icon name
  const IconComponent = ICON_MAP[iconName];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  // If not a Lucide icon, assume it's an emoji (legacy)
  return <span className={className}>{iconName}</span>;
};

export default IconRenderer;
