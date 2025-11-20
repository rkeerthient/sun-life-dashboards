import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Fragment } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import ArrowDown from "../../../assets/svgs/arrow-down.svg";

interface HoursFieldProps {
  fieldName: string;
}

type Interval = { start: string; end: string };
type DayMode = "Open" | "Split" | "24 Hours" | "Closed";

type DisplayDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type SelectedDays = {
  [day in DisplayDay]: {
    selectedType: DayMode;
    openIntervals: Interval[];
  };
};

type LowerDayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type YextHoursDay = { isClosed?: boolean; openIntervals?: Interval[] };
export type YextHours = Partial<Record<LowerDayKey, YextHoursDay>>;

const DISPLAY_DAYS: DisplayDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HOURS_TYPES: DayMode[] = ["Open", "Split", "24 Hours", "Closed"];

const makeEmptyInterval = (): Interval => ({ start: "", end: "" });
const make24hInterval = (): Interval => ({ start: "00:00", end: "23:59" });

function toSelectedDays(hours: YextHours | undefined): SelectedDays {
  const result = {} as SelectedDays;
  DISPLAY_DAYS.forEach((d) => {
    const key = d.toLowerCase() as LowerDayKey;
    const dayData = hours?.[key];

    if (!dayData) {
      result[d] = { selectedType: "Closed", openIntervals: [] };
      return;
    }

    const isClosed = !!dayData.isClosed;
    const intervals = dayData.openIntervals ?? [];

    let selectedType: DayMode = "Closed";
    if (isClosed) selectedType = "Closed";
    else if (
      intervals.length === 1 &&
      intervals[0].start === "00:00" &&
      intervals[0].end === "23:59"
    )
      selectedType = "24 Hours";
    else if (intervals.length > 1) selectedType = "Split";
    else selectedType = "Open";

    result[d] = {
      selectedType,
      openIntervals:
        selectedType === "Closed"
          ? []
          : selectedType === "24 Hours"
            ? [make24hInterval()]
            : intervals.length
              ? intervals
              : [makeEmptyInterval()],
    };
  });
  return result;
}

function buildBody(value: SelectedDays): YextHours {
  const out: YextHours = {};
  DISPLAY_DAYS.forEach((d) => {
    const key = d.toLowerCase() as LowerDayKey;
    const mode = value[d].selectedType;
    if (mode === "Closed") {
      out[key] = { isClosed: true };
    } else if (mode === "24 Hours") {
      out[key] = { openIntervals: [make24hInterval()] };
    } else {
      const cleaned = (value[d].openIntervals ?? []).map((i) => ({
        start: i.start ?? "",
        end: i.end ?? "",
      }));
      out[key] = {
        openIntervals: cleaned.length ? cleaned : [makeEmptyInterval()],
      };
    }
  });
  return out;
}

const HoursField: React.FC<HoursFieldProps> = ({ fieldName }) => {
  const setNewValue = useFieldGroupsStore((s) => s.setNewValues);
  const storeValue = useFieldGroupsStore(
    (s) => (s.newValues[fieldName] ?? s.fieldValues[fieldName]) as YextHours
  );

  const selected = toSelectedDays(storeValue);

  const commit = (next: SelectedDays) => {
    const body = buildBody(next);
    setNewValue(fieldName, body);
  };

  const handleDayChange = (day: DisplayDay, mode: DayMode) => {
    const next: SelectedDays = {
      ...selected,
      [day]: {
        selectedType: mode,
        openIntervals:
          mode === "24 Hours"
            ? [make24hInterval()]
            : mode === "Split"
              ? [makeEmptyInterval(), makeEmptyInterval()]
              : mode === "Open"
                ? [makeEmptyInterval()]
                : [],
      },
    };
    commit(next);
  };

  const handleIntervalChange = (
    day: DisplayDay,
    which: "start" | "end",
    v: string
  ) => {
    const intervals = [...selected[day].openIntervals];
    if (!intervals.length) intervals.push(makeEmptyInterval());
    intervals[0] = { ...intervals[0], [which]: v };

    const next: SelectedDays = {
      ...selected,
      [day]: { ...selected[day], openIntervals: intervals },
    };
    commit(next);
  };

  const handleSplitAdd = (day: DisplayDay) => {
    const next: SelectedDays = {
      ...selected,
      [day]: {
        ...selected[day],
        openIntervals: [...selected[day].openIntervals, makeEmptyInterval()],
      },
    };
    commit(next);
  };

  const handleSplitChange = (
    day: DisplayDay,
    index: number,
    which: "start" | "end",
    v: string
  ) => {
    const intervals = selected[day].openIntervals.map((it, i) =>
      i === index ? { ...it, [which]: v } : it
    );
    const next: SelectedDays = {
      ...selected,
      [day]: { ...selected[day], openIntervals: intervals },
    };
    commit(next);
  };

  const handleSplitRemove = (day: DisplayDay, index: number) => {
    const intervals = selected[day].openIntervals.filter((_, i) => i !== index);
    const next: SelectedDays = {
      ...selected,
      [day]: { ...selected[day], openIntervals: intervals },
    };
    commit(next);
  };

  return (
    <div className="flex flex-col text-xs">
      {DISPLAY_DAYS.map((day) => (
        <div className="flex gap-3 items-baseline mb-1.5" key={day}>
          <div className="flex items-center">
            <div className="font-bold w-[40px]">{day.slice(0, 3)}</div>

            <Listbox
              className="border p-1 pr-0 bg-white "
              value={selected[day].selectedType}
              onChange={(val: DayMode) => handleDayChange(day, val)}
            >
              <div className="relative rounded-full w-[120px] h-[30px]">
                <ListboxButton className="relative w-full cursor-default rounded-lg text-left flex justify-center py-0 px-3.5">
                  <span className=" text-[13px]">
                    {selected[day].selectedType}
                  </span>
                  <img src={ArrowDown} alt="" />
                </ListboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="border absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white focus:outline-none">
                    {HOURS_TYPES.map((opt) => (
                      <ListboxOption
                        key={opt}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={opt}
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${selected ? "font-normal" : "font-light"}`}
                          >
                            {opt}
                          </span>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="flex gap-4">
            {selected[day].selectedType === "Split" ? (
              <div className="flex flex-col gap-3">
                {selected[day].openIntervals.map((interval, i) => (
                  <div className="flex gap-2 items-center" key={i}>
                    <div className="w-[100px] rounded-lg  px-4 py-1">
                      <input
                        className="border rounded-lg w-full p-1 bg-white text-center"
                        type="text"
                        placeholder="Start time"
                        value={interval.start}
                        onChange={(e) =>
                          handleSplitChange(day, i, "start", e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[100px] rounded-lg  px-4 py-1">
                      <input
                        className="border rounded-lg w-full p-1 bg-white text-center"
                        type="text"
                        placeholder="End time"
                        value={interval.end}
                        onChange={(e) =>
                          handleSplitChange(day, i, "end", e.target.value)
                        }
                      />
                    </div>
                    <TrashIcon
                      className="w-4 h-4 hover:cursor-pointer"
                      onClick={() => handleSplitRemove(day, i)}
                    />
                  </div>
                ))}
                <button
                  onClick={() => handleSplitAdd(day)}
                  className="text-[#5a58f2] ml-auto mr-8 mb-4"
                >
                  + Add an item
                </button>
              </div>
            ) : (
              <>
                <div className="w-[100px] rounded-lg  px-4 py-1">
                  <input
                    className={`rounded-lg border w-full p-1  bg-white text-center ${
                      ["Closed", "24 Hours"].includes(
                        selected[day].selectedType
                      ) && `bg-[#EBECF1] text-gray-400`
                    }`}
                    type="text"
                    disabled={["Closed", "24 Hours"].includes(
                      selected[day].selectedType
                    )}
                    value={
                      selected[day].selectedType === "24 Hours"
                        ? "00:00"
                        : selected[day].selectedType !== "Closed"
                          ? (selected[day].openIntervals[0]?.start ?? "")
                          : ""
                    }
                    onChange={(e) =>
                      handleIntervalChange(day, "start", e.target.value)
                    }
                  />
                </div>
                <div className="w-[100px] rounded-lg  px-4 py-1">
                  <input
                    type="text"
                    className={`rounded-lg border w-full p-1 bg-white text-center ${
                      ["Closed", "24 Hours"].includes(
                        selected[day].selectedType
                      ) && `bg-[#EBECF1] text-gray-400`
                    }`}
                    disabled={["Closed", "24 Hours"].includes(
                      selected[day].selectedType
                    )}
                    value={
                      selected[day].selectedType === "24 Hours"
                        ? "23:59"
                        : selected[day].selectedType !== "Closed"
                          ? (selected[day].openIntervals[0]?.end ?? "")
                          : ""
                    }
                    onChange={(e) =>
                      handleIntervalChange(day, "end", e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoursField;
