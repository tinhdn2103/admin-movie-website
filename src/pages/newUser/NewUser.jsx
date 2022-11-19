import React from "react";
import "./newUser.css";

const NewUser = () => {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên người dùng</label>
          <input type="text" placeholder="tinhdn" />
        </div>
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input type="text" placeholder="Đỗ Ngọc Tỉnh" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="tinhdn@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Mật khẩu" />
        </div>
        <div className="newUserItem">
          <label>Điện thoại</label>
          <input type="text" placeholder="0975 736 412" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" placeholder="Hà Nội | Việt Nam" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Kích hoạt</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </select>
        </div>
        <button className="newUserButton">Tạo</button>
      </form>
    </div>
  );
};

export default NewUser;
