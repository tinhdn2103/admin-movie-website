import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Movies
export const getMovies = createAsyncThunk("movie/getMovies", async () => {
  const res = await axios.get("/movies", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Create Movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movie) => {
    const res = await axios.post("/movies", movie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Delete Movie

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  await axios.delete("/movies/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return id;
});

//Update Movie

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (id, movie) => {
    const res = await axios.put("/movies/" + id, movie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    //login

    [getMovies.pending]: (state, action) => {
      state.movies = null;
      state.isFetching = true;
      state.error = false;
      console.log("Get movie start!");
    },
    [getMovies.fulfilled]: (state, action) => {
      state.movies = action.payload;
      state.isFetching = false;
      state.error = false;
      console.log("Get movie success!");
    },
    [getMovies.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Get movie failure!");
    },

    [createMovie.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Create movie start!");
    },
    [createMovie.fulfilled]: (state, action) => {
      state.movies.push(action.payload);
      state.isFetching = false;
      state.error = false;
      console.log("Create movie success!");
    },
    [createMovie.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Create movie failure!");
    },
    [deleteMovie.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Delete movie start!");
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
      state.isFetching = false;
      state.error = false;
      console.log("Delete movie success!");
    },
    [deleteMovie.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Delete movie failure!");
    },
    [updateMovie.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Update movie start!");
    },
    [updateMovie.fulfilled]: (state, action) => {
      state.movies = state.movies.map(
        (movie) => movie._id === action.payload._id && action.payload
      );
      state.isFetching = false;
      state.error = false;
      console.log("Update movie success!");
    },
    [updateMovie.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Update movie failure!");
    },
  },
});

//Reducer

const movieReducer = movieSlice.reducer;

//Selector

export const movieSelector = (state) => ({
  movies: state.movieReducer.movies,
  isFetching: state.movieReducer.isFetching,
  error: state.movieReducer.error,
});

//Action export
export const {} = movieSlice.actions;

export default movieReducer;
