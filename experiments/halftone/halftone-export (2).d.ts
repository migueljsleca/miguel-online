import type { CSSProperties, ReactNode } from "react";

type HalftoneSettings = {
  dotSize: number;
  angle: number;
  contrast: number;
  spread: number;
  shape: string;
  pageBackground: string;
  paperColor: string;
  inkColor: string;
  colorMode: boolean;
  inverted: boolean;
  smoothing: number;
  ditherType: string;
  grainMixer: number;
  grainOverlay: number;
  grainSize: number;
};

type HalftoneExportProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  mediaType?: string;
  mediaSrc?: string;
  settings?: HalftoneSettings;
  autoplay?: boolean;
  pauseWhenOffscreen?: boolean;
  enableInteraction?: boolean;
  transparentBackground?: boolean;
  alphaMaskGradient?: boolean;
  fadeIn?: boolean;
  renderWidth?: number;
  renderHeight?: number;
  scaleFactor?: number;
};

declare function HalftoneExport(props: HalftoneExportProps): ReactNode;

export default HalftoneExport;
