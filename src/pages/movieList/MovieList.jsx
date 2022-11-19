import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteMovie,
  getMovies,
  movieSelector,
} from "../../store/reducers/movieSlice";

const MovieList = () => {
  const { movies } = useSelector(movieSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Phim",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Thể loại", width: 90 },
    { field: "year", headerName: "Năm", width: 90 },
    { field: "limit", headerName: "Giới hạn", width: 90 },
    { field: "isSeries", headerName: "Series", width: 90 },
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id} state={{ movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
    {
      field: "actor",
      headerName: "Diễn viên",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/addActor/" + params.row._id}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Xem</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "video",
      headerName: "Video",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/addVideo/" + params.row._id}
              state={{ movie: params.row }}
            >
              <Add className="addVideoBtn" />
            </Link>
          </>
        );
      },
    },
  ];
  return (
    movies && (
      <div className="movieList">
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      </div>
    )
  );
};

export default MovieList;
