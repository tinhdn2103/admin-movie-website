import "./widgetLg.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const WidgetLg = () => {
  const [newPayments, setNewPayments] = useState([]);
  useEffect(() => {
    const getPaymentsRecently = async () => {
      try {
        const res = await axios.get("/payment/recently", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewPayments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPaymentsRecently();
  }, []);
  return (
    <div>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Giao dịch gần đây</h3>
        <table className="widgetLgTable">
          <tbody>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Khách hàng</th>
              <th className="widgetLgTh">Ngày</th>
              <th className="widgetLgTh">Gói dịch vụ</th>
              <th className="widgetLgTh">Giá $</th>
            </tr>
            {newPayments.map((payment, index) => (
              <tr key={index} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src={
                      payment.order.user.profilePic ||
                      "https://firebasestorage.googleapis.com/v0/b/movie-web-fadf1.appspot.com/o/avatar_default.jpg?alt=media&token=58615de8-5e1d-4bc1-bf89-0ce4fdf004f3"
                    }
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">
                    {payment.order.user.username}
                  </span>
                </td>
                <td className="widgetLgDate">
                  {new Date(payment.createdAt).toISOString().split("T")[0]}
                </td>
                <td className="widgetLgService">
                  {payment.order.service.name}
                </td>
                <td className="widgetLgAmount">{payment.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WidgetLg;
