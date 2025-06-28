import React from "react";
import CalendarHeatmap, {
  type TooltipDataAttrs,
  type ReactCalendarHeatmapValue,
} from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { moodMap } from "../../constants/moodMap";
import classes from "./YearPixelChart.module.css";
import useYearPixels from "../../hooks/yearPixels.hook";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface IMoodEntry {
  date: string | Date;
  mood: keyof typeof moodMap;
}

interface IProps {
  entries: IMoodEntry[];
  year: number;
}

const YearPixelChart: React.FC<IProps> = ({ entries, year }) => {
  const { EMPTY_COLOR, moods, values } = useYearPixels({ entries, year });

  const moodColorEmojiMap = Object.fromEntries(
    moods.map(([mood, moodObj]) =>
      typeof moodObj === "object" && moodObj !== null && "color" in moodObj && "emoji" in moodObj
        ? [mood, { color: moodObj.color, emoji: moodObj.emoji }]
        : [mood, { color: EMPTY_COLOR, emoji: "" }]
    )
  ) as Record<string, { color: string; emoji: string }>;

  return (
    <div className={classes.heatmapWrapper}>
      <div className={classes.legendRow} aria-label="Mood legend">
        <div className={classes.legendItem}>
          <div
            className={classes.legendColorBox}
            style={{ backgroundColor: EMPTY_COLOR }}
          />
          <span>Empty</span>
        </div>

        {moods.map(([mood, moodObj]) => {
          if (typeof moodObj === "object" && moodObj !== null && "color" in moodObj && "emoji" in moodObj) {
            const { color, emoji } = moodObj;
            return (
              <div key={String(mood)} className={classes.legendItem}>
                <div
                  className={classes.legendColorBox}
                  style={{ backgroundColor: color }}
                  aria-label={`${mood} mood color`}
                />
                <span>
                  {emoji} {typeof mood === "string" ? mood.charAt(0).toUpperCase() + mood.slice(1) : ""}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>

      <CalendarHeatmap
        startDate={`${year}-01-01`}
        endDate={`${year}-12-31`}
        gutterSize={2}
        showWeekdayLabels
        values={values}
        classForValue={(value) =>
          !value || !value.count ? "mood-empty" : ""
        }
        transformDayElement={(element, value, index) => {
          let color = EMPTY_COLOR;

          if (value && value.count && moodColorEmojiMap[value.count]) {
            color = moodColorEmojiMap[value.count].color;
          }

          return React.isValidElement(element)
            ? React.cloneElement<React.SVGProps<SVGRectElement>>(
              element as React.ReactElement<React.SVGProps<SVGRectElement>>,
              {
                key: index,
                style: { fill: color, stroke: color },
              }
            )
            : null;
        }}
        tooltipDataAttrs={(
          value: ReactCalendarHeatmapValue<string> | undefined
        ): TooltipDataAttrs => {
          if (!value || !value.date || !value.count) {
            return {} as unknown as TooltipDataAttrs;
          }
          const mood = value.count;
          const emoji = moodColorEmojiMap[mood]?.emoji ?? "";

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${emoji} ${mood}`,
          } as unknown as TooltipDataAttrs;
        }}
      />

      {/* Enable tooltip rendering */}
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
};

export default YearPixelChart;
