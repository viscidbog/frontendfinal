import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchTrainings } from "../trainingapi";
import { parseISO } from "date-fns";
import { Typography } from "@mui/material";
import format from "date-fns/format";
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";

// training list for router
export default function TrainingList() {
  const [trainingData, setTrainingData] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // column definitions for ag-grid. valueformatters are used to get and modify values.
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
      valueFormatter: nameFormatter,
    },

    {
      // delete button
      cellRenderer: (params) => (
        <Button
          color="error"
          onClick={() =>
            deleteTraining(
              import.meta.env.VITE_TRAININGS_URL + "/" + params.data.id
            )
          }
        >
          Delete
        </Button>
      ),
      width: 100,
    },
  ]);

  // post a training to API
  const addTraining = (newTraining) => {
    fetch(import.meta.env.VITE_TRAININGS_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Error when adding training: " + response.statusText);
        return response.json();
      })
      .then(() => handleFetch())
      .catch((err) => console.error(err));
  };

  // valueformatter for date field. parses date from the raw data (which is in ISO format), then formats it to be more legible
  function dateFormatter(params) {
    if (params.value == null) {
      return "N/A";
    } else {
      return format(parseISO(params.value), "yyyy-MM-dd HH:mm");
    }
  }

  // valueformatter for duration field. adds "minutes" for ease of reading
  function durationFormatter(params) {
    if (params.value == null) {
      return "N/A";
    } else {
      return params.value + " minutes";
    }
  }

  // valueformatter for names.
  function nameFormatter(params) {
    if (params.data.customer == null) {
      return "N/A";
    } else {
      return (
        params.data.customer.firstname + " " + params.data.customer.lastname
      );
    }
  }

  const handleFetch = () => {
    // the fetch for this is in trainingapi.js
    fetchTrainings()
      .then((data) => setTrainingData(data))
      .catch((err) => console.error(err));
  };

  // delete training
  const deleteTraining = (url) => {
    if (window.confirm("Are you sure you with to delete this training?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Error in deleting training: " + response.statusText
            );
          return response.json();
        })
        .then(() => handleFetch())
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 700 }}>
        <AddTraining addTraining={addTraining} />
        <Typography variant="h4" sx={{ p: 2 }}>
          List of trainings
        </Typography>
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
