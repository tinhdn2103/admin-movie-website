import "./addVideo.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import storage from "../../firebase";
import { useLocation } from "react-router-dom";
import {
  createEp,
  deleteEp,
  epSelector,
  getEps,
} from "../../store/reducers/epSlice";

const AddVideo = () => {
  const location = useLocation();
  const { movie } = location.state;
  const listEps = useSelector(epSelector);

  const dispatch = useDispatch();

  const [ep, setEp] = useState({ movie: movie._id });

  const [uploaded, setUploaded] = useState(false);
  const [upload, setUpload] = useState(false);

  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(getEps(movie._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEp(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEp({ ...ep, [e.target.name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUpload(true);
    const fileName = new Date().getTime() + video.name;
    const uploadTask = storage
      .ref(`/video/${movie._id}/${fileName}`)
      .put(video);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prg = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        console.log("Upload is " + prg + "% done");
        setProgress(prg);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setEp((prev) => {
            return { ...prev, video: url };
          });

          setUploaded(true);
          setUpload(false);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEp(ep));
    setUploaded(false);
  };

  const columns = [
    {
      field: "ep",
      headerName: "T???p",
      width: 150,
    },
    { field: "title", headerName: "Ti??u ?????", width: 250 },
    { field: "desc", headerName: "M?? t???", width: 250 },
    {
      field: "action",
      headerName: "X??a",
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
    <div className="addVideo">
      {listEps && (
        <div className="videoList">
          <DataGrid
            rows={listEps}
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
          <label>Ch???n t???p</label>
          <select name="ep" id="ep" onChange={handleChange}>
            <option value="">T???p</option>
            {[...Array(movie.epNum)].map((x, index) => (
              <option key={index} value={index + 1}>
                T???p {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Ti??u ?????</label>
          <input
            type="text"
            placeholder="Ti??u ?????"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>M?? t???</label>
          <input
            type="text"
            placeholder="M?? t???"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>

        {uploaded ? (
          <button className="addProductButton" onClick={handleSubmit}>
            T???o
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            T???i l??n
          </button>
        )}

        {upload && (
          <div className="addProductItem">
            <p>??ang t???i {progress} %</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddVideo;
