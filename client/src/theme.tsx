import {
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';

// eslint-disable-next-line react-refresh/only-export-components
const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'normal',
  },
});

export const theme = extendTheme(
  {
    colors: {
      brand: {
        '50': '#F8FAF0',
        '100': '#F0F5E1',
        '200': '#D5E3B3',
        '300': '#BBD18C',
        '400': '#89B04A',
        '500': '#578b18',
        '600': '#4B8013',
        '700': '#3A690E',
        '800': '#295408',
        '900': '#1D4005',
        '950': '#102902',
      },
    },
    components: {
      Button,
    },
  },

  withDefaultColorScheme({
    colorScheme: 'brand',
  }),
  withDefaultProps({
    defaultProps: {
      colorScheme: 'brand',
    },
  }),
);
