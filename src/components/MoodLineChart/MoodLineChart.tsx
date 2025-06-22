import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import classes from "./MoodLineChart.module.css";
import { scoreToMood } from "../../constants/moodMap";

interface MoodYAxisTickProps {
    x?: number;
    y?: number;
    payload: { value: number };
}

const MoodYAxisTick = ({ x, y, payload }: MoodYAxisTickProps) => {
    if (payload.value === 0 || payload.value % 1 !== 0) return <g />;
    const mood = scoreToMood(payload.value);
    return (
        <text x={x! - 18} y={y! + 4} textAnchor="end" fontSize={20}>
            {mood?.emoji}
        </text>
    );
};

interface IProps {
    data: Array<Record<string, unknown>>;
    xKey: string;
}

const MoodLineChart = (props: IProps) => {
    const { data, xKey } = props;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} tickLine={false} stroke="#8884d8" />
                <YAxis
                    type="number"
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={MoodYAxisTick}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    content={({ payload, label, active }) =>
                        active && payload?.length ? (
                            <div className={classes.tooltip}>
                                {label}: {scoreToMood(Math.round(payload[0].payload.score))?.emoji ?? "-"}
                            </div>) : null}
                />
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MoodLineChart;
