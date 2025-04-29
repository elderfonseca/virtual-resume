// src/config/colors.js

/**
 * Theme color palette
 * Following the requested palette: #222831 #393E46 #00ADB5 #00FFF5
 */
const colors = {
  // Main colors
  primary: {
    dark: '#00ADB5', // Dark turquoise (main actions, buttons)
    light: '#00FFF5', // Light turquoise (highlights, animations)
  },

  // Background colors
  background: {
    primary: '#222831', // Almost black (main background)
    secondary: '#393E46', // Dark gray (card backgrounds, secondary elements)
  },

  // Text colors
  text: {
    primary: '#FFFFFF', // White (main text)
    secondary: '#CCCCCC', // Light gray (secondary text)
    accent: '#00FFF5', // Light turquoise (highlighted text)
  },

  // State colors
  state: {
    success: '#4CAF50', // Green
    error: '#F44336', // Red
    warning: '#FFC107', // Yellow
    info: '#00ADB5', // Turquoise blue
  },
};

export default colors;
