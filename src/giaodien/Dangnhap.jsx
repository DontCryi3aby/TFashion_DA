import React, { useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";

export default function Dangnhap() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  console.log(email);
  // Lưu thông tin người dùng vào localStorage
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/login`,
        { email, password }
      );
      if (response.status === 200) {
        const { token, user } = response.data;

        const userData = { token, user }; // Tạo đối tượng chứa thông tin người dùng
        const userDataJSON = JSON.stringify(userData); // Chuyển đối tượng thành chuỗi JSON

        localStorage.setItem("userData", userDataJSON); // Lưu chuỗi JSON vào localStorage
        alert("Login successful");
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("tài khoản,mật khẩu không chính xác");
      }
    }
  };

  return (
    <div>
      <div class="container">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h2 class="text-center">Đăng nhập</h2>
          </div>
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
