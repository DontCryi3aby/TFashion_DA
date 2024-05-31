import { Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "80%",
  p: 4,
};

function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [catName, setCatName] = useState();
  const [productChoose, setProductChoose] = useState([]);
  const [productList, setProductList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCategory = async () => {
    console.log("pros", productChoose);

    if (catName) {
      const formData = new FormData();
      formData.append("namecategory", catName);
      formData.append("product_ids", productChoose);

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/categories`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/categories`)
        .then((response) => {
          console.log(response.data);
          setCategoryList(response.data);
        })
        .catch((error) => {
          console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
        });

      setOpen(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/categories/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });

    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/api/categories`
    );

    setCategoryList(response.data);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/categories`)
      .then((response) => {
        console.log(response.data);
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/product`)
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  const handleChange = (event) => {
    if (event.target.checked) {
      const newProductChoose = Array.from(
        new Set([...productChoose, event.target.name])
      );
      setProductChoose(newProductChoose);
    } else {
      setProductChoose((prev) =>
        prev.filter((product) => product !== event.target.name)
      );
    }
  };

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19} px={2}>
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ float: "right" }}
            >
              Thêm danh mục sản phẩm
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h4">Thêm danh mục</Typography>
                <Box mt={1}>
                  <TextField
                    label="Tên danh mục"
                    variant="outlined"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <FormControl
                    sx={{ mt: 2 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Chọn sản phẩm</FormLabel>
                    <FormGroup sx={{ height: 400 }}>
                      {productList.map((product) => (
                        <Box key={product.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={handleChange}
                                name={product.id}
                              />
                            }
                            label={product.title}
                          />
                        </Box>
                      ))}
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    sx={{ float: "right" }}
                    onClick={handleAddCategory}
                  >
                    Thêm
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
          <Grid container spacing={2} mt={2}>
            {categoryList.length > 0 ? (
              <>
                {categoryList.map((category) => (
                  <>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <Typography variant="h4">
                          {category.namecategory}
                        </Typography>
                        <Box ml={1}>
                          <Button size="small">Sửa</Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </Box>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Sản phẩm
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Giá
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category.products.map((product, index) => (
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
                                        onClick={() => {}}
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
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </>
                ))}
              </>
            ) : (
              <>LOADING...</>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Category;
