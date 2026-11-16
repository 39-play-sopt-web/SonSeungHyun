import { Global, css } from '@emotion/react';
import type { Theme } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme: Theme) => css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
          color: inherit;
        }

        button {
          cursor: pointer;
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