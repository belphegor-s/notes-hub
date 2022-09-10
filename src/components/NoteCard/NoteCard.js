import React, { useState } from "react";
import styles from "./NoteCard.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteNoteFromDatabase } from "../../firebase/firebaseConfig";
import EditModal from "../EditModal/EditModal";

const NoteCard = (props) => {
  //   console.log(props.note);
  //   console.log(props.notes);
  const uid = localStorage.getItem("id");

  const [showModal, setShowModal] = useState(false);

  const editNoteClickHandler = () => {
    // console.log(props.note.noteID);
    setShowModal(true);
  };

  const deleteNoteClickHandler = () => {
    deleteNoteFromDatabase(uid, props.note.noteID, props.notes);
  };

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
        <p>{props.note.note}</p>
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
