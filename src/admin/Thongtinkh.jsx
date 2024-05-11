import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function Thongtinkh() {
  const [data, setdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/thongtinkhachhang`)
      .then((response) => {
        setdata(response.data);
      });
  }, []);
  const handledelete = (id) => {
    axios.delete(
      `${process.env.REACT_APP_BASEURL}/api/thongtinkhachhang/${id}`
    );
    alert("xóa thành công");
    window.location.reload();
  };

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <div className="custom-margin-top">
            <h2>Danh sách người dùng</h2>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">email</th>
                  <th scope="col">mật khẩu</th>
                  <th scope="col">họ tên</th>
                  <th scope="col">số điện thoại</th>

                  <th scope="col">xóa</th>
                </tr>
              </thead>
              <tbody>
                {data.map((donhang) => {
                  return (
                    <tr>
                      <td>{donhang.email}</td>
                      <td>{donhang.password}</td>
                      <td>{donhang.name}</td>
                      <td>{donhang.sdt}</td>

                      <td>
                        <button onClick={() => handledelete(donhang.id)}>
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
