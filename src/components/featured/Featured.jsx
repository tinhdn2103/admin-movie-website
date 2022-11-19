import "./featured.css";
import React, { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward, Remove } from "@material-ui/icons";
import axios from "axios";

const Featured = () => {
  const [usersFeatured, setUsersFeatured] = useState({});
  const [incomeFeatured, setIncomeFeatured] = useState({});
  useEffect(() => {
    const getUsersFeatured = async () => {
      try {
        const res = await axios.get("/users/bymonth", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUsersFeatured(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getIncomeFeatured = async () => {
      try {
        const res = await axios.get("/payment/bymonth", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setIncomeFeatured(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersFeatured();
    getIncomeFeatured();
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Người dùng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{usersFeatured.users}</span>
          <span className="featuredMoneyRate">
            {usersFeatured.growth === null ? (
              <ArrowUpward className="featuredIcon" />
            ) : usersFeatured.growth === 0 ? (
              <>
                {usersFeatured.growth}
                <Remove className="featuredIcon notChange" />
              </>
            ) : usersFeatured.growth > 0 ? (
              <>
                +{usersFeatured.growth}
                <ArrowUpward className="featuredIcon" />
              </>
            ) : (
              <>
                {usersFeatured.growth}
                <ArrowDownward className="featuredIcon negative" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Doanh thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${incomeFeatured.payments}</span>
          <span className="featuredMoneyRate">
            {incomeFeatured.growth === null ? (
              <ArrowUpward className="featuredIcon" />
            ) : incomeFeatured.growth === 0 ? (
              <>
                {incomeFeatured.growth}
                <Remove className="featuredIcon notChange" />
              </>
            ) : incomeFeatured.growth > 0 ? (
              <>
                +{incomeFeatured.growth}
                <ArrowUpward className="featuredIcon" />
              </>
            ) : (
              <>
                {incomeFeatured.growth}
                <ArrowDownward className="featuredIcon negative" />
              </>
            )}
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Chi phí</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div> */}
    </div>
  );
};

export default Featured;
