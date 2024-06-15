import React, { useContext, useEffect, useState } from "react";
import { Container, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { NotesContext } from "../context/noteContext";
import { getNotes } from "../context/apiCalls";
import NoteCard from "./NoteCard";

const Home = () => {
  const { notes, dispatch } = useContext(NotesContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;


  useEffect(() => {
    getNotes(dispatch);
  }, [dispatch]);

  const handleChange = (e) => {
    let val = e.target.value;
    setSearch(val);
    setCurrentPage(1);
  };

  const filteredNotes = notes
    .filter((note) =>
      search.toLowerCase() === ""
        ? note
        : note.title.toLowerCase().includes(search)
    )
    .sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.isPinned ? -1 : 1;
    });

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

  

  return (
    <>
      <Container
        sx={{
          marginTop: "10px",
        }}
      >
        <TextField
          id="search"
          variant="outlined"
          placeholder="Type something...(eg : java)"
          sx={{ width: "100%" }}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-around" },
            flexWrap: "wrap",
          }}
        >
          {currentNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </Box>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={Math.ceil(filteredNotes.length / notesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      </Container>
    </>
  );
};

export default Home;
