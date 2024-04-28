import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { fetchTrainings } from "../trainingapi";
import { parseISO } from "date-fns";
import format from "date-fns/format";

// training list for router
export default function TrainingList() {
  const [trainingData, setTrainingData] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // column definitions for ag-grid
  // eslint-disable-next-line no-unused-vars
  const [colDef, setColDef] = useState([
    {
      headerName: "Date",
      field: "date",
      filter: true,
      valueFormatter: dateFormatter,
    },
    {
      headerName: "Duration",
      field: "duration",
      filter: true,
      valueFormatter: durationFormatter,
    },
    { headerName: "Activity", field: "activity", filter: true },
    {
      headerName: "Customer",
      filter: true,
      // using valuegetter to get first and last names from customer object
      valueGetter: (p) =>
        p.data.customer.firstname + " " + p.data.customer.lastname,
    },
  ]);

  // valueformatter for date field. parses date from the raw data (which is in ISO format), then formats it to be more legible
  function dateFormatter(params) {
    return format(parseISO(params.value), "yyyy-MM-dd HH:mm");
  }

  // valueformatter for duration field. adds "minutes" for ease of reading
  function durationFormatter(params) {
    return params.value + " minutes";
  }

  const handleFetch = () => {
    // the fetch for this is in trainingapi.js
    fetchTrainings()
      .then((data) => setTrainingData(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 700, width: 1000 }}>
        <AgGridReact
          rowData={trainingData}
          columnDefs={colDef}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}
