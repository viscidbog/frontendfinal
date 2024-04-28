import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchCustomers } from "../customerapi";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

// customer list for router
export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // column defs for ag grid
  // eslint-disable-next-line no-unused-vars
  const [colDef, setColDef] = useState([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true },
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true },
    { field: "city", filter: true },
    { field: "email", filter: true },
    { field: "phone", filter: true },
  ]);

  const handleFetch = () => {
    // the fetch for this is in customerapi.js
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 700, width: 1000 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDef}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}
