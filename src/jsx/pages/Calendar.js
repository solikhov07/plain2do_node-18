import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSaturday,
  isSunday,
} from "date-fns";

const Calendar = () => {
  const [workSchedule, setWorkSchedule] = useState("5-2");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fixedHolidays = ["01-01", "07-04", "12-25", "09-01"];

  const dynamicHolidays = ["2024-11-01", "2024-10-31", "2024-08-20"];

  const isHoliday = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    const fixedFormattedDate = format(date, "MM-dd");
    if (fixedHolidays.includes(fixedFormattedDate)) {
      return true;
    }

    return dynamicHolidays.includes(formattedDate);
  };

  const isWeekend = (date) => {
    if (workSchedule === "5-2") {
      return isSaturday(date) || isSunday(date);
    } else if (workSchedule === "6-1") {
      return isSunday(date);
    }
  };

  const calculateWorkdays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    let day = monthStart;
    let workdaysCount = 0;

    while (day <= monthEnd) {
      if (!isWeekend(day) && !isHoliday(day)) {
        workdaysCount++;
      }
      day = addDays(day, 1);
    }

    console.log(
      `Workdays in ${format(currentMonth, "MMMM yyyy")}: ${workdaysCount}`
    );
  };

  useEffect(() => {
    calculateWorkdays();
  }, [currentMonth, workSchedule]);

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const isToday =
          day.getDate() === new Date().getDate() &&
          day.getMonth() === new Date().getMonth() &&
          day.getFullYear() === new Date().getFullYear();
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        days.push(
          <div
            key={day}
            style={{
              flex: 1,
              padding: "10px",
              textAlign: "center",
              backgroundColor: isToday ? "#0078d4" : "",
              color: isWeekend(day) || isHoliday(day) ? "red" : "black",
              border: "1px solid #ddd",
              opacity: isCurrentMonth ? 1 : 0.3,
            }}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} style={{ display: "flex" }}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleWorkScheduleChange = (event) => {
    setWorkSchedule(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button onClick={prevMonth}>Previous Month</button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={nextMonth}>Next Month</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>Mon</div>
        <div style={{ flex: 1, textAlign: "center" }}>Tue</div>
        <div style={{ flex: 1, textAlign: "center" }}>Wed</div>
        <div style={{ flex: 1, textAlign: "center" }}>Thu</div>
        <div style={{ flex: 1, textAlign: "center" }}>Fri</div>
        <div style={{ flex: 1, textAlign: "center" }}>Sat</div>
        <div style={{ flex: 1, textAlign: "center" }}>Sun</div>
      </div>

      <div>{renderCalendar()}</div>

      <div className="mt-4 d-flex align-items-center">
        <div className="d-flex align-items-center me-2">
          <label className="d-flex">
            <input
              type="radio"
              value="5-2"
              className="me-1"
              checked={workSchedule === "5-2"}
              onChange={handleWorkScheduleChange}
            />
            5-2 schedule
          </label>
        </div>
        <div>
          <label className="d-flex">
            <input
              type="radio"
              value="6-1"
              className="me-1"
              checked={workSchedule === "6-1"}
              onChange={handleWorkScheduleChange}
            />
            6-1 schedule
          </label>
        </div>
      </div>
    </div>
  );
};

export default Calendar;