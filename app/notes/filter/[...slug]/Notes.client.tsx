"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import css from "./NotesPage.module.css";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes } from "@/lib/api";

interface NoteClientProps {
  filter?: string;
}

export default function NotesClient({ filter }: NoteClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", { query, page, tag: filter }],
    queryFn: () => fetchNotes({ query, page, tag: filter }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    },
    1000
  );
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} handleChange={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page - 1}
            onPageChange={(nextZeroBased) => setPage(nextZeroBased + 1)}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {data && <NoteList notes={data.notes}></NoteList>}
    </div>
  );
}
