import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.white};
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
};

export default GlobalStyle;