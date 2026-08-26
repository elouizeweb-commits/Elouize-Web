"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  data: ChartDataPoint[];
  type?: "line" | "area" | "bar" | "pie";
  dataKeys?: string[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xKey?: string;
  title?: string;
  className?: string;
}

const DEFAULT_COLORS = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"];

export default function Chart({
  data,
  type = "area",
  dataKeys = ["value"],
  colors = DEFAULT_COLORS,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xKey = "name",
  title,
  className,
}: ChartProps) {
  const tooltipStyle = useMemo(
    () => ({
      contentStyle: {
        backgroundColor: "#1a1f35",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        borderRadius: "12px",
        color: "#e5e7eb",
        fontSize: "12px",
      },
    }),
    []
  );

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              {showTooltip && <Tooltip {...tooltipStyle} />}
              {showLegend && <Legend />}
              {dataKeys.map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[i % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[i % colors.length], strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              {showTooltip && <Tooltip {...tooltipStyle} />}
              {showLegend && <Legend />}
              {dataKeys.map((key, i) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[i % colors.length]}
                  fill={colors[i % colors.length]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              {showTooltip && <Tooltip {...tooltipStyle} />}
              {showLegend && <Legend />}
              {dataKeys.map((key, i) => (
                <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Tooltip {...tooltipStyle} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {title && <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>}
      {renderChart()}
    </div>
  );
}
