import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditTraining({ data, updateTraining }) {
  // handle dialog opening
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  // handle opening dialog and get values to edit
  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      date: data.date,
      duration: data.duration,
      activity: data.activity,
      customer: data.customer,
    });
  };

  // handle dialog closing
  const handleClose = () => {
    setOpen(false);
  };

  // save training and close dialog
  const handleSave = () => {
    updateTraining(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings" +
        data.id,
      training
    );
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Edit Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Training</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit training information:</DialogContentText>
          <TextField
            margin="normal"
            label="date"
            fullWidth
            variant="outlined"
            value={training.date}
            onChange={(event) =>
              setTraining({ ...training, date: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="duration"
            fullWidth
            variant="outlined"
            value={training.duration}
            onChange={(event) =>
              setTraining({ ...training, duration: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="activity"
            fullWidth
            variant="outlined"
            value={training.activity}
            onChange={(event) =>
              setTraining({ ...training, activity: event.target.value })
            }
          />
          <TextField
            margin="normal"
            label="customer"
            fullWidth
            variant="outlined"
            value={training.customer}
            onChange={(event) =>
              setTraining({ ...training, customer: event.target.value })
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
