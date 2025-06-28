import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import classes from "./MoodPieChart.module.css";
import { moodMap } from "../../constants/moodMap";

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
  [key: string]: { color: string; emoji?: string };
}

interface IProps {
  pieData: IPieDataItem[];
  counts: ICounts;
  colorMap: IColorMap;
}

const DEFAULT_COLORS = ["#a3c8f4", "#d2e596", "#fee6a6", "#f5ccb3", "#d3c1f7"];

const MoodPieChart = ({ pieData, /*counts,*/ colorMap }: IProps) => {

  return (
    <div className={classes.pieWrapper}>
      <div className={classes.pieRow}>
        <ResponsiveContainer width="100%" aspect={2.5}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              fill="black"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${moodMap[name]?.emoji ?? ""} ${name} ${(percent*100).toFixed(0)}%`
              }
            >
              {pieData.map(({ name }, i) => {
                const entry = colorMap[name];
                const fill = entry?.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                return <Cell key={name} fill={fill} />;
              })}
            </Pie>
            <Tooltip
              formatter={(v, name) => {
                const entry = colorMap[name];
                const label = entry?.emoji ? `${entry.emoji} ${name}` : name;
                return [`${v}%`, label];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* {<GoodBadStats {...counts} />} */}
      </div>
    </div>
  );
};

export default MoodPieChart;