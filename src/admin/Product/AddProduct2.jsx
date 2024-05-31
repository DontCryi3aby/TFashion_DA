import {
  Box,
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdminHeader } from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [material, setMaterial] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/categories`)
      .then((response) => {
        console.log("cate: ", response.data);
        setCategories(response.data);
      });
  }, []);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("hinhanh", image);
    formData.append("title", title);
    formData.append("gia", price);
    formData.append("category_id", categoryID);
    formData.append("chatlieu", material);
    formData.append("tinhtrang", "Còn hàng");
    formData.append("themanhsp", desc);

    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/api/add_product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Tạo sản phẩm thành công!");
    navigate("/admin/products");
  };

  const handleImgChange = (e) => {
    const imgFile = e.target.files[0];
    setImage(imgFile);
    setPreviewImage(URL.createObjectURL(imgFile));
  };

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <Paper sx={{ width: 600, margin: "50px auto" }}>
            <Stack p={5} gap={2}>
              <TextField
                label="Tên sản phẩm"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="Giá"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />

              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ width: 200 }}
              >
                Tải ảnh lên
                <input
                  type="file"
                  name="hinhanh"
                  onChange={handleImgChange}
                  accept="image/*"
                  hidden
                />
              </Button>

              {image && (
                <ImageList cols={3} gap={2} sx={{ overflowY: "hidden" }}>
                  <ImageListItem>
                    <Box width={160} height={200} sx={{ margin: "0 auto" }}>
                      <img src={previewImage} alt={`update-img-preview`} />
                    </Box>
                  </ImageListItem>
                </ImageList>
              )}

              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="select-category-label">
                  Chọn danh mục
                </InputLabel>
                <Select
                  labelId="select-category-label"
                  id="select-category"
                  value={categoryID}
                  label="Chọn danh mục"
                  onChange={(e) => {
                    setCategoryID(e.target.value);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.namecategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ textAlign: "left", width: "50%" }}>
                <TextField
                  label="Số lượng"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Box>

              <TextField
                label="Chất liệu"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                multiline
              />

              <TextField
                label="Mô tả chi tiết"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                multiline
                rows={4}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/admin/products")}
                >
                  Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleAddProduct}>
                  Thêm sản phẩm
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AddProduct;
