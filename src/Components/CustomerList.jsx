import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchCustomers } from "../customerapi";
import AddCustomer from "./AddCustomer";
import Button from "@mui/material/Button";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import EditCustomer from "./EditCustomer";

// customer list for router
export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // column defs for ag grid
  const [colDef, setColDef] = useState([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true },
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true },
    { field: "city", filter: true },
    { field: "email", filter: true },
    { field: "phone", filter: true },
    {
      // update button
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updateCustomer={updateCustomer} />
      ),
    },
    {
      // delete button
      cellRenderer: (params) => (
        <Button
          color="error"
          onClick={() => deleteCustomer(params.data._links.customer.href)}
        >
          Delete
        </Button>
      ),
      width: 100,
    },
  ]);

  // post a customer to API
  const addCustomer = (newCustomer) => {
    fetch(import.meta.env.VITE_CUSTOMER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error when adding a customer: " + response.statusText
          );
        return response.json();
      })
      .then(() => handleFetch())
      .catch((err) => console.error(err));
  };

  // fetch customer data for ag-grid
  const handleFetch = () => {
    // the fetch for this is in customerapi.js
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  // put updated customer to API
  const updateCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error when editing customer: " + response.statusText
          );
        return response.json();
      })
      .then(() => handleFetch())
      .catch((err) => console.error(err));
  };

  // delete customer
  const deleteCustomer = (url) => {
    if (
      window.confirm(
        "Are you sure you with to delete this customer? Doing so will also delete their trainings."
      )
    ) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Error in deleting customer: " + response.statusText
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
        <AddCustomer addCustomer={addCustomer} />
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
