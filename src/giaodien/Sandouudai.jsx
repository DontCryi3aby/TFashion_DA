import React, { useState, useEffect } from "react";
import "../App.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import axios from "axios";
import Header from "../components/Header";
import { Box } from "@mui/material";

export default function Sandouudai() {
  const [category, setcategory] = useState([]);
  const [slsptgh, setslsptgh] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    const currentTime = new Date();
    const targetTime = new Date(currentTime);
    targetTime.setHours(24, 0, 0, 0);

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;
      setRemainingTime(Math.max(0, difference));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime / (60 * 1000)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/categoryproduct`)
      .then((response) => {
        setcategory(response.data.sandouudai);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  return (
    <div>
      <Header />
      <Box mt={2}>
        <div
          className="tieudecategory"
          style={{ display: "flex", height: 35, marginLeft: 200 }}
        >
          <p style={{ color: "grey" }}>
            <Link to="/"> Trang chủ / </Link>{" "}
          </p>{" "}
          <p style={{ color: "black", fontSize: 18, fontWeight: 550 }}>
            {" "}
            Bộ sưu tập mới
          </p>
        </div>
      </Box>
      <div
        className="containercategory"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="leftcategory" style={{ width: "23%" }}>
          <div
            className="damhmuccategory"
            style={{ position: "fixed", top: 200 }}
          >
            <div className="categorynho" style={{ width: 350 }}>
              <ul class="list-group my-4">
                <li class="list-group-item">
                  <Link to="/category/sominu"> Sơ mi nữ </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/chanvay"> Chân váy </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/vaydamcongso"> Váy đầm công sở </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/bosuutapmoi"> Bộ sưu tập mới </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/somichanvay"> Sơ mi chân váy </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/sandouudai"> Săn đồ ưu đãi </Link>
                </li>
                <li class="list-group-item">
                  <Link to="/category/xahang"> Xả hàng </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rightcategory" style={{ width: "53%", marginLeft: 20 }}>
          <img
            src="https://cdn.pancake.vn/1/s1440x1024/fwebp/2d/d4/5e/42/7bb34b4e57c87cd3a70611bdd5767704c9c267beb36a9ac787e09a2f.png"
            style={{ width: "100%", height: 320 }}
            alt=""
          />
          <div className="CountdownTimer" style={{ marginTop: 25 }}>
            <div className="CountdownTimer-box">
              <div className="CountdownTimer-unit">
                <div className="CountdownTimer-value">{hours}</div>
                <div className="CountdownTimer-label">Giờ</div>
              </div>
              <div className="CountdownTimer-separator">:</div>
              <div className="CountdownTimer-unit">
                <div className="CountdownTimer-value">{minutes}</div>
                <div className="CountdownTimer-label">Phút</div>
              </div>
              <div className="CountdownTimer-separator">:</div>
              <div className="CountdownTimer-unit">
                <div className="CountdownTimer-value">{seconds}</div>
                <div className="CountdownTimer-label">Giây</div>
              </div>
            </div>
          </div>

          <div className="categoryproduct">
            {category.map((cate) => {
              return (
                <div className="vaycategory">
                  <div className="vay1category">
                    <img
                      className="img-fluid"
                      style={{ width: 187, height: 300 }}
                      src={`${process.env.REACT_APP_BASEURL}/upload/${cate.hinhanh}`}
                      alt=""
                    />
                    <p className="ahoandzcategory">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>
                        {cate.title}
                      </Link>
                    </p>
                    <p>{cate.gia}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
