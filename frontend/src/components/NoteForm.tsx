import { useState, useEffect } from "react";
import { createNote, updateNote } from "../api";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteFormProps {
  note?: Note | null;
  onSuccess: () => void;
}

export default function NoteForm({ note, onSuccess }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (note) {
        await updateNote(note.id, { title, content });
        toast.success("Note updated successfully!");
      } else {
        await createNote({ title, content });
        toast.success("Note created successfully!");
      }
      setTitle("");
      setContent("");
      onSuccess();
    } catch {
      toast.error("Error saving note.");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
      <Typography variant="h6">
        {note ? "Edit Note" : "Add New Note"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Content"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          {note ? "Update" : "Create"}
        </Button>
      </form>
    </Paper>
  );
}
