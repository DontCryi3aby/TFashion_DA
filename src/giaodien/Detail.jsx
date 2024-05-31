import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";

import { TiMinus } from "react-icons/ti";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
export default function Detail() {
  const [detailtitle, setdetailtitle] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [detailgia, setdetailgia] = useState(0);
  const [slsp, setslsp] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  const [message, setMessage] = useState("");

  const [detailtong, setdetailtong] = useState(0);

  const [slsptgh, setslsptgh] = useState(0);

  const [position, setPosition] = useState(0);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const [detail, setdetail] = useState();
  const { id } = useParams();

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  const handleSizeClick = (size) => {
    setSelectedSize(size, () => {
      console.log(selectedSize);
    });
  };

  const buttons = document.querySelectorAll(".size-button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn chặn hành động mặc định của button (tải lại trang)
      buttons.forEach((button) => {
        button.classList.remove("selected"); // Loại bỏ class selected của tất cả các button
      });
      button.classList.add("selected"); // Thêm class selected cho button được nhấn
    });
  });

  const up = (event) => {
    event.preventDefault(); // Ngăn chặn mặc định hành động của button
    setslsp(slsp + 1);
    return false;
  };

  const down = (event) => {
    event.preventDefault(); // Ngăn chặn mặc định hành động của button
    if (slsp > 1) {
      setslsp(slsp - 1);
    }
    return false;
  };

  const toggleVisibility = () => {
    const element = document.getElementById("element-to-toggle");
    element.classList.toggle("hidden");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position) => {
        const newPosition = position + 0.25;
        if (newPosition > windowWidth) {
          setTimeout(() => {
            setPosition(0);
          }, 1000); // wait for 1 seond before resetting the position and starting over
        }
        return newPosition;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setPosition(0);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log({ id });
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/detail/${id}`
      );
      console.log("end fetch", response);
      setdetail(response.data);

      console.log("detail: ", response.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (detail?.product) {
      setdetailgia(detail.product.gia);
    }
  }, [detail]);

  useEffect(() => {
    const tongValue = slsp * calculateParent(detailgia);
    setdetailtong(tongValue);
  }, [slsp, detailgia]);

  const calculateParent = (detailgia) => {
    // your calculation logic here
    return detailgia;
  };

  useEffect(() => {
    if (detail && detail.product) {
      // kiểm tra detail có tồn tại và có thuộc tính product không
      setdetailtitle(detail.product.title);
    }
  }, [detail]);

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", detailtitle);
      formData.append("size", selectedSize);
      formData.append("gia", detailgia);
      formData.append("soluong", slsp);
      formData.append("tong", detailtong);
      formData.append("product_id", id);
      formData.append("dkdn_id", user.id);
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/cart/${userId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
        alert("sản phẩm đã có trong giỏ hàng");
      } else {
        alert("Product added successfully");
        navigate("/cart");
      }
    } catch (err) {
      if (!userId) {
        alert("bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng");
      } else {
        alert("Vui lòng chọn size sản phẩm");
      }
    }
  }

  // Tabs
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <Stack minHeight="100vh">
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, flex: 1 }}>
        <Box role="presentation" onClick={() => {}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Váy đầm công sở
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Đầm xoè hoa nhí xanh cam phối cổ nơ cách điệu
            </Typography>
          </Breadcrumbs>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={5}>
            <Box
              sx={{
                height: 600,
              }}
            >
              <img
                src={`${process.env.REACT_APP_BASEURL}/upload/${detail.product.hinhanh}`}
                alt="Ảnh sản phẩm"
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Stack
              component="form"
              method="POST"
              onSubmit={save}
              textAlign="left"
            >
              <Typography variant="h4">{detail.product.title}</Typography>
              <Typography sx={{ mt: 2 }} variant="body2">
                Tình trạng: {detail.tinhtrang}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Typography variant="h5" sx={{ color: "#eb2323" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(detail.product.gia)}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textDecoration: "line-through" }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(detail.product.gia * 1 + 30000)}
                </Typography>
              </Box>
              <Box mt={1}>
                <div className="size-container">
                  <span style={{ fontSize: 20 }} className="buttonsize">
                    Size:
                  </span>
                  <button
                    onClick={() => handleSizeClick("S")}
                    className={`size-button ${
                      selectedSize === "S" ? "selected" : ""
                    }`}
                    style={{
                      fontSize: 16,
                      border: "1px solid gainsboro",
                      marginLeft: 5,
                      width: 45,
                      height: 40,
                    }}
                  >
                    S
                  </button>
                  <button
                    onClick={() => handleSizeClick("M")}
                    className={`size-button ${
                      selectedSize === "M" ? "selected" : ""
                    }`}
                    style={{
                      fontSize: 16,
                      border: "1px solid gainsboro",
                      marginLeft: 5,
                      width: 45,
                      height: 40,
                    }}
                  >
                    M
                  </button>
                  <button
                    onClick={() => handleSizeClick("L")}
                    className={`size-button ${
                      selectedSize === "L" ? "selected" : ""
                    }`}
                    style={{
                      fontSize: 16,
                      border: "1px solid gainsboro",
                      marginLeft: 5,
                      width: 45,
                      height: 40,
                    }}
                  >
                    L
                  </button>
                  <button
                    onClick={() => handleSizeClick("XL")}
                    className={`size-button ${
                      selectedSize === "XL" ? "selected" : ""
                    }`}
                    style={{
                      fontSize: 16,
                      border: "1px solid gainsboro",
                      marginLeft: 5,
                      width: 45,
                      height: 40,
                    }}
                  >
                    XL
                  </button>
                  <button
                    onClick={() => handleSizeClick("XXL")}
                    className={`size-button ${
                      selectedSize === "XXL" ? "selected" : ""
                    }`}
                    style={{
                      fontSize: 16,
                      border: "1px solid gainsboro",
                      marginLeft: 5,
                      width: 45,
                      height: 40,
                    }}
                  >
                    XXL
                  </button>
                </div>
              </Box>
              <Box mt={2}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Chi tiết" value="1" />
                      <Tab label="Thông tin thêm" value="2" />
                      <Tab label="Đánh giá" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Box>
                      <Typography>
                        <b>Chất liệu</b>: {detail.chatlieu}
                      </Typography>
                      <Typography>
                        <b>Thế mạnh sản phẩm</b>: {detail.themanhsp}
                      </Typography>
                      <Typography>
                        <b>Thông số sản phẩm</b>:
                        <Typography>(Vai)*(Ngực)*(Eo) cm</Typography>
                        <Box>
                          <Typography>Size S: 37*85*66</Typography>
                          <Typography>Size M: 38*88*71</Typography>
                          <Typography>Size L: 39*92*76</Typography>
                          <Typography>Size XL: 40*96*80</Typography>
                          <Typography>Size XXL: 41*100*84</Typography>
                        </Box>
                      </Typography>
                      <Typography>
                        <b>Thông số người mẫu</b>:
                        <Box>
                          <Typography>
                            Chiều cao: 1m65. Cân nặng: 48kg
                          </Typography>
                          <Typography>
                            Vòng 1: 85. Vòng 2: 61. Vòng 3: 89
                          </Typography>
                          <Typography>
                            <KeyboardDoubleArrowRightOutlinedIcon
                              sx={{ mr: 1 }}
                            />
                            Size: <b>S</b>
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Typography align="left">
                      <CheckOutlinedIcon size="small" sx={{ mr: 1 }} />
                      Miễn phí vận chuyển với đơn hàng có giá trị trên 599K
                    </Typography>
                    <Typography align="left">
                      <CheckOutlinedIcon size="small" sx={{ mr: 1 }} />
                      Giao hàng toàn quốc từ 2-4 ngày làm việc
                    </Typography>
                    <Typography align="left">
                      <CheckOutlinedIcon size="small" sx={{ mr: 1 }} />
                      Đổi trả sản phẩm trong 7 ngày, từ ngày nhận được sản phẩm
                    </Typography>
                    <Typography align="left">
                      <PhoneAndroidOutlinedIcon size="small" sx={{ mr: 1 }} />
                      Hotline & Zalo hỗ trợ KH: 0705768103
                    </Typography>
                  </TabPanel>
                  <TabPanel value="3">Chưa có đánh giá...</TabPanel>
                </TabContext>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box mt={2} sx={{ display: "flex" }}>
                <Box
                  sx={{
                    border: "1px solid #000",
                    px: 1,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={down}>
                    <RemoveIcon />
                  </IconButton>

                  <Box
                    sx={{
                      color: "#000",
                      px: 1,
                    }}
                    size="large"
                  >
                    {slsp}
                  </Box>
                  <IconButton onClick={up}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button
                  sx={{
                    border: "1px solid #000",
                    px: 2,
                    background: "#000",
                    color: "#fff",
                    ml: 2,
                    "&:hover": {
                      color: "#000",
                    },
                    flex: 1,
                  }}
                  size="large"
                  startIcon={<AddIcon />}
                  type="submit"
                >
                  Add to cart
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Stack>
  );
}
