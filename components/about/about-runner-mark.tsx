import HalftoneExport from "../../experiments/halftone/halftone-export (4).jsx";

const aboutRunnerSettings = {
  dotSize: 58,
  pageBackground: "var(--background)",
  paperColor: "var(--background)",
  inkColor: "var(--foreground)",
};

export default function AboutRunnerMark() {
  return (
    <div className="about-experience-runner">
      <HalftoneExport
        settings={aboutRunnerSettings}
        enableInteraction={false}
      />
    </div>
  );
}
