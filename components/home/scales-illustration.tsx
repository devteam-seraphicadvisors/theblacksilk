import type { CSSProperties } from "react";

interface ScalesIllustrationProps {
  className?: string;
}

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

// Line-art scales of justice. Paths draw themselves when an ancestor with
// .draw-on-reveal is revealed (see globals.css); the beam then sways gently.
export function ScalesIllustration({ className = "" }: ScalesIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {/* Plinth and pillar */}
      <path className="draw-path" pathLength={1} style={delay(0)} d="M66 216 H174" />
      <path className="draw-path" pathLength={1} style={delay(150)} d="M88 216 V204 H152 V216" />
      <path className="draw-path" pathLength={1} style={delay(300)} d="M120 204 V62" />
      <path className="draw-path" pathLength={1} style={delay(450)} d="M112 204 L120 190 L128 204" />
      <circle className="draw-path" pathLength={1} style={delay(600)} cx={120} cy={50} r={7} />

      {/* Beam, chains, and pans: sway around the pivot */}
      <g className="animate-sway" style={{ transformOrigin: "120px 64px" }}>
        <path className="draw-path" pathLength={1} style={delay(700)} d="M44 64 H196" />
        <circle className="draw-path" pathLength={1} style={delay(800)} cx={120} cy={64} r={3} />

        <path className="draw-path" pathLength={1} style={delay(950)} d="M52 64 L30 136" />
        <path className="draw-path" pathLength={1} style={delay(950)} d="M52 64 L74 136" />
        <path className="draw-path" pathLength={1} style={delay(1150)} d="M22 136 H82 Q76 156 52 156 Q28 156 22 136 Z" />

        <path className="draw-path" pathLength={1} style={delay(950)} d="M188 64 L166 136" />
        <path className="draw-path" pathLength={1} style={delay(950)} d="M188 64 L210 136" />
        <path className="draw-path" pathLength={1} style={delay(1150)} d="M158 136 H218 Q212 156 188 156 Q164 156 158 136 Z" />
      </g>
    </svg>
  );
}
