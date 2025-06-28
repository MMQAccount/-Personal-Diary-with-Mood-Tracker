import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, } from "recharts";
import classes from "./MoodLineChart.module.css";
import { scoreToMood } from "../../constants/moodMap";

interface MoodYAxisTickProps {
    x?: number;
    y?: number;
    payload: { value: number };
}

interface IProps {
    data: Array<Record<string, unknown>>;
    xKey: string;
}

const MoodYAxisTick = ({ x, y, payload }: MoodYAxisTickProps) => {
    if (![-2, -1, 0, 1, 2].includes(payload.value)) return <g />;
    const mood = scoreToMood(payload.value);
    return (
        <text x={x! - 10} y={y! + 6} textAnchor="end" fontSize={20}>
            {mood?.emoji}
        </text>
    );
};

const MoodLineChart = ({ data, xKey }: IProps) => {
    const color = "#719b76";

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} tickLine={false} stroke="#8884d8" />
                <YAxis
                    type="number"
                    domain={[-2, 2]}
                    ticks={[-2, -1, 0, 1, 2]}
                    tick={MoodYAxisTick}
                    tickLine={false}
                    axisLine={false}
                    mirror={false}
                />
                <ReferenceLine y={0} stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 2" />
                <Tooltip
                    content={({ payload, label, active }) =>
                        active && payload?.length ? (
                            <div className={classes.tooltip}>
                                {label}: {scoreToMood(payload[0].payload.score)?.emoji ?? "-"}
                            </div>
                        ) : null
                    }
                />
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MoodLineChart;
