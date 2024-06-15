import { createContext, useReducer } from "react";
import NoteReducer from "./noteReducer";

const INITIAL_STATE = {
  notes: [],
  isLoading: false,
  error: false,
};

export const NotesContext = createContext(INITIAL_STATE);

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NoteReducer, INITIAL_STATE);

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
