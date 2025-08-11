import React from "react";
import CalendarHeatmap, {
  type TooltipDataAttrs,
  type ReactCalendarHeatmapValue,
} from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { type IMood } from "../../constants/moodMap";
import classes from "./YearPixelChart.module.css";
import useYearPixels from "../../hooks/yearPixels.hook";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nameToIcon } from "../MoodLineChart/MoodLineChart";

interface IMoodEntry {
  date: string | Date;
  mood: string;
}

interface IProps {
  entries: IMoodEntry[];
  year: number;
  moodsData: IMood[];
}

const YearPixelChart: React.FC<IProps> = ({ entries, year, moodsData }) => {
  const { EMPTY_COLOR, values } = useYearPixels({ entries, year });

  const moodColorEmojiMap = Object.fromEntries(
    moodsData.map((mood) => [
      mood.name.toLowerCase(),
      { color: mood.color, emoji: mood.emoji }, // emoji is the icon name string
    ])
  ) as Record<string, { color: string; emoji: string }>;

  // reverse the order of elements in moodsData
  moodsData = [...moodsData].reverse();

  return (
    <div className={classes.heatmapWrapper}>
      <div className={classes.legendRow} aria-label="Mood legend">


        {moodsData.map((mood) => {
          const iconDef = nameToIcon[mood.emoji];
          return (
            <div key={mood.name} className={classes.legendItem}>
              <div
                className={classes.legendColorBox}
                style={{ backgroundColor: mood.color }}
                aria-label={`${mood.name} mood color`}
              />
              <span>
                {iconDef && <FontAwesomeIcon icon={iconDef} />}{" "}
                {mood.name.charAt(0).toUpperCase() + mood.name.slice(1)}
              </span>
            </div>
          );
        })}
        <div className={classes.legendItem}>
          <div
            className={classes.legendColorBox}
            style={{ backgroundColor: EMPTY_COLOR }}
          />
          <span>Empty</span>
        </div>
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

          if (value && value.count) {
            const moodKey = value.count.toLowerCase();
            color = moodColorEmojiMap[moodKey]?.color ?? EMPTY_COLOR;
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
            return {} as TooltipDataAttrs;
          }

          const formattedDate = new Date(value.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${formattedDate}: ${value.count}`,
          };
        }}
      />

      <Tooltip id="heatmap-tooltip" />
    </div>
  );
};

export default YearPixelChart;
