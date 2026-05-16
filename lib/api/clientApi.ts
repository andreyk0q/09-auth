import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

interface AuthData {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const { data } = await api.post("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

export async function register(credentials: AuthData): Promise<User> {
  const { data } = await api.post("/auth/register", credentials);
  return data;
}

export async function login(credentials: AuthData): Promise<User> {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get("/auth/session");
  return data || null;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data;
}

export async function updateMe(userData: UpdateUserData): Promise<User> {
  const { data } = await api.patch("/users/me", userData);
  return data;
}