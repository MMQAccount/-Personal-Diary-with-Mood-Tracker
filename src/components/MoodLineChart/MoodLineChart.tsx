import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, } from "recharts";
import classes from "./MoodLineChart.module.css";
import { scoreToMood } from "../../constants/moodMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrinStars,
  faGrinHearts,
  faSmile,
  faFrown,
  faMeh,
  faSadTear,
  faSadCry,
  faTired,
  faAngry,
  faSmileBeam,
  faLaugh,
  faLaughBeam,
  faMehBlank,
  faFaceRollingEyes,
  faGrinWink,
  faFaceGrinWide,
  faGrimace,
  faDizzy
} from "@fortawesome/free-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const nameToIcon: Record<string, IconDefinition> = {
  "face-grin-stars": faGrinStars,
  "face-grin-hearts": faGrinHearts,
  "face-smile": faSmile,
  "face-frown": faFrown,
  "face-meh": faMeh,
  "face-sad-tear": faSadTear,
  "face-sad-cry": faSadCry,
  "face-tired": faTired,
  "face-angry": faAngry,
  "face-smile-beam": faSmileBeam,
  "face-laugh": faLaugh,
  "face-laugh-beam": faLaughBeam,
  "face-meh-blank": faMehBlank,
  "face-rolling-eyes": faFaceRollingEyes,
  "face-grin-wink": faGrinWink,
  "face-grin-wide": faFaceGrinWide,
  "face-grimace": faGrimace,
  "face-dizzy": faDizzy
};

interface MoodYAxisTickProps {
  x?: number;
  y?: number;
  moods: IMood[];
  payload: { value: number };
}

interface IProps {
  data: Array<Record<string, unknown>>;
  xKey: string;
  moods: IMood[];
}

const ICON_COLOR = "#374151";

const MoodYAxisTick = ({ x, y, payload, moods }: MoodYAxisTickProps) => {

  const mood = moods.find(m => m.score - 2 === payload.value);
  if (!mood || !mood.emoji) {
    return <g />;
  }
  const icon = nameToIcon[mood.emoji]; // convert string to FontAwesome icon
  if (!icon) return <g />;

  return (
    <foreignObject x={x! - 47} y={y! - 22} width={40} height={40}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <FontAwesomeIcon icon={icon} style={{ color: ICON_COLOR, fontSize: "35px" }} />
      </div>
    </foreignObject>
  );
};


const MoodLineChart = ({ data, xKey, moods }: IProps) => {
  const color = "#719b76";

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 35, right: 30, left: 10, bottom: 20 }}
      >

        <XAxis dataKey={xKey} tickLine={false} stroke="#8e8e8e" />
        <YAxis
          type="number"
          domain={[-2, 2]}
          ticks={[-2, -1, 0, 1, 2]}
          tick={(tickProps) => <MoodYAxisTick {...tickProps} moods={moods} />}
          tickLine={false}
          axisLine={false}
          mirror={false}
        />
        <ReferenceLine y={0} stroke="#aaa" strokeWidth={1.5} strokeDasharray="4 2" />
        <Tooltip
          content={({ payload, label, active }) => {
            if (!active || !payload || !payload.length) return null;

            const score = payload[0].payload.score as number;
            const mood = moods.find(m => m.score - 2 === score);

            return (
              <div className={classes.tooltip}>
                {label}: {mood?.name ?? "Unknown mood"}
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke={color}
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodLineChart;
