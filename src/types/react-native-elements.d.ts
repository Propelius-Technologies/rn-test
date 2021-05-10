// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FullTheme } from 'react-native-elements';
type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module 'react-native-elements/dist/config/colors' {
  export interface Colors {
    background: string;
    lightgrey: string;
    textPrimary: string;
    textSecondary: string;
    buttonText: string;
  }
}

declare module 'react-native-elements' {
  export interface Sizing {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  }

  export interface FontFamily {
    light: string;
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
  }

  export interface FullTheme {
    spacing: Sizing;
    borderRadii: Sizing;
    fontSize: Sizing;
    fontFamily: FontFamily;
  }
}
