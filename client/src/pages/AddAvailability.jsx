import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import CalendarDayHeader from "../components/CalendarDay";
import customFetch from "../utils/customFetch";
import { transformData, formatDate } from "../utils/calendarHelpers";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const data = await customFetch.get("/availability");
    return data.data;
  } catch (error) {
    return redirect("/login");
  }
};

const handleSubmit = async (availability) => {
  const transformedData = transformData(availability);
  const formattedData = transformedData.map((item) => {
    return {
      date: item.date,
      slots: item.slots.map((slot) => {
        return {
          type: slot.type === "am" ? "morning" : "afternoon",
          available: slot.available,
        };
      }),
    };
  });
  const availabilityData = JSON.stringify(formattedData);

  //send data to the server
  try {
    const response = await customFetch.post("/availability", {
      availability: availabilityData,
    });
    toast.success("Availability updated successfully");
  } catch (error) {
    toast.error("An error occurred, please try again");
  }
};

const AddAvailability = () => {
  const { availability: availabilityData } = useLoaderData(loader);
  let today = new Date();
  const [yearAndMonth, setYearAndMonth] = useState([
    today.getFullYear(),
    today.getMonth() + 1,
  ]);
  console.log(yearAndMonth);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    // check if user has already set availability
    if (availabilityData && availabilityData.length > 0) {
      availabilityData.forEach((item) => {
        const exists = availability.find((avail) => {
          console.log(avail);
          return avail.date === item.date;
        });
        // If the item does not exist in availability state, add it
        if (!exists) {
          let { date, slots } = item;

          slots.map((slot) => {
            let type = slot.type === "morning" ? "am" : "pm";
            let available = slot.available;
            setAvailability((prev) => [
              ...prev,
              {
                dateString: formatDate(date),
                slot: type,
                currentStatus: available,
              },
            ]);
          });
        }
      });
    }
  }, [availabilityData]);

  return (
    <>
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <CalendarDayHeader
            availability={availability}
            setAvailability={setAvailability}
            calendarDayObject={calendarDayObject}
          />
        )}
      />

      <button
        onClick={() => handleSubmit(availability)}
        className="btn"
        type="button"
      >
        {" "}
        submit{" "}
      </button>
    </>
  );
};
export default AddAvailability;
