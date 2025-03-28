import { createTheme, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontSizes: {
    xs: '0.8rem',
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
    xl: '1.5rem',
  },
  lineHeights: {
    xs: '1.2',
    sm: '1.2',
    md: '1.5',
    lg: '1.5',
    xl: '1.5',
  },
  components: {
    Select: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[5],
        },
      }),
    },
    TextInput: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    PasswordInput: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    NumberInput: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    DateInput: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    TagsInput: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    Textarea: {
      styles: (theme: MantineTheme) => ({
        label: {
          marginBottom: '8px',
        },
        input: {
          fontWeight: 400,
          minHeight: '100px',
          borderColor: theme.colors.gray[7],
        },
      }),
    },
    Switch: {
      styles: {
        root: {
          marginTop: '8px',
        },
      },
    },
  },
});
