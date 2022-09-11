import React, { useState } from "react";

const NotesContext = React.createContext({
  notes: [],
  setNotes: (notes) => {},
  emptyNotes: () => {},
});

export const NotesContextProvider = (props) => {
  const [notes, setNotes] = useState([]);

  const setNotesHandler = (notes) => {
    setNotes(notes);
  };

  const emptyNotesHandler = () => {
    setNotes([]);
  };

  // console.log(notes);

  const contextValue = {
    notes: notes,
    setNotes: setNotesHandler,
    emptyNotes: emptyNotesHandler,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
