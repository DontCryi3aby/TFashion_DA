import axios from "axios";
import { default as React, useEffect, useState } from "react";

import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

import GrainIcon from "@mui/icons-material/Grain";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Container, Stack } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [detail, setDetail] = useState();
  const navigate = useNavigate();

  if (detail) {
    console.log({ detail });
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/detail/${id}`)
      .then((response) => {
        setDetail(response.data);
      });
  }, [id]);
  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          {product && detail ? (
            <>
              <Container maxWidth="xl" sx={{ mt: 4, flex: 1 }}>
                <Typography variant="h5">Chi tiết sản phẩm</Typography>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={5}>
                    <Box
                      sx={{
                        height: 500,
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                        alt="Ảnh sản phẩm"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Stack component="form" method="POST" textAlign="left">
                      <Typography variant="h4">{product.title}</Typography>
                      <Typography sx={{ mt: 2 }}>
                        <b>Tình trạng</b>: còn hàng
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Typography variant="h5" sx={{ color: "#eb2323" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.gia * 1000)}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.gia * 1000 + 30000)}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography>
                          <b>Size: </b>
                          S, M, L, XL, XL
                        </Typography>
                      </Box>

                      <Box mt={2}>
                        <Typography>
                          <b>Chất liệu: </b>
                          {detail.chatlieu}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography>
                          <b>Thế mạnh: </b>
                          {detail.themanhsp}
                        </Typography>
                      </Box>

                      <Box
                        mt={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => {
                            navigate(`/admin/products`);
                          }}
                        >
                          Quay lại danh sách
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            navigate(`/admin/products/${product.id}/edit`);
                          }}
                        >
                          Sửa sản phẩm
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
