import "./widgetSm.css";
import React, { useEffect, useState } from "react";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUser();
  }, []);

  return (
    <div>
      <div className="widgetSm">
        <span className="widgetSmTitle">Thành viên mới tham gia</span>
        <ul className="widgetSmList">
          {newUsers.map((user) => (
            <li key={user._id} className="widgetSmListItem">
              <img
                src={
                  user.profilePic ||
                  "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Hiển thị
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetSm;
