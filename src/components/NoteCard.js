import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { deleteNotes, updateNotes } from "../context/apiCalls";
import { NotesContext } from "../context/noteContext";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import EditNote from "./EditNote";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NoteCard = ({ note }) => {
  // console.log(note);

  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(NotesContext);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteNotes(id, dispatch);
  };

  const togglePin = (note) => {
    const updatedNote = { ...note, isPinned: !note.isPinned };
    updateNotes(updatedNote, dispatch);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          minWidth: { xs: 275, md: 350 },
          maxWidth: 275,
          minHeight: 200,
          margin: "20px 20px 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" component="div">
              {note.title}
            </Typography>
            <IconButton onClick={() => togglePin(note)}>
              {note.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            {note.body.length > 100 ? (
              <span>{note.body.slice(0, 100)}...</span>
            ) : (
              <span>{note.body}</span>
            )}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small" onClick={handleClickOpen}>
            View note
          </Button>
          <Box>
            <DeleteIcon
              sx={{ color: "red", marginLeft: "5px", cursor: "pointer" }}
              onClick={() => handleDelete(note._id)}
            />
          </Box>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent sx={{ minWidth: "400px" }}>
          <EditNote note={note} handleClose={handleClose} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NoteCard;
