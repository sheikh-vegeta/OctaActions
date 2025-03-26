import * as monaco from "monaco-editor";

// Register Andromeda theme
export function registerAndromedaTheme() {
  monaco.editor.defineTheme("andromeda", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "d5ced9", background: "23262e" },
      { token: "keyword", foreground: "f4005f" },
      { token: "operator", foreground: "f4005f" },
      { token: "string", foreground: "c4e969" },
      { token: "string.escape", foreground: "f4005f" },
      { token: "comment", foreground: "6c6783", fontStyle: "italic" },
      { token: "number", foreground: "c899ff" },
      { token: "constant", foreground: "c899ff" },
      { token: "variable", foreground: "9fd3e6" },
      { token: "punctuation", foreground: "d5ced9" },
      { token: "type", foreground: "9ee4ff" },
      { token: "function", foreground: "9ee4ff" },
      { token: "class", foreground: "9ee4ff" },
      { token: "tag", foreground: "f4005f" },
      { token: "tag.attribute", foreground: "9ee4ff" },
      { token: "delimiter", foreground: "d5ced9" },
      { token: "regexp", foreground: "c4e969" },
    ],
    colors: {
      "editor.background": "#23262e",
      "editor.foreground": "#d5ced9",
      "editorCursor.foreground": "#f4005f",
      "editorLineNumber.foreground": "#6c6783",
      "editorLineNumber.activeForeground": "#d5ced9",
      "editor.selectionBackground": "#303340",
      "editor.selectionHighlightBackground": "#36394a",
      "editor.lineHighlightBackground": "#2a2d37",
      "editorSuggestWidget.background": "#23262e",
      "editorSuggestWidget.border": "#303340",
      "editorSuggestWidget.foreground": "#d5ced9",
      "editorSuggestWidget.selectedBackground": "#303340",
      "editorSuggestWidget.highlightForeground": "#f4005f",
      "editorBracketMatch.background": "#36394a",
      "editorBracketMatch.border": "#6c6783",
      "editorWidget.background": "#23262e",
      "editorHoverWidget.background": "#23262e",
      "editorHoverWidget.border": "#303340",
    },
  });
}

// Register Ayu Dark theme
export function registerAyuDarkTheme() {
  monaco.editor.defineTheme("ayu-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "cbccc6", background: "0f1419" },
      { token: "keyword", foreground: "ff8f40" },
      { token: "operator", foreground: "e7c547" },
      { token: "string", foreground: "c2d94c" },
      { token: "string.escape", foreground: "ff8f40" },
      { token: "comment", foreground: "5c6773", fontStyle: "italic" },
      { token: "number", foreground: "ffee99" },
      { token: "constant", foreground: "ffee99" },
      { token: "variable", foreground: "cbccc6" },
      { token: "punctuation", foreground: "cbccc6" },
      { token: "type", foreground: "39bae6" },
      { token: "function", foreground: "39bae6" },
      { token: "class", foreground: "39bae6" },
      { token: "tag", foreground: "ff8f40" },
      { token: "tag.attribute", foreground: "39bae6" },
      { token: "delimiter", foreground: "cbccc6" },
      { token: "regexp", foreground: "c2d94c" },
    ],
    colors: {
      "editor.background": "#0f1419",
      "editor.foreground": "#cbccc6",
      "editorCursor.foreground": "#ff8f40",
      "editorLineNumber.foreground": "#5c6773",
      "editorLineNumber.activeForeground": "#cbccc6",
      "editor.selectionBackground": "#253340",
      "editor.selectionHighlightBackground": "#2d3640",
      "editor.lineHighlightBackground": "#191e24",
      "editorSuggestWidget.background": "#0f1419",
      "editorSuggestWidget.border": "#253340",
      "editorSuggestWidget.foreground": "#cbccc6",
      "editorSuggestWidget.selectedBackground": "#253340",
      "editorSuggestWidget.highlightForeground": "#ff8f40",
      "editorBracketMatch.background": "#2d3640",
      "editorBracketMatch.border": "#5c6773",
      "editorWidget.background": "#0f1419",
      "editorHoverWidget.background": "#0f1419",
      "editorHoverWidget.border": "#253340",
    },
  });
}

// Initialize all themes
export function initializeEditorThemes() {
  registerAndromedaTheme();
  registerAyuDarkTheme();
}
