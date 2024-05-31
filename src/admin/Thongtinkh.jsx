import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

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
import PlaceholderImg from "../assets/images/placeholder.png";

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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Họ và tên</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Số điện thoại
                  </StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user, index) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      <Typography align="center">{user.id}</Typography>
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
                            src={
                              user.avatar
                                ? `${process.env.REACT_APP_BASEURL}/storage/${user?.avatar}`
                                : PlaceholderImg
                            }
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
                            onClick={() => {}}
                          >
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography align="center">0{user.sdt}</Typography>
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
                            onClick={() => handledelete(user.id)}
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
