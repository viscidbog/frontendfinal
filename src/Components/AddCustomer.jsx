import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// function to add a new customer
export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);

  // making a state with the required values
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  // handle dialog opening
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle dialog closing
  const handleClose = () => {
    setOpen(false);
  };

  // save customer and close dialog. gives an alert if all values are not filled.
  const handleSave = () => {
    if (
      customer.firstname &&
      customer.lastname &&
      customer.streetaddress &&
      customer.postcode &&
      customer.city &&
      customer.email &&
      customer.phone
    ) {
      addCustomer(customer);
      setCustomer({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
      });
      handleClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter customer information:</DialogContentText>
          <TextField
            margin="normal"
            label="First Name"
            fullWidth
            variant="outlined"
            value={customer.firstname}
            onChange={(event) =>
              setCustomer({ ...customer, firstname: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={customer.lastname}
            onChange={(event) =>
              setCustomer({ ...customer, lastname: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Street Address"
            fullWidth
            variant="outlined"
            value={customer.streetaddress}
            onChange={(event) =>
              setCustomer({ ...customer, streetaddress: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Postcode"
            fullWidth
            variant="outlined"
            value={customer.postcode}
            onChange={(event) =>
              setCustomer({ ...customer, postcode: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="City"
            fullWidth
            variant="outlined"
            value={customer.city}
            onChange={(event) =>
              setCustomer({ ...customer, city: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            variant="outlined"
            value={customer.email}
            onChange={(event) =>
              setCustomer({ ...customer, email: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="Phone"
            fullWidth
            variant="outlined"
            value={customer.phone}
            onChange={(event) =>
              setCustomer({ ...customer, phone: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
