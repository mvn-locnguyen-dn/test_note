import axios from "axios";

const API_URL = "http://localhost:3000/notes";

export const getNotes = async () => axios.get(API_URL);
export const getNote = async (id: number) => axios.get(`${API_URL}/${id}`);
export const createNote = async (note: { title: string; content: string }) =>
  axios.post(API_URL, note);
export const updateNote = async (
  id: number,
  note: { title: string; content: string }
) => axios.patch(`${API_URL}/${id}`, note);
export const deleteNote = async (id: number) =>
  axios.delete(`${API_URL}/${id}`);
