import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getPaymentStats = async () => {
      try {
        const res = await axios.get("/payment/stats", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        const paymentStatsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        paymentStatsList.map((item) =>
          setPaymentStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Income: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
    getPaymentStats();
  }, [MONTHS]);

  console.log(userStats);
  return (
    <div className="home">
      <Featured />
      <Chart
        data={paymentStats}
        title="Phân tích doanh thu"
        grid
        dataKey="Income"
      />
      <Chart
        data={userStats}
        title="Phân tích người dùng"
        grid
        dataKey="New User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
