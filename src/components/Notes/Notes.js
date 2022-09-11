import React, { useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";
import styles from "./Notes.module.css";
import NotesContext from "../../context/notes-context";

const Notes = () => {
  const notesCtx = useContext(NotesContext);
  const notes = notesCtx.notes;

  return (
    <>
      <div className={styles.main}>
        {notes.map((note) => (
          <NoteCard key={note.noteID} note={note} notes={notes} />
        ))}
      </div>
    </>
  );
};

export default Notes;
