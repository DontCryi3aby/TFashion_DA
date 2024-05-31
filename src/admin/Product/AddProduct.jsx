import axios from "axios";
import { default as React, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { AdminHeader } from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

export default function AddProduct() {
  const [hinhanh, sethinhanh] = useState("");
  const [title, settitle] = useState("");
  const [gia, setgia] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [product, setproduct] = useState([]);
  const [danhmuc, setdanhmuc] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/product`)
      .then((response) => {
        // Kiểm tra có trả về dữ liệu hay không
        setproduct(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/thuocdanhmuc`)
      .then((response) => {
        setdanhmuc(response.data);
      });
  }, []);

  const xoasp = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/deleteproduct/${id}`)
      .then((response) => {
        window.location.reload();
        alert("xóa sản phẩm thành công");
      });
  };

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hinhanh", event.target.hinhanh.files[0]);
      formData.append("title", title);
      formData.append("gia", gia);
      formData.append("category_id", category_id);
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/add_product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("data", response);
      alert("Product added successfully");
      sethinhanh("");
      settitle("");
      setgia("");
      setcategory_id("");
      // window.location.reload();

      // Di chuyển file hình ảnh vào thư mục public/upload
    } catch (err) {
      alert("Failed to add product");
    }
  }

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <div className="custom-margin-top">
            <div class="row row-offcanvas row-offcanvas-right">
              <div class="col-md-12">
                <h2>Thêm sản phẩm</h2>
                <form onSubmit={save}>
                  <div class="form-group">
                    <label for="hinhanh">Hình Ảnh</label>
                    <input
                      type="file"
                      name="hinhanh"
                      class="form-control-file"
                      id="hinhanh"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="title">Tên Sản Phẩm</label>
                    <input
                      type="text"
                      name="title"
                      class="form-control"
                      id="title"
                      placeholder="Nhập Tên Sản Phẩm"
                      required
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </div>

                  <div class="form-group">
                    <label for="gia">Giá</label>
                    <input
                      type="text"
                      name="gia"
                      class="form-control"
                      id="gia"
                      placeholder="Nhập Giá Tiền"
                      required
                      value={gia}
                      onChange={(e) => setgia(e.target.value)}
                    />
                  </div>

                  <div class="form-group">
                    <label for="category_id">Danh mục</label>
                    <select
                      name="category_id"
                      class="custom-select"
                      id="category_id"
                      required
                      value={category_id}
                      onChange={(e) => setcategory_id(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Chọn danh mục...
                      </option>
                      {danhmuc.map((dm) => (
                        <option key={dm.id} value={dm.id}>
                          {dm.namecategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Thêm Sản Phẩm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
