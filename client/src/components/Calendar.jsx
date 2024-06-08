import PropTypes from "prop-types";
import classNames from "classnames";
import {
  daysOfWeek,
  getMonthName,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  isWednesday,
} from "../utils/calendarHelpers";
import CalendarWrapper from "../assets/wrappers/Calendar";
import { GrPrevious, GrNext } from "react-icons/gr";

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
};

export default function Calendar({
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null,
}) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);

  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  return (
    <CalendarWrapper className="calendar-root">
      <h3>Select your availablity</h3>
      <div className="navigation-header">
        <button className="btn" onClick={handleMonthNavBackButtonClick}>
          <GrPrevious />
        </button>
        <div className="current-date">
          {getMonthName(month)} <span className="year">{year}</span>
        </div>

        <button className="btn" onClick={handleMonthNavForwardButtonClick}>
          <GrNext />
        </button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames("day-of-week-header", {
              "weekend-day": [5, 6].includes(index),
            })}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {calendarGridDayObjects.map((day) => {
          const enhancedDay = {
            ...day,
            isWeekend: isWeekendDay(day.dateString),
            isWednesday: isWednesday(day.dateString),
          };
          return (
            <div
              key={enhancedDay.dateString}
              className={classNames("day-grid-item-container", {
                "weekend-day": isWeekendDay(day.dateString),
                "current-month": day.isCurrentMonth,
              })}
            >
              {renderDay(enhancedDay)}
            </div>
          );
        })}
      </div>
    </CalendarWrapper>
  );
}
