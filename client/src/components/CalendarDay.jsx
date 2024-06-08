import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DayWrapper from "../assets/wrappers/CalendarDay";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import { curryN } from "ramda";

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};

export function CalendarDayHeader({
  availability,
  setAvailability,
  calendarDayObject,
}) {
  const { dateString, isCurrentMonth, dayOfMonth, isWeekend, isWednesday } =
    calendarDayObject;

  const [amStatus, setAmStatus] = useState("no");
  const [pmStatus, setPmStatus] = useState("no");

  useEffect(() => {
    const existingAvailability = availability.find((item) => {
      return item.dateString === dateString && item.slot === "am";
    });
    if (existingAvailability) {
      setAmStatus(existingAvailability.currentStatus);
    }

    const existingAvailabilityPm = availability.find(
      (item) => item.dateString === dateString && item.slot === "pm"
    );
    if (existingAvailabilityPm) {
      setPmStatus(existingAvailabilityPm.currentStatus);
    }
  }, [availability, dateString]);

  //set am and pm status based on availability

  const handleSlotPick = ({ dateString, slot, currentStatus }) => {
    //handle the status
    if (currentStatus === "no") {
      currentStatus = "yes";
    } else if (currentStatus === "yes") {
      currentStatus = "maybe";
    } else {
      currentStatus = "no";
    }
    if (slot === "am") setAmStatus(currentStatus);
    if (slot === "pm") setPmStatus(currentStatus);

    //update the availability state
    //check if the date and slot already exists in the availability state

    setAvailability((prev) => {
      const existingAvailability = prev.find((item) => {
        return item.dateString === dateString && item.slot === slot;
      });
      if (existingAvailability) {
        return prev.map((item) => {
          if (item.dateString === dateString && item.slot === slot) {
            return { ...item, currentStatus };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...prev,
          {
            dateString,
            slot,
            currentStatus,
          },
        ];
      }
    });
  };

  return (
    <DayWrapper>
      <div
        className={
          isCurrentMonth ? "day-header" : "day-header not-current-month"
        }
      >
        {dayOfMonth}
      </div>
      {!isWeekend && !isWednesday && isCurrentMonth ? (
        <div className="day-grid-item-content-container">
          <div
            className={`halfday pm ${amStatus}`}
            onClick={() =>
              handleSlotPick({
                dateString: dateString,
                slot: "am",
                currentStatus: amStatus,
              })
            }
          >
            <span className="status-icon">
              {amStatus === "yes" ? <TiTick /> : null}
              {amStatus === "no" ? <RxCross2 /> : null}
              {amStatus === "maybe" ? <TiTickOutline /> : null}
            </span>
          </div>
          <div
            className={`halfday pm ${pmStatus}`}
            onClick={() =>
              handleSlotPick({
                dateString: dateString,
                slot: "pm",
                currentStatus: pmStatus,
              })
            }
          >
            <span className="status-icon">
              {pmStatus === "yes" ? <TiTick /> : null}
              {pmStatus === "no" ? <RxCross2 /> : null}
              {pmStatus === "maybe" ? <TiTickOutline /> : null}
            </span>
          </div>
        </div>
      ) : null}
    </DayWrapper>
  );
}

export default CalendarDayHeader;
