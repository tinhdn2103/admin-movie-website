import React, { useEffect, useState } from "react";
import "./newList.css";
import { useNavigate } from "react-router-dom";

import { getMovies, movieSelector } from "../../store/reducers/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../store/reducers/listSlice";

const NewList = () => {
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const { movies } = useSelector(movieSelector);
  const dispatch = useDispatch();
  const dispatchMovie = useDispatch();

  useEffect(() => {
    dispatchMovie(getMovies());
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createList(list));
    navigate("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Danh sách mới</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Tiêu đề</label>
            <input
              type="text"
              placeholder="Phim trinh thám hay nhất"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Thể loại</label>
            <input
              type="text"
              placeholder="Thể loại"
              name="genre"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Series?</label>
            <select name="type" onChange={handleChange}>
              <option value="">Phim hay Series?</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Danh sách phim</label>
            {movies && (
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "280px", width: "300px" }}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <button className="addListButton" onClick={handleSubmit}>
          Tạo
        </button>
      </form>
    </div>
  );
};

export default NewList;
