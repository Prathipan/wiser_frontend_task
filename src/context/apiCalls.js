import axios from "axios"
import { createNotesFailure, createNotesStart, createNotesSuccess, deleteNotesFailure, deleteNotesStart, deleteNotesSuccess, getNotesFailure, getNotesStart, getNotesSuccess, updateNotesFailure, updateNotesStart, updateNotesSuccess } from "./noteActions"
import { api } from "../api";

export const getNotes = async(dispatch) => {
    dispatch(getNotesStart());
    try {
        const res = await axios.get(`${api}`);
        // console.log(res)
        dispatch(getNotesSuccess(res.data));
    } catch (error) {
        dispatch(getNotesFailure(error))
    }
}


export const createNotes = async(notes,dispatch) => {
    dispatch(createNotesStart());
    try {
        const res = await axios.post(`${api}/create`,notes);
        dispatch(createNotesSuccess(res.data));
    } catch (error) {
        dispatch(createNotesFailure())
    }
}

export const updateNotes = async(note,dispatch) => {
   dispatch(updateNotesStart());
   try {
    const res = await axios.put(`${api}/${note._id}`,note);
    // console.log(res.data)
    dispatch(updateNotesSuccess(res.data));   
    getNotes(dispatch);
   } catch (error) {
    dispatch(updateNotesFailure(error));
   }
}

export const deleteNotes = async(id,dispatch) => {
    dispatch(deleteNotesStart());
    try {
        const res = await axios.delete(`${api}/${id}`)
        dispatch(deleteNotesSuccess(res.data));
        getNotes(dispatch);
    } catch (error) {
        dispatch(deleteNotesFailure(error))
    }
}