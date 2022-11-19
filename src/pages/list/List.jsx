import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./list.css";

const List = () => {
  const location = useLocation();
  const { list } = location.state;

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh sách</h1>
        <Link to="/newList">
          <button className="productAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Movie hay Series:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tên danh sách</label>
            <input type="text" placeholder={list.title} />
            <label>Thể loại</label>
            <input type="text" placeholder={list.genre} />
            <label>Movie hay Series</label>
            <input type="text" placeholder={list.type} />
          </div>
          <div className="productFormRight">
            <button className="productButton">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
