import {extendTheme} from 'native-base';
import {DefaultTheme} from '@react-navigation/native';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#27dd93',
      100: '#ace1ff',
      200: '#7cccff',
      300: '#49b7ff',
      400: '#1aa2ff',
      500: '#0089e6',
      600: '#006ab4',
      700: '#004c82',
      800: '#002e51',
      900: '#001021',
    },
    black: {
      50: '#E5E5E5',
      100: '#BABABA',
      200: '#e8e8e8',
      300: '#A4A4A4',
      400: '#959699',
      500: '#818488',
      600: '#25262A',
      800: '#ccc',
      700: '#333',
      900: '#2C2C2C',
      1000: '#231F20',
    },
    red: {
      900: '#EA452F',
    },
    gray: {
      100: '#EDEEEE',
      200: '#969596',
      300: '#a1a1a1',
      600: '#5A6078',
      500: '#d3d3d3',
    },
    appWhite: {
      700: '#f9f9f9',
      600: '#FFFFFF',
    },
    blue: {
      500: '#2396f3',
      600: '#49658c',
    },
    purple: {
      500: '#A9ACBA',
    },
    transparentGray: {
      100: 'rgba(90, 90, 90,0.8)',
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#86b7fe',
  },
};

type CustomThemeType = typeof theme;

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
