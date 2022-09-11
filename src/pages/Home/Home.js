import React, { useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";
import {
  addNoteInDatabase,
  getNotesFromDatabase,
  updateNoteInDatabase,
} from "../../firebase/firebaseConfig";
import { idGen } from "../../util/id-gen";
import Notes from "../../components/Notes/Notes";
import { IoMdColorPalette } from "react-icons/io";
import { BiFontColor } from "react-icons//bi";
import { TwitterPicker } from "react-color";
import NotesContext from "../../context/notes-context";
import { BsArrowClockwise } from "react-icons/bs";

const Home = () => {
  const [inputHiddenState, setInputHiddenState] = useState(true);
  const [bgColor, setBgColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [displayFontColorPicker, setDisplayFontColorPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedNotes, setFetchedNotes] = useState([]);

  const uid = localStorage.getItem("id");

  const notesCtx = useContext(NotesContext);

  const fetchNotes = () => {
    setIsLoading(true);
    getNotesFromDatabase(uid)
      .then((result) => {
        setFetchedNotes(result.notes);
        notesCtx.setNotes(result.notes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNoteHandler = () => {
    if (fetchedNotes.length !== 0) {
      const noteData = {
        notes: [
          ...fetchedNotes,
          {
            noteID: idGen(),
            title: title,
            note: note,
            bgColor: bgColor,
            fontColor: fontColor,
          },
        ],
      };
      updateNoteInDatabase(uid, noteData);
      alert("Note Created");
    } else {
      const noteData = {
        uid: uid,
        notes: [
          {
            noteID: idGen(),
            title: title,
            note: note,
            bgColor: bgColor,
            fontColor: fontColor,
          },
        ],
      };
      addNoteInDatabase(uid, noteData)
        .then((res) => {
          setInputHiddenState(true);
          alert("Note Created");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        {inputHiddenState && (
          <input
            className={styles.input}
            type="text"
            placeholder="Take a note..."
            onFocus={() => setInputHiddenState(false)}
            // onBlur={() => setInputHiddenState(true)}
          />
        )}
        {!inputHiddenState && (
          <div
            className={styles["input-hidden"]}
            style={{ backgroundColor: bgColor, color: fontColor }}
          >
            <input
              className={styles["input-expanded"]}
              type="text"
              placeholder="Title"
              style={{ color: fontColor }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              className={styles["input-expanded"]}
              placeholder="Take a note..."
              style={{ color: fontColor }}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className={styles["bottom-options"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className={styles["picker"]}>
                  <abbr title="Set Background Color">
                    <IoMdColorPalette
                      className={styles.icons}
                      onClick={() => {
                        setDisplayBgColorPicker(true);
                      }}
                    />
                  </abbr>
                  {displayBgColorPicker ? (
                    <div className={styles.popover}>
                      <div
                        className={styles.cover}
                        onClick={() => {
                          setDisplayBgColorPicker(false);
                        }}
                      />
                      <div className={styles.popover}>
                        <TwitterPicker
                          triangle="hide"
                          onChangeComplete={(color) => {
                            setBgColor(color.hex);
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className={styles["picker"]}>
                  <abbr title="Set Font Color">
                    <BiFontColor
                      className={styles.icons}
                      onClick={() => {
                        setDisplayFontColorPicker(true);
                      }}
                    />
                  </abbr>
                  {displayFontColorPicker ? (
                    <div className={styles.popover}>
                      <div
                        className={styles.cover}
                        onClick={() => {
                          setDisplayFontColorPicker(false);
                        }}
                      />
                      <div className={styles.popover}>
                        <TwitterPicker
                          triangle="hide"
                          onChangeComplete={(color) => {
                            setFontColor(color.hex);
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  onClick={saveNoteHandler}
                  className={styles["button"]}
                  style={{ marginRight: "1rem" }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setInputHiddenState(true);
                    setBgColor("");
                    setFontColor("");
                  }}
                  className={styles["button"]}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading && fetchedNotes ? (
        <div className={styles["loading-wrap"]}>
          <BsArrowClockwise className={styles.loading} />
        </div>
      ) : (
        <Notes />
      )}
      <Footer />
    </>
  );
};

export default Home;
