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
import * as React from "react";
import axios from "axios";
import useMoneyFormat from "../../hooks/useMoneyFormat";

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

function CartTable({ productList }) {
  const handleDelete = (id) => {
    console.log(id); // log the id to the console

    axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/deletecart/${id}`)
      .then((response) => {
        window.location.reload();
        alert("đã xóa sản phẩm khỏi giỏ hàng");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sản phẩm</StyledTableCell>
            <StyledTableCell align="center">Size</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Giá</StyledTableCell>
            <StyledTableCell align="center">Tổng</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product, index) => (
            <StyledTableRow key={index}>
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
                      src={`${process.env.REACT_APP_BASEURL}/upload/${product.product?.hinhanh}`}
                      alt="Product Img"
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography>{product.title}</Typography>
                  </Box>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>{product.size}</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                {product.soluong}
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.gia * 1000)}
                </b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.tong)}
                </b>
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
                        handleDelete(product.id);
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
  );
}

export default CartTable;
