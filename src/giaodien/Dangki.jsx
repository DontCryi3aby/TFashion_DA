import React, { useState, useEffect } from "react";
import "../App.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dangki() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hoten", name);
      formData.append("sodt", sdt);
      formData.append("email", email);
      formData.append("matkhau", password);

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/dkdn`,
        formData
      );
      if (response.data.error) {
        console.log(response.data.error);
        alert(errorMessage);
        setErrorMessage(response.data.error); // Lưu thông báo lỗi từ phản hồi vào trạng thái errorMessage
      } else {
        alert("Đăng kí tài khoản thành công");
        setname("");
        setsdt("");
        setemail("");
        setpassword("");
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error); // Gán thông báo lỗi từ phản hồi vào trạng thái errorMessage
      } else {
        alert(errorMessage);
      }
    }
  }
  return (
    <div>
      <div class="container">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h2 class="text-center">ĐĂNG KÍ</h2>
          </div>
          <div class="panel-body">
            <form onSubmit={save}>
              <div class="form-group">
                <label style={{ float: "left", fontWeight: 500 }} for="usr">
                  Full Name *
                </label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required="true"
                  type="text"
                  class="form-control"
                  id="usr"
                />
              </div>

              <div class="form-group">
                <label style={{ float: "left", fontWeight: 500 }} for="address">
                  Số điện thoại *
                </label>
                <input
                  value={sdt}
                  onChange={(e) => setsdt(e.target.value)}
                  type="text"
                  class="form-control"
                  id="address"
                />
              </div>

              <div class="form-group">
                <label style={{ float: "left", fontWeight: 500 }} for="email">
                  Email *
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required="true"
                  type="email"
                  class="form-control"
                  id="email"
                />
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </div>

              <div class="form-group">
                <label style={{ float: "left", fontWeight: 500 }} for="pwd">
                  Password *
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required="true"
                  type="password"
                  class="form-control"
                  id="pwd"
                />
              </div>

              <button class="btn btn-success">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
