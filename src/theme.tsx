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
        50: '#FFF5FA',
        100: '#FFEBF5',
        200: '#FFD1E9',
        300: '#FFBDDF',
        400: '#FFA3D3',
        500: '#FF8FC9',
        600: '#FF3DA1',
        700: '#F0007C',
        800: '#9E0052',
        900: '#52002A',
        950: '#290015',
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
