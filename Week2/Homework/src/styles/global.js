import { css } from "@emotion/react";
import { theme } from "./theme";

const globalStyle = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    color: ${theme.colors.black};
    background: linear-gradient(135deg, #b2f5ff 0%, #6ff0b0 100%);
    background-attachment: fixed;
  }

  button,
  select {
    font-family: inherit;
  }
`;

export default globalStyle;