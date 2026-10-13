import type { CSSProperties } from "react";

interface GavelIllustrationProps {
  className?: string;
}

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

// Line-art gavel and sound block. Draws itself when an ancestor with
// .draw-on-reveal is revealed, then lifts and strikes on a loop around the
// end of its handle, with short impact lines on each strike.
export function GavelIllustration({ className = "" }: GavelIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {/* Sound block */}
      <path className="draw-path" pathLength={1} style={delay(0)} d="M54 134 H166 V146 H54 Z" />
      <path className="draw-path" pathLength={1} style={delay(200)} d="M66 134 V126 H154 V134" />

      {/* Impact lines, flash on each strike */}
      <g className="animate-gavel-impact">
        <path d="M68 116 L58 108" />
        <path d="M64 124 L52 122" />
        <path d="M136 116 L146 108" />
        <path d="M140 124 L152 122" />
      </g>

      {/* Gavel: rotates around the end of the handle */}
      <g className="animate-gavel" style={{ transformOrigin: "156px 34px" }}>
        {/* Head */}
        <path className="draw-path" pathLength={1} style={delay(400)} d="M78 104 H126 V126 H78 Z" />
        <path className="draw-path" pathLength={1} style={delay(600)} d="M86 104 V126" />
        <path className="draw-path" pathLength={1} style={delay(600)} d="M118 104 V126" />
        {/* Handle */}
        <path className="draw-path" pathLength={1} style={delay(800)} d="M98 104 L150 30" />
        <path className="draw-path" pathLength={1} style={delay(800)} d="M106 104 L158 34" />
        <path className="draw-path" pathLength={1} style={delay(1000)} d="M150 30 L158 34" />
      </g>
    </svg>
  );
}
