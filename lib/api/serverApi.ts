import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";
import type { FetchNotesResponse } from "./clientApi";

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: { Cookie: await getCookieHeader() },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: await getCookieHeader() },
  });

  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: await getCookieHeader() },
  });

  return data;
}

export async function checkSession(
  cookieHeader?: string
): Promise<AxiosResponse<User | null>> {
  return api.get<User | null>("/auth/session", {
    headers: {
      Cookie: cookieHeader ?? (await getCookieHeader()),
    },
  });
}
