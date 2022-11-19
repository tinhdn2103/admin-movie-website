import React, { useState } from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  PlayCircleOutline,
  List,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeId, setActiveId] = useState("home");
  const handleClick = (id) => (e) => {
    setActiveId(id);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                id="home"
                className={`sidebarListItem ${activeId === "home" && "active"}`}
                onClick={handleClick("home")}
              >
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Phân tích
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Bán hàng
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Truy cập nhanh</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li
                id="movie"
                className={`sidebarListItem ${
                  activeId === "movie" && "active"
                }`}
                onClick={handleClick("movie")}
              >
                <PlayCircleOutline className="sidebarIcon" />
                Phim
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li
                id="list"
                className={`sidebarListItem ${activeId === "list" && "active"}`}
                onClick={handleClick("list")}
              >
                <List className="sidebarIcon" />
                Danh sách phim
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Báo cáo
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Hòm thư
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Phản hồi
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Tin nhắn
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Nhân viên</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Quản lý
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Phân tích
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Báo cáo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
