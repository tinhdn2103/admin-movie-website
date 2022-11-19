import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Lists
export const getLists = createAsyncThunk("list/getLists", async () => {
  const res = await axios.get("/lists", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Create List
export const createList = createAsyncThunk("list/createList", async (list) => {
  const res = await axios.post("/lists", list, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Delete List

export const deleteList = createAsyncThunk("list/deleteList", async (id) => {
  await axios.delete("/lists/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return id;
});

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getLists.pending]: (state, action) => {
      state.lists = null;
      state.isFetching = true;
      state.error = false;
      console.log("Get list start!");
    },
    [getLists.fulfilled]: (state, action) => {
      state.lists = action.payload;
      state.isFetching = false;
      state.error = false;
      console.log("Get list success!");
    },
    [getLists.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Get list failure!");
    },

    [createList.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Create list start!");
    },
    [createList.fulfilled]: (state, action) => {
      // state.lists.push(action.payload);
      state.isFetching = false;
      state.error = false;
      console.log("Create list success!");
    },
    [createList.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Create list failure!");
    },
    [deleteList.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Delete list start!");
    },
    [deleteList.fulfilled]: (state, action) => {
      state.lists = state.lists.filter((list) => list._id !== action.payload);
      state.isFetching = false;
      state.error = false;
      console.log("Delete list success!");
    },
    [deleteList.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Delete list failure!");
    },
  },
});

//Reducer

const listReducer = listSlice.reducer;

//Selector

export const listSelector = (state) => ({
  lists: state.listReducer.lists,
  isFetching: state.listReducer.isFetching,
  error: state.listReducer.error,
});

//Action export
export const {} = listSlice.actions;

export default listReducer;
