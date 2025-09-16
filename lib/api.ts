import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteServiceProps {
  query: string;
  page: number;
  tag?: NoteTag | string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteProp {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({ query, page, tag }: NoteServiceProps) => {
  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
};

export async function createNote(newNote: CreateNoteProp): Promise<Note> {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
}
