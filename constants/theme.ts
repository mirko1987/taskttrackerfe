export const Colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7B79E9',
  
  // Semantic colors
  success: '#34C759',
  successDark: '#248A3D',
  successLight: '#5DD67D',
  
  warning: '#FF9500',
  warningDark: '#CC7700',
  warningLight: '#FFB143',
  
  error: '#FF3B30',
  errorDark: '#CC2F26',
  errorLight: '#FF6B62',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  
  gray900: '#1C1C1E',
  gray800: '#2C2C2E',
  gray700: '#3A3A3C',
  gray600: '#48484A',
  gray500: '#636366',
  gray400: '#8E8E93',
  gray300: '#C7C7CC',
  gray200: '#D1D1D6',
  gray100: '#F2F2F7',
  gray50: '#F9F9F9',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#F9F9F9',
  surface: '#FFFFFF',
  
  // Text colors
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textPlaceholder: '#C7C7CC',
  textInverse: '#FFFFFF',
  
  // Border colors
  border: '#C6C6C8',
  borderSecondary: '#E5E5EA',
  separator: '#E5E5EA',
} as const;


export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;


export const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
  },fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
} as const;

export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
} as const;

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

