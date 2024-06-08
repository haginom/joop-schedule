import { range } from "ramda";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek"; // Add this line

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const daysOfWeek = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];

export function getYearDropdownOptions(currentYear) {
  let minYear = currentYear - 4;
  let maxYear = currentYear + 5;
  return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }));
}

export function getMonthDropdownOptions() {
  return range(1, 13).map((m) => ({
    value: m,
    label: dayjs()
      .month(m - 1)
      .format("MMMM"),
  }));
}

export function getMonthName(month) {
  return dayjs()
    .month(month - 1)
    .format("MMMM");
}

export function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
    return {
      dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    };
  });
}

export function createDaysForPreviousMonth(year, month, currentMonthDays) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays[0].dateString
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true,
    };
  });
}

export function createDaysForNextMonth(year, month, currentMonthDays) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      dateString: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true,
    };
  });
}

// sunday === 0, saturday === 6
export function getWeekday(dateString) {
  return dayjs(dateString).isoWeekday() - 1;
}

export function isWeekendDay(dateString) {
  return [5, 6].includes(getWeekday(dateString));
}

export function isWednesday(dateString) {
  return getWeekday(dateString) === 2;
}

export function transformData(data) {
  return data.reduce((acc, item) => {
    const existingDateIndex = acc.findIndex(
      (data) => data.date === item.dateString
    );

    if (existingDateIndex !== -1) {
      // Date already exists in transformedData
      const existingDate = acc[existingDateIndex];

      // Find the index of the slot within the existing date's slots array
      const existingSlotIndex = existingDate.slots.findIndex(
        (slot) => slot.slot === item.slot
      );

      // If the slot exists, update its availability
      if (existingSlotIndex !== -1) {
        // Create a copy of the existing slots array
        const updatedSlots = [...existingDate.slots];

        // Update the currentStatus of the existing slot
        updatedSlots[existingSlotIndex].available = item.currentStatus;

        // Update the existing date with the updated slots array
        const updatedDate = {
          ...existingDate,
          slots: updatedSlots,
        };

        // Update the transformedData array with the updated date
        acc[existingDateIndex] = updatedDate;
      } else {
        // Slot doesn't exist in the existing date, add it
        acc[existingDateIndex].slots.push({
          type: item.slot,
          available: item.currentStatus,
        });
      }
    } else {
      // Date doesn't exist in transformedData, add it
      acc.push({
        date: item.dateString,
        slots: [{ type: item.slot, available: item.currentStatus }],
      });
    }

    return acc;
  }, []);
}

export function formatDate(dateString) {
  return dayjs(dateString).format("YYYY-MM-DD");
}

export function calculateDoB(dateString) {
  const age = dayjs().diff(
    dateString,
    "year",
    dayjs().diff(dateString, "month")
  );
  return age.toFixed(1);
}
