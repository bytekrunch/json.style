import { tags as t } from "@lezer/highlight";

export const CODE_EDITOR_THEME = {
  theme: "dark",
  settings: {
    background: "#282c34",
    foreground: "#ffffff",
    caret: "282c34",
    gutters: "#282c34",
    selection: "black",
    lineHighlight: "#6699ff0b",
    gutterBackground: "#282c34",
    gutterForeground: "#7d8799",
  },
  styles: [
    { tag: t.brace, color: "red" },
    { tag: t.squareBracket, color: "#98c379" },
    { tag: t.separator, color: "orange" },
    { tag: t.bool, color: "blue" },
    { tag: t.string, color: "#98c379" },
  ],
};
