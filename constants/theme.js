import { tags as t } from "@lezer/highlight";

export const CODE_EDITOR_THEME = {
  theme: "dark",
  settings: {
    background: "#282c34",
    // foreground: "#F1FA8C",
    foreground: "#7aa2f7",
    caret: "282c34",
    gutters: "#282c34",
    selection: "#000000",
    selectionMatch: "#555555",
    lineHighlight: "#6699ff0b",
    gutterBackground: "#282c34",
    gutterForeground: "#7d8799",
  },
  styles: [
    { tag: t.brace, color: "#ABB2BF" },
    { tag: t.squareBracket, color: "#CCCCCC" },
    { tag: t.separator, color: "ABB2BF" },
    { tag: t.string, color: "#CCCCCC" },
  ],
};
