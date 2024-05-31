import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import dayjs from "dayjs";

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

export default function Dondathang() {
  const [dh, setDh] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log({ dh });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/dondathang`
      );
      setDh(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/admindeletedondathang/${id}`
      );
      fetchData();
      alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTinhTrangDonChange = async (id, selectedOption) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/update-tinhtrangdon/${id}`,
        {
          tinhtrangdon: selectedOption,
        }
      );
      // Optionally, perform any additional actions or updates after successful database update
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = async (e, id) => {
    const selectedOption = e.target.value;
    await handleTinhTrangDonChange(id, selectedOption);
    fetchData();
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
                  <StyledTableCell align="center">Người đặt</StyledTableCell>
                  <StyledTableCell align="center">Sản phẩm đặt</StyledTableCell>
                  <StyledTableCell align="center">
                    Số điện thoại
                  </StyledTableCell>
                  <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                  <StyledTableCell align="center">
                    Thời gian đặt hàng
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Phương thức thanh toán
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Tình trạng đơn hàng
                  </StyledTableCell>
                  <StyledTableCell align="center">Chỉnh sửa</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dh.map((d, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <Typography align="center">{d.id}</Typography>
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
                        <Box flex={1}>
                          <Typography
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                            onClick={() => {}}
                          >
                            {d.hovaten}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {d.sanpham}
                    </StyledTableCell>
                    <StyledTableCell align="center">0{d.sdt}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">
                        {`${d.diachi}, ${d.phuongxa}, ${d.quanhuyen}, ${d.tinh}`}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">
                        {dayjs(d.created_at).format("h:mm A DD/MM/YYYY")}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">{d.pttt}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">{d.tinhtrangdon}</Typography>
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
                            onClick={() => {}}
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
                            onClick={() => handleDelete(d.id)}
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
