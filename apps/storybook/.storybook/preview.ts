import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
  parameters: {
    docs: {
      theme: themes.dark,
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;