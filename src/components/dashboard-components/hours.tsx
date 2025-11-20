import * as React from "react";

type Hours = {
  title?: string;
  hours: Week;
  children?: React.ReactNode;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 6,
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
};

const renderHours = (week: Week) => {
  const orderedRows = Object.entries(week)
    .sort((a, b) => defaultSorter[a[0]] - defaultSorter[b[0]])
    .map(([k, v]) => (
      <DayRow key={k} dayName={k} day={v} isToday={isDayToday(k)} />
    ));
  return <tbody className="font-normal">{orderedRows}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex - 1;
}

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  const meridiem = hour < 12 || hour === 24 ? "AM" : "PM"; // Set AM/PM
  hour = hour % 12 || 12; // Adjust hours

  return (
    hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
  );
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday } = props;

  return (
    <tr className={isToday ? "bg-gray-200" : ""}>
      <td className="capitalize text-left  pr-4">
        <span className="font-bold">{dayName.slice(0, 3)}</span>
      </td>
      {!day.isClosed && (
        <td className="pr-1">
          <span>
            {convertTo12HourFormat(day.openIntervals[0].start, true)}
            {" to "}
            {convertTo12HourFormat(day.openIntervals[0].end, true)}
          </span>
        </td>
      )}
      {day.isClosed && (
        <td className="pr-1">
          <span>Closed</span>
        </td>
      )}
    </tr>
  );
};

const Hours = (props: any) => {
  const { title, hours } = props;

  return (
    <>
      {title && <div className="text-xl font-semibold">{title}</div>}
      <table style={{ borderCollapse: "separate", borderSpacing: "0 0.4em" }}>
        <thead className="sr-only">
          <tr>
            <th>Day of the Week</th>
            <th>Hours</th>
          </tr>
        </thead>
        {renderHours(hours)}
      </table>
    </>
  );
};

export default Hours;
