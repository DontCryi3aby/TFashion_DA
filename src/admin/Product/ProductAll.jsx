import axios from "axios";
import { default as React, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { AdminHeader } from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductAll() {
  const [productList, setproductList] = useState([]);
  const [danhmuc, setdanhmuc] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/product`)
      .then((response) => {
        console.log(response.data);
        // Kiểm tra có trả về dữ liệu hay không
        // console.log("list:", response.data);
        setproductList(response.data);
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

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Sản phẩm</StyledTableCell>
                  <StyledTableCell align="center">Giá</StyledTableCell>
                  <StyledTableCell align="center">Danh mục</StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <Typography align="center">{product.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box flex={1} height={100}>
                          <img
                            src={`${process.env.REACT_APP_BASEURL}/upload/${product?.hinhanh}`}
                            alt="Product Img"
                            style={{ objectFit: "contain" }}
                          />
                        </Box>
                        <Box flex={1}>
                          <Typography
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                            onClick={() =>
                              navigate(`/admin/products/${product.id}`)
                            }
                          >
                            {product.title}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <b>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.gia)}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">{product.category}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box>
                        <Tooltip title="Edit item parameters">
                          <IconButton
                            sx={{
                              "&:hover": {
                                color: "#4caf50",
                              },
                            }}
                            onClick={() =>
                              navigate(`/admin/products/${product.id}/edit`)
                            }
                          >
                            <ModeEditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove item">
                          <IconButton
                            sx={{
                              "&:hover": {
                                color: "#ff5722",
                              },
                            }}
                            onClick={() => {
                              xoasp(product.id);
                            }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
