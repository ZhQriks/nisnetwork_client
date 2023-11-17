import { MantineThemeOverride, Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendColors = 'primaryGreen' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendColors, Tuple<string, 10>>;
  }
}

const primaryGreen: Tuple<string, 10> = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#28B670',
  '#28B670',
  '#28B670',
  '#28B670',
  '#28B670',
  '#28B670',
  '#14532d',
];

// https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    primaryGreen,
  },
  primaryColor: 'primaryGreen',

  other: {
    fontWeights: {
      medium: 500,
      semibold: 600,
    },
  },

  fontFamily: 'Manrope, sans-serif',
  fontFamilyMonospace: 'Manrope, sans-serif',
  headings: { fontFamily: 'Manrope, sans-serif', fontWeight: 600 },
};
