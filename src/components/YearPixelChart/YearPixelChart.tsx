import React from "react";
import CalendarHeatmap, { type TooltipDataAttrs, type ReactCalendarHeatmapValue, } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { moodMap } from "../../constants/moodMap";
import classes from "./YearPixelChart.module.css";
import useYearPixels from "../../hooks/yearPixels.hook";

interface IMoodEntry {
  date: string | Date;
  mood: keyof typeof moodMap;
}

interface IProps {
  entries: IMoodEntry[];
  year: number;
}

const YearPixelChart: React.FC<IProps> = ({ entries, year }:IProps) => {
  const { EMPTY_COLOR, moods, values } = useYearPixels({ entries, year });

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

        {moods.map(([mood, { color, emoji }]) => (
          <div key={mood} className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: color }}
              aria-label={`${mood} mood color`}
            />
            <span>
              {emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </span>
          </div>
        ))}
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

          if (value && value.count && moodMap[value.count]?.color) {
            color = moodMap[value.count].color;
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
            return {};
          }
          const mood = value.count;
          const emoji = moodMap[mood]?.emoji ?? "";

          return {
            ["data-tip"]: `${value.date}: ${emoji} ${mood}`,
          } as never;
        }}
      />
    </div>
  );
};

export default YearPixelChart;
