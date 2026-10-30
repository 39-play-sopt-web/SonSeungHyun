const theme = {
  colors: {
    background: '#1a1a24',
    card: '#2a2a35',
    white: '#ffffff',
    gray: '#9a9aa5',
    mint: '#7ee8d8',
  },
} as const;

export type AppTheme = typeof theme;
export default theme;