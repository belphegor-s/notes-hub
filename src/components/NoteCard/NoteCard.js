import React, { useContext, useState } from "react";
import styles from "./NoteCard.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteNoteFromDatabase } from "../../firebase/firebaseConfig";
import EditModal from "../EditModal/EditModal";
import NotesContext from "../../context/notes-context";
import { toast } from "react-hot-toast";

const NoteCard = (props) => {
  const uid = localStorage.getItem("id");

  const [showModal, setShowModal] = useState(false);
  const notesCtx = useContext(NotesContext);

  const editNoteClickHandler = () => {
    // console.log(props.note.noteID);
    setShowModal(true);
  };

  const deleteNoteClickHandler = () => {
    notesCtx.setNotes(
      notesCtx.notes.filter((note) => note.noteID !== props.note.noteID)
    );
    deleteNoteFromDatabase(uid, props.note.noteID, props.notes);
    toast.error("Note Deleted");
  };
  // console.log(props.note.note);
  return (
    <>
      {showModal && (
        <EditModal
          show={showModal}
          onClose={() => setShowModal(false)}
          noteID={props.note.noteID}
          notes={props.notes}
        />
      )}
      <div
        className={styles["note-card"]}
        style={{
          backgroundColor: props.note.bgColor,
          color: props.note.fontColor,
        }}
      >
        <div className={styles.title}>{props.note.title}</div>
        <pre className={styles.note}>{props.note.note}</pre>
        <div className={styles["bottom-options"]}>
          <abbr title="Edit Note" onClick={editNoteClickHandler}>
            <AiFillEdit className={styles.icon} />
          </abbr>
          <abbr title="Delete Note" onClick={deleteNoteClickHandler}>
            <AiFillDelete className={styles.icon} />
          </abbr>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
