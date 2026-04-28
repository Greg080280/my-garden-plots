import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * ScallopedFrame
 * SVG-based scalloped oval/rectangle border used around hero, cards, and forms.
 * Children are positioned over the cream interior.
 */
interface Props {
  children: ReactNode;
  className?: string;
  variant?: "oval" | "rect";
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

export const ScallopedFrame = ({
  children,
  className,
  variant = "oval",
  strokeColor = "hsl(var(--primary))",
  fillColor = "hsl(var(--paper))",
  strokeWidth = 2.2,
}: Props) => {
  const path =
    variant === "oval"
      ? buildScallopedOvalPath(800, 520, 22, 16)
      : buildScallopedRectPath(800, 520, 22, 14);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 800 520"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <path d={path} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
};

function buildScallopedOvalPath(w: number, h: number, scallops: number, depth: number) {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 - depth - 4;
  const ry = h / 2 - depth - 4;
  const pts: string[] = [];
  const total = scallops * 2;
  for (let i = 0; i <= total; i++) {
    const t = (i / total) * Math.PI * 2;
    const r = i % 2 === 0 ? 1 : 1 + depth / Math.min(rx, ry);
    const x = cx + Math.cos(t) * rx * r;
    const y = cy + Math.sin(t) * ry * r;
    pts.push(`${i === 0 ? "M" : "Q"}${i === 0 ? "" : ""} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  // Build smooth scallops using quadratic curves between alternating in/out points.
  let d = "";
  for (let i = 0; i <= total; i++) {
    const t = (i / total) * Math.PI * 2;
    const inOut = i % 2 === 0 ? 1 : 1 + depth / Math.min(rx, ry);
    const x = cx + Math.cos(t) * rx * inOut;
    const y = cy + Math.sin(t) * ry * inOut;
    if (i === 0) d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
    else {
      // control point between previous and current, pushed outward
      const tPrev = ((i - 1) / total) * Math.PI * 2;
      const tMid = (tPrev + t) / 2;
      const ctrlR = 1 + (depth / Math.min(rx, ry)) * 0.6;
      const cxp = cx + Math.cos(tMid) * rx * ctrlR;
      const cyp = cy + Math.sin(tMid) * ry * ctrlR;
      d += `Q ${cxp.toFixed(1)} ${cyp.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
  }
  d += "Z";
  return d;
}

function buildScallopedRectPath(w: number, h: number, perSide: number, depth: number) {
  const m = depth + 4;
  const innerW = w - m * 2;
  const innerH = h - m * 2;
  const segW = innerW / perSide;
  const segH = innerH / Math.round(perSide * (innerH / innerW));
  const sides = [
    { dir: "h", count: perSide, len: segW, sign: 1 }, // top L→R
    { dir: "v", count: Math.max(4, Math.round(perSide * (innerH / innerW))), len: segH, sign: 1 }, // right
    { dir: "h", count: perSide, len: segW, sign: -1 }, // bottom R→L
    { dir: "v", count: Math.max(4, Math.round(perSide * (innerH / innerW))), len: segH, sign: -1 }, // left
  ];
  let x = m, y = m;
  let d = `M ${x} ${y} `;
  for (const s of sides) {
    for (let i = 0; i < s.count; i++) {
      if (s.dir === "h") {
        const nx = x + s.len * s.sign;
        const cx = (x + nx) / 2;
        const cy = y + (-depth) * (sides.indexOf(s) === 0 ? 1 : -1);
        d += `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${nx.toFixed(1)} ${y.toFixed(1)} `;
        x = nx;
      } else {
        const ny = y + s.len * s.sign;
        const cy = (y + ny) / 2;
        const cx = x + (-depth) * (sides.indexOf(s) === 1 ? -1 : 1);
        d += `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${ny.toFixed(1)} `;
        y = ny;
      }
    }
  }
  d += "Z";
  return d;
}
