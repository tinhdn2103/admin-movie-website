import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import "./app.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setUser } from "./store/reducers/authSlice";
import ListListMovie from "./pages/listListMovie/ListListMovie";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import AddActor from "./pages/addActor/AddActor";
import AddVideo from "./pages/addVideo/AddVideo";
import { useEffect } from "react";

function App() {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return (
    <Router>
      {!user && (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}

      {user && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/newMovie" element={<NewMovie />} />
              <Route path="/lists" element={<ListListMovie />} />
              <Route path="/list/:listId" element={<List />} />
              <Route path="/newList" element={<NewList />} />
              <Route path="/addActor/:movieId" element={<AddActor />} />
              <Route path="/addVideo/:movieId" element={<AddVideo />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
