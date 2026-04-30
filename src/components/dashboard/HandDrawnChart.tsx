import { cn } from "@/lib/utils";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

type ChartType = "bar" | "line" | "pie";

export interface ChartDatum {
  name: string;
  value: number;
  /** Optional second series for line/bar */
  value2?: number;
}

interface Props {
  type: ChartType;
  data: ChartDatum[];
  className?: string;
  height?: number;
  /** Series labels for legend (1-2 series). */
  series?: [string] | [string, string];
}

const PALETTE = [
  "hsl(90 30% 43%)",   // primary olive
  "hsl(95 30% 21%)",   // forest
  "hsl(30 32% 41%)",   // brown
  "hsl(40 50% 50%)",   // mustard
  "hsl(75 32% 60%)",   // pale sage
  "hsl(8 45% 50%)",    // terracotta
];

const HAND_TOOLTIP = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1.5px solid hsl(var(--primary) / 0.5)",
    borderRadius: 12,
    fontFamily: "Quicksand, sans-serif",
    boxShadow: "var(--shadow-paper)",
  },
  labelStyle: { color: "hsl(var(--primary))", fontWeight: 700 },
};

const AXIS = {
  stroke: "hsl(var(--primary) / 0.5)",
  tick: { fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "Quicksand" },
};

/**
 * Recharts wrapped in MyGarden's hand-drawn style.
 * Line strokes use rounded caps + slight curve to feel sketched.
 */
export const HandDrawnChart = ({ type, data, className, height = 260, series = ["Valoare"] }: Props) => {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="hsl(var(--primary) / 0.12)" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="name" {...AXIS} />
            <YAxis {...AXIS} />
            <Tooltip {...HAND_TOOLTIP} />
            {series[1] && <Legend wrapperStyle={{ fontFamily: "Quicksand", fontSize: 12 }} />}
            <Bar dataKey="value" name={series[0]} fill={PALETTE[0]} radius={[8, 8, 2, 2]} />
            {series[1] && <Bar dataKey="value2" name={series[1]} fill={PALETTE[2]} radius={[8, 8, 2, 2]} />}
          </BarChart>
        ) : type === "line" ? (
          <LineChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="hsl(var(--primary) / 0.12)" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="name" {...AXIS} />
            <YAxis {...AXIS} />
            <Tooltip {...HAND_TOOLTIP} />
            {series[1] && <Legend wrapperStyle={{ fontFamily: "Quicksand", fontSize: 12 }} />}
            <Line type="monotone" dataKey="value" name={series[0]} stroke={PALETTE[0]} strokeWidth={2.4} strokeLinecap="round" dot={{ r: 4, fill: PALETTE[0] }} />
            {series[1] && (
              <Line type="monotone" dataKey="value2" name={series[1]} stroke={PALETTE[2]} strokeWidth={2.4} strokeLinecap="round" dot={{ r: 4, fill: PALETTE[2] }} />
            )}
          </LineChart>
        ) : (
          <PieChart>
            <Tooltip {...HAND_TOOLTIP} />
            <Legend wrapperStyle={{ fontFamily: "Quicksand", fontSize: 12 }} />
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={Math.min(110, height / 2 - 30)} stroke="hsl(var(--card))" strokeWidth={3}>
              {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
