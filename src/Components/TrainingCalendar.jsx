import {
  Calendar,
  momentLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import React, { Fragment, useMemo, useState, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";
import * as dates from "../dates";
import PropTypes from "prop-types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchTrainings } from "../trainingapi";

const mLocalizer = momentLocalizer(moment);

// most of this is taken from Big Calendar documentation
// under basic example: https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/examples--example-1
export default function TrainingCalendar({ localizer = mLocalizer, ...props }) {
  const [events, setEvents] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    // the fetch for this is in trainingapi.js
    // map the required values to be displayed in the calendar
    fetchTrainings()
      .then((data) => {
        setEvents(
          data.map((training) => ({
            title:
              training.activity +
              " / " +
              training.customer.firstname +
              " " +
              training.customer.lastname,
            start: new Date(training.date),
            end: new Date(
              moment(training.date).add(training.duration, "minutes")
            ),
          }))
        );
      })
      .catch((error) => console.error(error));
  };

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: dayjs(new Date()),
      max: dates.add(dates.endOf(dayjs(new Date()), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <Fragment>
      <div className="height600" {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
          startAccessor={"start"}
          endAccessor={"end"}
          style={{ height: 600, width: "95%" }}
        />
      </div>
    </Fragment>
  );
}
TrainingCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
};
