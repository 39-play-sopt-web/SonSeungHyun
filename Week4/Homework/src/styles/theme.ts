export const theme = {
  colors: {
    background: '#18181f',
    surface: '#2a2a2e',
    border: '#44444c',
    primary: '#4fd1a5',
    primaryDark: '#3f6f62',
    text: '#ffffff',
    textSub: '#a0a0a8',
    error: '#ff6b6b',
  },
  radius: {
    md: '8px',
    lg: '12px',
  },
} as const;

export type AppTheme = typeof theme;