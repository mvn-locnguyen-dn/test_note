import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { getNotes } from "../api";
import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Notes App
      </Typography>
      <NoteForm
        note={selectedNote}
        onSuccess={() => {
          setSelectedNote(null);
          fetchNotes();
        }}
      />
      <NoteList
        notes={notes}
        onEdit={(note: Note) => setSelectedNote(note)}
        onDelete={fetchNotes}
      />
      <ToastContainer />
    </Container>
  );
}
