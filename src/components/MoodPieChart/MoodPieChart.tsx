import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import classes from "./MoodPieChart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { nameToIcon } from "../MoodLineChart/MoodLineChart";

interface IPieDataItem {
  name: string;
  value: number;
}

interface ICounts {
  counts1: number;
  counts2: number;
  counts1Label: string;
  counts2Label: string;
}

interface IColorMap {
  [key: string]: { color: string; icon?: IconDefinition };
}

interface IProps {
  pieData: IPieDataItem[];
  counts: ICounts;
  colorMap: IColorMap;
  moods?: IMood[];
}

interface ICustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  name: string;
  index: number;
}

const DEFAULT_COLORS = [
  "#a3c8f4", "#d2e596", "#fee6a6", "#f5ccb3", "#d3c1f7",
  "#f2e2ce", "#e8d8c3", "#f5e3da", "#ecd9c6", "#ffe8d6", "#f9dcc4", "#e0cfc1", "#fce5cd", "#f4d9c6", "#f1dfd1", "#e7cfc7", "#f8e1dc", "#f3e0d2",
  "#eed3d7", "#e4d0c1", "#f5e7d3", "#dbc6b4", "#f7e6cf", "#e6d3c3", "#f2e1d9", "#fdebd3", "#e9d5c3", "#f6e4cc", "#f3ddc8", "#fbe8dd",
];


const MoodPieChart = ({ pieData, moods }: IProps) => {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
  }: ICustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 50;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const mood = moods?.find(m => m.name === name);
    const icon = mood?.emoji ? nameToIcon[mood.emoji] : undefined;

    return (
      <foreignObject x={x - 60} y={y - 80} width={120} height={150}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: "20px",
            color: "#555",
            gap: "6px",
            width: "100%",
            height: "100%",
          }}
        >
          {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: "24px" }} />}
          <span>{`${name} ${(percent * 100).toFixed(0)}%`}</span>
        </div>
      </foreignObject>
    );
  };

  return (
    <div className={classes.pieWrapper}>
      <div className={classes.pieRow}>
        <ResponsiveContainer width="120%" height={350}>
          <PieChart margin={{ top: 40, bottom: 20 }}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomLabel}
              labelLine={true}
            >
              {pieData.map(({ name }, i) => {
                const mood = moods?.find(m => m.name === name);
                const fill = mood?.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                return <Cell key={name} fill={fill} />;
              })}
            </Pie>

            <Tooltip
              formatter={(value, name: string) => [`${value}% ${name}`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodPieChart;
