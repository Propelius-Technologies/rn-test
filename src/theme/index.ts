import { FullTheme } from 'react-native-elements';

export const theme: Partial<FullTheme> = {
  colors: {
    primary: '#20C997',
    secondary: '#b8f4e2',
    background: '#F7F7F7',
    lightgrey: '#D1D1D1',
    textPrimary: '#333',
    textSecondary: '#666',
    buttonText: '#121212',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
    xxl: 48,
  },
  fontSize: {
    s: 10,
    m: 16,
    l: 28,
    xl: 40,
    xxl: 48,
  },
  fontFamily: {
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
  },
  Text: {
    style: {
      fontFamily: 'Inter-Regular',
      color: '#333',
    },
  },
};
