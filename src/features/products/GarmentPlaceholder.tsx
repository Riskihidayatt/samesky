import type { GarmentKind } from "./types";

type GarmentPlaceholderProps = {
  kind: GarmentKind;
  color: string;
  side: "front" | "back";
  label: string;
};

const SHORT = "M98 72 L128 58 Q150 74 172 58 L202 72 L252 108 L232 146 L208 132 L208 318 Q150 328 92 318 L92 132 L68 146 L48 108 Z";
const LONG = "M98 72 L128 58 Q150 74 172 58 L202 72 L238 100 L262 252 L236 260 L208 150 L208 318 Q150 328 92 318 L92 150 L64 260 L38 252 L62 100 Z";

function isDark(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

/** Tinted garment silhouette shown until a real product photo exists for that colour. */
export function GarmentPlaceholder({ kind, color, side, label }: GarmentPlaceholderProps) {
  const ink = isDark(color) ? "#F8F4EC" : "#6B4528";
  const long = kind === "crewneck" || kind === "hoodie";
  return (
    <svg viewBox="0 0 300 375" role="img" aria-label={label} className="h-full w-full">
      <rect width="300" height="375" fill="#E7E5E1" />
      <ellipse cx="150" cy="338" rx="92" ry="8" fill="#000" opacity="0.06" />
      <path d={long ? LONG : SHORT} fill={color} stroke="#000" strokeOpacity="0.14" strokeWidth="2" strokeLinejoin="round" />
      {long && (
        <g fill="#000" opacity="0.08">
          <rect x="92" y="304" width="116" height="14" rx="4" />
        </g>
      )}
      {side === "front" ? (
        <path d="M128 58 Q150 80 172 58" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="4" />
      ) : (
        <path d="M128 58 Q150 66 172 58" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="4" />
      )}
      {kind === "hoodie" &&
        (side === "front" ? (
          <>
            <path d="M120 64 Q150 26 180 64 Q150 92 120 64Z" fill={color} stroke="#000" strokeOpacity="0.16" strokeWidth="2" />
            <path d="M142 80 v38 M158 80 v38" stroke={ink} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <path d="M112 230 h76 l-8 46 h-60 z" fill="#000" opacity="0.07" />
          </>
        ) : (
          <path d="M114 66 Q150 18 186 66 Q170 112 150 114 Q130 112 114 66Z" fill={color} stroke="#000" strokeOpacity="0.16" strokeWidth="2" />
        ))}
      {(kind === "polo" || kind === "shirt") && side === "front" && (
        <>
          <path d="M128 58 L142 90 L150 70 Z M172 58 L158 90 L150 70 Z" fill={color} stroke="#000" strokeOpacity="0.2" strokeWidth="2" strokeLinejoin="round" />
          <path d="M150 72 v46" stroke="#000" strokeOpacity="0.16" strokeWidth="2" />
          <circle cx="150" cy="92" r="2.6" fill={ink} opacity="0.7" />
          <circle cx="150" cy="108" r="2.6" fill={ink} opacity="0.7" />
        </>
      )}
      {side === "front" ? (
        <text x="184" y="128" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill={ink} fontFamily="system-ui, sans-serif">
          SAMESKY
        </text>
      ) : (
        <g fill={ink}>
          <path
            transform="translate(126 150) scale(0.5)"
            d="M24 70a22 22 0 0 1 4-43 30 30 0 0 1 56-5 22 22 0 0 1 14 48z"
            opacity="0.85"
          />
          <text x="150" y="212" textAnchor="middle" fontSize="11" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
            SAME SKY
          </text>
        </g>
      )}
    </svg>
  );
}
