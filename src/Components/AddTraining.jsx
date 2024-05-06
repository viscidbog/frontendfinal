import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchCustomers } from "../customerapi";
import { formatISO } from "date-fns";
import { InputLabel } from "@mui/material";

// function to add a new training
export default function AddTraining({ addTraining }) {
  // state to save customer info
  const [customers, setCustomers] = useState([]);

  // useEffect for doing the fetch just the once
  useEffect(() => {
    handleFetch();
  }, []);

  // handling opening dialog
  const [open, setOpen] = useState(false);

  // function to change date value with datepicker and to save it to training.date,
  // while formatting it into ISO. this gets a Date object but only saves the part that can be formatted.
  function changeDate(variable) {
    setTraining({ ...training, date: formatISO(variable.$d) });
  }

  // making a state with the required values
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  // handle dialog opening
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle dialog closing
  const handleClose = () => {
    setOpen(false);
  };

  // save training and close dialog. gives an alert if all values are not filled.
  const handleSave = () => {
    if (
      training.date &&
      training.duration &&
      training.activity &&
      training.customer
    ) {
      console.log(training);
      addTraining(training);
      setTraining({
        date: "",
        duration: "",
        activity: "",
        customer: "",
      });
      handleClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  // fetch customer data for selection
  const handleFetch = () => {
    // the fetch for this is in customerapi.js
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        New training
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New training</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter training information:</DialogContentText>
            <DatePicker
              // datepicker to get the date. saves the value using a function shown above.
              label="Date"
              format="YYYY.MM.DD HH.mm"
              defaultValue={dayjs(new Date())}
              onChange={(date) => changeDate(date)}
            />
            <TextField
              margin="dense"
              label="Duration"
              fullWidth
              variant="outlined"
              value={training.duration}
              onChange={(event) =>
                setTraining({
                  ...training,
                  duration: event.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              label="Activity"
              fullWidth
              variant="outlined"
              value={training.activity}
              onChange={(event) =>
                setTraining({ ...training, activity: event.target.value })
              }
            />
            <InputLabel id="customer-label">Customer</InputLabel>
            <Select
              // select component to select the chosen customer. gets the list of fetched customers,
              // then maps them into individual menu items.
              margin="dense"
              labelId="customer-label"
              label="customer"
              fullWidth
              variant="outlined"
              value={training.customer}
              onChange={(event) =>
                setTraining({ ...training, customer: event.target.value })
              }
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer.firstname}
                  value={customer._links.self.href}
                >
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
}
