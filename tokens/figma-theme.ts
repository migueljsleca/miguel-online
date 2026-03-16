export const figmaPrimitives = {
  white: "#FAFCFD",
  black: "#101010",
  accent: "#E54613",
} as const;

export const figmaTheme = {
  light: {
    background: "#FAFCFD",
    foreground: "#101010",
    accent: "#E54613",
    opacity: "#1010108C",
    tileBg: "#FBFCFD",
    tileStroke: "#F1F3F4",
    tileFill: "#7C7D7E",
  },
  dark: {
    background: "#101010",
    foreground: "#FAFCFD",
    accent: "#E54613",
    opacity: "#FAFCFD8C",
    tileBg: "#303030",
    tileStroke: "#2A2A2A",
    tileFill: "#939495",
  },
} as const;

export type FigmaThemeName = keyof typeof figmaTheme;
export type FigmaThemeTokens = (typeof figmaTheme)[FigmaThemeName];
