import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditCustomer({ data, updateCustomer }) {
  // handle dialog opening
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  // handle opening dialog and get values to edit
  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    });
  };

  // handle dialog closing
  const handleClose = () => {
    setOpen(false);
  };

  // save customer and close dialog
  const handleSave = () => {
    updateCustomer(data._links.customer.href, customer);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Edit Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit customer information:</DialogContentText>
          <TextField
            margin="normal"
            label="firstname"
            fullWidth
            variant="outlined"
            value={customer.firstname}
            onChange={(event) =>
              setCustomer({ ...customer, firstname: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="lastname"
            fullWidth
            variant="outlined"
            value={customer.lastname}
            onChange={(event) =>
              setCustomer({ ...customer, lastname: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="streetaddress"
            fullWidth
            variant="outlined"
            value={customer.streetaddress}
            onChange={(event) =>
              setCustomer({ ...customer, streetaddress: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="postcode"
            fullWidth
            variant="outlined"
            value={customer.postcode}
            onChange={(event) =>
              setCustomer({ ...customer, postcode: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="city"
            fullWidth
            variant="outlined"
            value={customer.city}
            onChange={(event) =>
              setCustomer({ ...customer, city: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="email"
            fullWidth
            variant="outlined"
            value={customer.email}
            onChange={(event) =>
              setCustomer({ ...customer, email: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="phone"
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
