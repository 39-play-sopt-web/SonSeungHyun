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
    background-color: #a7b2f3
  }

  button,
  select {
    font-family: inherit;
  }
`;

export default globalStyle;