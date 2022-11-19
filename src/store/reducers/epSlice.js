import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Eps
export const getEps = createAsyncThunk("eps/getEps", async (id) => {
  const res = await axios.get("/eps/list/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Create ep
export const createEp = createAsyncThunk("eps/createEp", async (ep) => {
  const res = await axios.post("/eps", ep, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Delete Ep in Movie

export const deleteEp = createAsyncThunk("eps/deleteEp", async (id) => {
  await axios.delete("/eps/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return id;
});

const epSlice = createSlice({
  name: "eps",
  initialState: {
    eps: [],
  },
  reducers: {},
  extraReducers: {
    [getEps.fulfilled]: (state, action) => {
      state.eps = action.payload;
      console.log("Get eps success!");
    },

    [createEp.fulfilled]: (state, action) => {
      const i = state.eps.findIndex((item) => item._id === action.payload._id);
      if (i > -1) state.eps[i] = action.payload;
      else {
        state.eps.push(action.payload);
        state.eps.sort(function (a, b) {
          return a.ep - b.ep;
        });
      }
      console.log("Create ep success!");
    },

    [deleteEp.fulfilled]: (state, action) => {
      state.eps = state.eps.filter((eps) => eps._id !== action.payload);
      console.log("Delete ep success!");
    },
  },
});

//Reducer

const epReducer = epSlice.reducer;

//Selector

export const epSelector = (state) => state.epReducer.eps;

//Action export
export const {} = epSlice.actions;

export default epReducer;
