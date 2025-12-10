export const Colors = {
  primary: '#6C5CE7', // Magical Purple
  secondary: '#00CEC9', // Mystic Teal
  accent: '#FD79A8', // Fairy Pink
  background: '#2D3436', // Deep Dark Background for contrast
  surface: '#1E272E', // Slightly lighter background for cards
  text: '#DFE6E9',
  gold: '#FDCB6E', // For coins and rewards
  success: '#00B894',
  danger: '#FF7675',
  
  // Game Board specific
  boardBackground: '#090A0C',
  tileGlow: 'rgba(255, 255, 255, 0.3)',
  
  // UI Elements
  button: '#6C5CE7',
  buttonText: '#FFFFFF',
  
  gradients: {
    primary: ['#6C5CE7', '#a29bfe'],
    gold: ['#FDCB6E', '#E17055'],
    mystic: ['#0984e3', '#00CEC9'],
    dark: ['#2d3436', '#000000'],
  }
} as const;

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: Colors.primary,
    tabIconDefault: '#ccc',
    tabIconSelected: Colors.primary,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: Colors.primary,
    tabIconDefault: '#ccc',
    tabIconSelected: Colors.primary,
  },
};
