import { CSVLink } from "react-csv";
import { useMemo, useState, useEffect } from "react";
import { fetchCustomers } from "../customerapi";

const columns = [
  { Header: "First Name", accessor: "firstname" },
  { Header: "Last Name", accessor: "lastname" },
  { Header: "Street Address", accessor: "streetaddress" },
  { Header: "Post Code", accessor: "postcode" },
  { Header: "City", accessor: "city" },
  { Header: "Email", accessor: "email" },
  { Header: "Phone", accessor: "phone" },
];

// some of the functional parts for this were taken from Ag-grid's documentation: https://www.ag-grid.com/javascript-data-grid/csv-export/
export default function ExportCSV() {
  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);
  const [customers, setCustomers] = useState([]);
  const data = useMemo(() => customers, []);

  const handleFetch = () => {
    // the fetch for this is in customerapi.js
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const csvData = [
    [
      "First Name",
      "Last Name",
      "Street Address",
      "Post Code",
      "City",
      "Email",
      "Phone",
    ],
    ...data.map(
      ({
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      }) => [firstname, lastname, streetaddress, postcode, city, email, phone]
    ),
  ];
  return (
    <div className="App">
      <CSVLink
        className="downloadbtn"
        filename="exported_customer_data.csv"
        data={csvData}
      >
        Export to CSV
      </CSVLink>
    </div>
  );
}
