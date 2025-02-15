import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { deleteNote } from "../api";
import { toast } from "react-toastify";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: () => void;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteNote(id);
        toast.success("Note deleted!");
        onDelete();
      } catch {
        toast.error("Error deleting note.");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      sx={{ mt: 2 }}
    >
      {notes.length === 0 ? (
        <Typography>No notes available.</Typography>
      ) : (
        notes.map((note) => (
          <Card key={note.id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2">{note.content}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onEdit(note)}
                sx={{ marginRight: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
