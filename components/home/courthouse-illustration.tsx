import type { CSSProperties } from "react";

interface CourthouseIllustrationProps {
  className?: string;
}

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

const COLUMNS = [54, 87, 120, 153, 186];

// Line-art courthouse. Draws itself bottom-up (steps, columns, roof) when an
// ancestor with .draw-on-reveal is revealed; the seal in the pediment pulses.
export function CourthouseIllustration({ className = "" }: CourthouseIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      {/* Steps */}
      <path className="draw-path" pathLength={1} style={delay(0)} d="M14 186 H226" />
      <path className="draw-path" pathLength={1} style={delay(120)} d="M22 176 H218" />
      <path className="draw-path" pathLength={1} style={delay(240)} d="M30 166 H210" />

      {/* Columns, left to right */}
      {COLUMNS.map((x, i) => (
        <g key={x}>
          <path className="draw-path" pathLength={1} style={delay(400 + i * 130)} d={`M${x - 9} 160 H${x + 9}`} />
          <path className="draw-path" pathLength={1} style={delay(450 + i * 130)} d={`M${x - 5} 160 V88`} />
          <path className="draw-path" pathLength={1} style={delay(450 + i * 130)} d={`M${x + 5} 160 V88`} />
          <path className="draw-path" pathLength={1} style={delay(500 + i * 130)} d={`M${x - 9} 86 H${x + 9}`} />
        </g>
      ))}

      {/* Entablature and pediment */}
      <path className="draw-path" pathLength={1} style={delay(1150)} d="M36 80 H204" />
      <path className="draw-path" pathLength={1} style={delay(1250)} d="M30 72 H210" />
      <path className="draw-path" pathLength={1} style={delay(1400)} d="M30 72 L120 26 L210 72" />

      {/* Seal */}
      <circle className="draw-path" pathLength={1} style={delay(1700)} cx={120} cy={55} r={7} />
      <circle className="animate-soft-pulse" cx={120} cy={55} r={2.5} fill="currentColor" stroke="none" />
    </svg>
  );
}
