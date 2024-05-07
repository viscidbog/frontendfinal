import React, { useState, useEffect } from "react";
import { fetchTrainings } from "../trainingapi";
import _ from "lodash";
import { _sumBy } from "lodash";
import { Typography } from "@mui/material";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// this function's return is mostly taken from the recharts documentation, specifically the example for SimpleBarChart: https://recharts.org/en-US/examples/SimpleBarChart
export default function TrainingChart() {
  const [dataValues, setDataValues] = useState([]);
  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // this fetches data using the fetch from trainingapi,
  // then wraps that data into a lodash object, groups it by activity,
  // maps it by activity and duration, and finally sums the durations together
  const handleFetch = () => {
    fetchTrainings().then((data) => {
      setDataValues(
        _(data)
          .groupBy("activity")
          .map((values, key) => ({
            activity: key,
            duration: _.sumBy(values, "duration"),
          }))
          .value()
      );
    });
  };
  return (
    <>
      <Typography variant="h4" sx={{ p: 2 }}>
        Training durations listed by activity:
      </Typography>
      <ResponsiveContainer width="50%" aspect={1.5}>
        <BarChart
          width={600}
          height={300}
          data={dataValues}
          margin={{
            top: 40,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="duration"
            fill="#4287f5"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
