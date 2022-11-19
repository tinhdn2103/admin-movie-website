import "./addActor.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";

import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actorMovieSelector,
  createActorMovie,
  deleteActorMovie,
  getActorsOfMovie,
} from "../../store/reducers/actorMovieSlice";
import { useLocation } from "react-router-dom";

const AddActor = () => {
  const location = useLocation();
  const { movie } = location.state;
  const actors = useSelector(actorMovieSelector);

  const dispatch = useDispatch();

  const [actorMovie, setActorMovie] = useState({ movie: movie._id });

  const [listActors, setListActors] = useState([{}]);

  useEffect(() => {
    dispatch(getActorsOfMovie(movie._id));
  }, [dispatch]);

  useEffect(() => {
    const getActors = async () => {
      try {
        const res = await axios.get("/actors", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setListActors(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActors();
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteActorMovie(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setActorMovie({ ...actorMovie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createActorMovie(actorMovie));
  };

  const columns = [
    {
      field: "actor",
      headerName: "Diễn viên",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.actor.img} alt="" />
            {params.row.actor.name}
          </div>
        );
      },
    },
    { field: "character", headerName: "Vai", width: 200 },
    {
      field: "action",
      headerName: "Xóa",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="addActor">
      {actors && (
        <div className="actorList">
          <DataGrid
            rows={actors}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </div>
      )}
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Diễn viên</label>
          <select name="actor" id="actor" onChange={handleChange}>
            <option value="">Diễn viên</option>
            {listActors.map((actor, index) => (
              <option key={index} value={actor._id}>
                {actor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Vai</label>
          <input
            type="text"
            placeholder="Vai"
            name="character"
            onChange={handleChange}
          />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Tạo
        </button>
      </form>
    </div>
  );
};

export default AddActor;
