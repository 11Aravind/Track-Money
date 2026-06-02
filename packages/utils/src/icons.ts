export const ICON_NAMES = [
  'Utensils', 'Fuel', 'ShoppingBag', 'FileText', 'Banknote', 'Coins', 'Receipt', 
  'Home', 'Car', 'Gamepad2', 'Smartphone', 'Plane', 'Hospital', 'Book', 
  'ShieldCheck', 'Gift', 'Coffee', 'Dumbbell', 'Music', 'Wifi', 'Handshake', 
  'Wallet', 'Landmark', 'CreditCard', 'TrendingDown', 'TrendingUp', 'UserCheck', 
  'UserX', 'ShoppingBasket', 'Sprout', 'Tractor', 'Leaf', 'Trees', 'Wrench', 
  'Hammer', 'HardHat', 'Construction', 'Building', 'Fence', 'Droplets', 'Shovel'
];

export const FEATURED_ICONS = ICON_NAMES.map(name => ({ name, icon: name }));

export const EMOJI_TO_LUCIDE: Record<string, string> = {
  '🍔': 'Utensils',
  '⛽': 'Fuel',
  '🛍️': 'ShoppingBag',
  '📄': 'FileText',
  '💰': 'Wallet',
  '💵': 'Banknote',
  '💸': 'Banknote',
  '🏦': 'Landmark',
  '🤝': 'Handshake',
  '🏧': 'CreditCard',
  '🏠': 'Home',
  '🚗': 'Car',
  '🎮': 'Gamepad2',
  '📱': 'Smartphone',
  '✈️': 'Plane',
  '🏥': 'Hospital',
  '📚': 'Book'
};
