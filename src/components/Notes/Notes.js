import React, { useEffect, useState } from "react";
import { getNotesFromDatabase } from "../../firebase/firebaseConfig";
import NoteCard from "../NoteCard/NoteCard";
import styles from "./Notes.module.css";
import { BsArrowClockwise } from "react-icons/bs";

const Notes = () => {
  const uid = localStorage.getItem("id");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = () => {
    setIsLoading(true);
    getNotesFromDatabase(uid)
      .then((result) => {
        setNotes(result.notes);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // console.log(notes);
  return (
    <>
      <div className={styles.main}>
        {isLoading ? (
          notes.length === 0 ? (
            <p style={{ color: "#645caa", fontSize: "1.5rem" }}>
              No notes created
            </p>
          ) : (
            <BsArrowClockwise className={styles.loading} />
          )
        ) : (
          notes.map((note) => (
            <NoteCard key={note.noteID} note={note} notes={notes} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
