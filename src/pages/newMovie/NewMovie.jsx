import React, { useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../store/reducers/movieSlice";
import { useDispatch } from "react-redux";

const NewMovie = () => {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.file.name;
      const uploadTask = storage
        .ref(`/${item.label}/${fileName}`)
        .put(item.file);
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });

            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: trailer, label: "trailer" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMovie(movie));
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Phim mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Poster</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Ảnh tên phim</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Tên phim</label>
          <input
            type="text"
            placeholder="Nope"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Năm</label>
          <input
            type="text"
            placeholder="Năm"
            name="year"
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
          <label>Số tập</label>
          <input
            type="text"
            placeholder="Số tập"
            name="epNum"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Thời lượng 1 tập</label>
          <input
            type="text"
            placeholder="Thời lượng 1 tập"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Giới hạn</label>
          <input
            type="text"
            placeholder="Giới hạn"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="">Series?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>

        {uploaded === 3 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Tạo
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Tải lên
          </button>
        )}
        {uploaded === 3 && (
          <div className="addProductItem">
            <p>Đã tải lên</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewMovie;
