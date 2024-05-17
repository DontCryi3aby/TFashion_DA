import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ChartComponent from "./ChartComponent";

export default function Dashboard() {
  const [record, setRecord] = useState([]);
  const [data, setdata] = useState([]);
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/homedashboard`)
      .then((response) => {
        setdata(response.data);
      });
  }, []);
  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <div class="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">TFashion</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">Admin</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </nav>
            <p class="lead d-none d-sm-block">Thống kê cửa hàng</p>

            <div
              class="alert alert-warning fade collapse"
              role="alert"
              id="myAlert"
            >
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
                <span class="sr-only">Close</span>
              </button>
              <strong>Data and Records</strong> Learn more about employee
            </div>
            <div class="row mb-3">
              <div class="col-xl-3 col-sm-6 py-2">
                <div class="card bg-success text-white h-100">
                  <div
                    class="card-body bg-success"
                    style={{ backgroundColor: "#57b960" }}
                  >
                    <div class="rotate">
                      <i class="fa fa-user fa-4x"></i>
                    </div>
                    <h6 class="text-uppercase">Khách hàng</h6>
                    <h1 class="display-4">{data.songuoidung}</h1>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-danger h-100">
                  <div class="card-body bg-danger">
                    <div class="rotate">
                      <i class="fa fa-list fa-4x"></i>
                    </div>
                    <h6 class="text-uppercase">Sản phẩm bán</h6>
                    <h1 class="display-4">{data.sosanpham}</h1>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-info h-100">
                  <div class="card-body bg-info">
                    <div class="rotate">
                      <i class="fab fa-twitter fa-4x"></i>
                    </div>
                    <h6 class="text-uppercase">Số đơn hàng</h6>
                    <h1 class="display-4">{data.tongdonhang}</h1>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-warning h-100">
                  <div class="card-body">
                    <div class="rotate">
                      <i class="fa fa-share fa-4x"></i>
                    </div>
                    <h6 class="text-uppercase">Doanh thu</h6>
                    <h1 class="display-4">{data.doanhthu} vnđ</h1>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div class="row ">
              <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
                <h4 className="title mt-3 mb-3 text-center text-secondary">
                  Data in Chart
                </h4>
                <ChartComponent />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
