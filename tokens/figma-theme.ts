export const figmaPrimitives = {
  white: "#FAFCFD",
  black: "#151515",
  accent: "#E54613",
} as const;

export const figmaTheme = {
  light: {
    background: "#FAFCFD",
    foreground: "#151515",
    accent: "#E54613",
    opacity: "#1515158C",
  },
  dark: {
    background: "#151515",
    foreground: "#FAFCFD",
    accent: "#E54613",
    opacity: "#FAFCFD8C",
  },
} as const;

export type FigmaThemeName = keyof typeof figmaTheme;
export type FigmaThemeTokens = (typeof figmaTheme)[FigmaThemeName];
