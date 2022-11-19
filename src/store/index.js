import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import movieReducer from "./reducers/movieSlice";
import listReducer from "./reducers/listSlice";
import actorMovieReducer from "./reducers/actorMovieSlice";
import epReducer from "./reducers/epSlice";
// Store
const store = configureStore({
  reducer: {
    authReducer,
    movieReducer,
    listReducer,
    actorMovieReducer,
    epReducer,
  },
});

// Export
export default store;
