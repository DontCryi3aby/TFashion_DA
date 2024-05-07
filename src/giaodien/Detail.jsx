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
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Header from "../components/Header";
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

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };

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
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/detail/${id}`
      );
      setdetail(response.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (detail?.product) {
      setdetailgia(detail.product.gia);
    }
  }, [detail]);

  useEffect(() => {
    const tongValue = slsp * calculateParent(detailgia) * 1000;
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
    <Box>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
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
                  }).format(detail.product.gia * 1000)}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textDecoration: "line-through" }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(detail.product.gia * 1000 + 30000)}
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
              <Typography sx={{ mt: 2 }} variant="body2">
                Typi non habent claritatem insitam, est usus legentis in iis qui
                facit eorum claritatem. Investigationes demonstraverunt lectores
                legere me lius quod ii legunt saepius. Claritas est etiam
                processus A Capitalize on low hanging fruit to identify a
                ballpark value added activity to beta test. Override the digital
                divide with additional clickthroughs from DevOps.
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                – Light green crewneck sweatshirt.
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                – Hand pockets.
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                – Relaxed fit.
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                SKU Detail H V-Neck Sweater
              </Typography>
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
                  <TabPanel value="2">Nội dung thêm đang cập nhật...</TabPanel>
                  <TabPanel value="3">Chưa có đánh giá...</TabPanel>
                </TabContext>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <div>
          <div className="container">
            <div className="motasp">
              <div className="tieude">
                <p
                  style={{
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontWeight: 500,
                    float: "left",
                  }}
                >
                  MÔ TẢ / <span> ĐÁNH GIÁ</span>
                </p>
                <br></br>
                <br></br>
                <div className="chitietsp">
                  <div className="chitietsp1">
                    <h2>Chất liệu</h2>
                    <br />
                    <br />
                    <p>
                      <TiMinus />
                      {detail.chatlieu}
                    </p>
                  </div>

                  <div
                    id="element-to-toggle"
                    className={isVisible ? "" : "hidden"}
                  >
                    <div className="chitietsp2">
                      <h2>Thế mạnh sản phẩm</h2>
                      <br />
                      <p>
                        <TiMinus />
                        {detail.themanhsp}
                      </p>
                      <br />
                      <br />
                    </div>

                    <div className="chitietsp3">
                      <h2>Thông số sản phẩm</h2>
                      <br />
                      <p>(Vai)*(Ngực)*(Eo) cm</p>
                      <p>
                        <TiMinus />
                        Size S: 37*85*66
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Size M: 38*88*71
                      </p>
                      <br />
                      <br />
                      <p>
                        <TiMinus />
                        Size L: 39*92*76
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Size XL: 40*96*80
                      </p>
                      <br />
                      <br />
                    </div>
                    <div className="chitietsp4">
                      <h2>Thông số người mẫu</h2>
                      <br />

                      <p>
                        <TiMinus />
                        Chiều cao 1m65
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Cân nặng: 48kg
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Vòng 1: 85 cm
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Vòng 2: 61 cm
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Vòng 3: 89 cm
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Mặc size S
                      </p>
                      <br />
                      <br />
                    </div>

                    <div className="chitietsp5">
                      <h2>Hướng dẫn giặt là</h2>
                      <br />

                      <p>
                        <TiMinus />
                        Giặt tay hoặc giặt máy ở chế độ giặt nhẹ
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Giặt nước lạnh
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Giặt với sản phẩm cùng màu
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Lộn trái khi giặt
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Không tẩy
                      </p>
                      <br />
                      <p>
                        <TiMinus />
                        Phơi trong bóng mát
                      </p>
                      <br />
                    </div>
                  </div>
                  <button
                    style={{
                      background: "#cc9c69",
                      float: "left",
                      border: "1px solid #cc9c69",
                      borderRadius: 15,
                      height: 40,
                    }}
                    onClick={() => {
                      setIsVisible(!isVisible);
                      toggleVisibility();
                    }}
                  >
                    {isVisible ? "Ẩn" : "Hiện"} chi tiết sản phẩm
                  </button>
                </div>
              </div>
            </div>

            <div className="splq">
              <div className="thegioiphaidep">
                <div className="tgpd1">
                  <span className="tgpd">THẾ GIỚI CỦA PHÁI ĐẸP</span>
                  <p className="eqeqr">
                    Tổng hợp những kiến thức về thời trang, làm đẹp và những sự
                    kiện thời trang khác
                  </p>
                </div>
                <div className="tgpd2">
                  <div className="slidechung">
                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/f4/26/6d/06/def0ccf4c96da793fe00085976c3dc5d3cbe366d7415d744d1266284.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/hrctddhmn">
                            {" "}
                            HIỂU RÕ CƠ THỂ MÌNH ĐỂ ĐẸP HƠN MỖI NGÀY{" "}
                          </Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Đừng mãi chỉ chạy theo xu hướng, hiểu rõ cơ thể mình
                          mới là điều quan trọng nhất để mặc đẹp mỗi ngày. Hy
                          vọng những chia sẻ của Citi Mode sẽ phần nàng tự tin
                          hơn trong khoảng lựa chọn trang phục để luôn tỏa sáng
                          nhất nàng nhé.
                        </p>
                        <h6>
                          <Link to="/hrctddhmn">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/5e/ab/18/df/6416d367b0945924e5f8bcd24547c2e73f41e87a225bf90955fed4da.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/nbvanvddx">
                            {" "}
                            NỔI BẬT VÀ ẤN TƯỢNG VỚI ĐẦM DÁNG XÒE !!!
                          </Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Nếu những thiết kế đầm suông mang đến sự thoải mái,
                          trẻ trung hay những kiểu dáng bodycon ấn tượng cho vẻ
                          ngoài cuốn hút thì những thiết kế đầm xòe lại không
                          làm cho các Quý cô thất vọng với sự nhẹ nhàng và vô
                          cùng nữ tính.
                        </p>
                        <h6>
                          <Link to="/nbvanvddx">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>

                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/1a/4b/67/5e/514d87737939c2677f376420463b67867af83ce140ae07511969bcd5.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/cdcvbc">
                            {" "}
                            10 cách diện chân váy bút chì thanh lịch
                          </Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Chân váy bút chì là 1 trong những item kinh điển của
                          phụ nữ công sở. Item này vừa đơn giản, tôn dáng lại
                          mang cảm giác thanh lịch, chỉn chu cho người mặc. Phụ
                          nữ Hàn cũng thường xuyên chọn diện chân váy bút chì
                          khi đến sở làm. Thậm chí, họ còn biến tấu, mix&match
                          chân váy bút chì với nhiều item khác biệt để có được
                          những bộ cánh mới mẻ mỗi ngày.
                        </p>
                        <h6>
                          <Link to="/cdcvbc">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>

                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/b0/37/62/c3/86831d6accfa0b3b96e0715a687b007403ae0f550d617e91b26cb288.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/sdttt"> SẮC ĐỎ TRONG THỜI TRANG</Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Kể từ thời cổ đại, màu đỏ đại diện cho cuộc sống sung
                          túc, cho nguồn sức mạnh dồi dào và niềm đam mê cháy
                          bỏng. Trong thời trang, không ít những món đồ màu đỏ
                          đã trở thành biểu tượng thương hiệu riêng cũng như đại
                          diện thương hiệu chung. Trang phục màu đỏ có sức mê
                          hoặc khó cưỡng, tạo hiệu ứng thị giác mạnh mẽ, là cách
                          các nàng thể hiện bản lĩnh tự tin và khả năng làm chủ
                          tình huống.
                        </p>
                        <h6>
                          <Link to="/sdttt">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/51/02/84/b0/b674ce1842630a4d6da83c96fa6397a4dcb6b39f50658312d66aa088.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/cctpsm">
                            {" "}
                            Các công thức phối sơ mi + chân váy cả tuần cho nàng
                            công sở
                          </Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Trong trường hợp quá lười chọn đồ hoặc bí ý tưởng,
                          nàng cứ diện một set đồ an toàn mà chuẩn nhất cho chốn
                          công sở, chính là nguyên set đồ vest. Áo vest đi cùng
                          chân váy luôn là outfit đạt điểm 10 về độ lịch sự,
                          mang đậm hơi thở quý cô công sở và gần như không có
                          điểm trừ. Outfit này chỉ có đôi chút bất tiện nếu diện
                          trong thời tiết nóng bức. Bởi vì thế nàng hãy ưu tiên
                          chọn set đồ này cho những ngày khí hậu mát mẻ, đặc
                          biệt trong những ngày có sự kiện quan trọng như họp
                          hành, gặp mặt khách hàng để đảm bảo nét thanh lịch,
                          kín đáo cho chính mình nàng nha!
                        </p>
                        <h6>
                          <Link to="/cctpsm">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/15/63/2d/28/3a1a46e4647e452146fa35e04913214f6f53efc6e382b9958d9f96db.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/dlmj"> ĐI LÀM MẶC GÌ?</Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Thời trang không chỉ là lĩnh vực liên quan đến phạm
                          trù thẩm mỹ mà ở trong đó còn ẩn chứa những bí mật hết
                          sức thú vị. Có thể nàng chưa biết, mỗi màu sắc trong
                          thời trang đều nói lên một tính cách ẩn sâu trong con
                          người nàng. Và dưới đây là ý nghĩa màu sắc thời trang
                          và cách phối màu quần áo phù hợp cho mỗi ngày đi làm
                          nàng nha!
                        </p>
                        <h6>
                          <Link to="/dlmj">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>

                    <div className="slidecc">
                      <div
                        className="slidefake"
                        style={{ transform: `translateX(${-position}px)` }}
                      >
                        <img
                          src="https://statics.pancake.vn/web-media/9c/f3/f1/c4/78ce99cfcdcb73ec53861b00181ab03cc792fe0d34cd255b48067862.png"
                          alt=""
                        />
                        <br></br>
                        <p style={{ background: "brown" }}>23 Tháng 8 2022</p>
                        <h5>
                          <Link to="/vdcscc">
                            VÁY ĐẦM CÔNG SỞ CAO CẤP: CỰC SANG TRỌNG VÀ TINH TẾ
                          </Link>{" "}
                        </h5>
                        <BsFillPersonFill /> Thời trang hot
                        <p className="yasuo">
                          Không xa hoa lộng lẫy, không cần quá nổi bật giữa đám
                          đông, những mẫu đầm hàng hiệu luôn sở hữu vẻ đẹp lung
                          linh đến diệu kỳ, khiến chị em không thể nào rời mắt.{" "}
                        </p>
                        <h6>
                          <Link to="/vdcscc">
                            {" "}
                            Đọc tiếp <AiOutlineArrowRight />
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  borderRadius: "15px",
                  background: "#cc9c69",
                }}
              >
                <div class="container-fluid fh5co_footer_bg pb-3">
                  <div class="container animate-box">
                    <div class="row">
                      <div class="col-12 col-md-4 col-lg-3">
                        <div class="footer_main_title py-3">
                          {" "}
                          Địa chỉ tòa soạn
                        </div>
                        <div class="footer_sub_about pb-3">
                          {" "}
                          Trụ sở chính: Số 138A Giảng Võ - Quận Ba Đình - Thành
                          phố Hà Nội Địa chỉ liên hệ: Tòa nhà Tổng cục Dân số,
                          ngõ 8 đường Tôn Thất Thuyết, quận Nam Từ Liêm, TP Hà
                          Nội Điện thoại: 024.3846.1042 - Fax: 024.3844.3144
                          Đường dây nóng: 0931.965.967 Email:
                          giadinhnet@suckhoedoisong.vn
                        </div>
                        <div class="footer_mediya_icon">
                          <div class="text-center d-inline-block">
                            <a class="fh5co_display_table_footer">
                              <div class="fh5co_verticle_middle">
                                <i class="fa fa-linkedin"></i>
                              </div>
                            </a>
                          </div>
                          <div class="text-center d-inline-block">
                            <a class="fh5co_display_table_footer">
                              <div class="fh5co_verticle_middle">
                                <i class="fa fa-google-plus"></i>
                              </div>
                            </a>
                          </div>
                          <div class="text-center d-inline-block">
                            <a class="fh5co_display_table_footer">
                              <div class="fh5co_verticle_middle">
                                <i class="fa fa-twitter"></i>
                              </div>
                            </a>
                          </div>
                          <div class="text-center d-inline-block">
                            <a class="fh5co_display_table_footer">
                              <div class="fh5co_verticle_middle">
                                <i class="fa fa-facebook"></i>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-3 col-lg-2">
                        <div class="footer_main_title py-3"> Category</div>
                        <ul class="footer_menu">
                          <li>
                            <a href="{{url('/kinhdoanh')}}">
                              <i class="fa fa-angle-right"></i> kinh doanh
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/khoahoc')}}">
                              <i class="fa fa-angle-right"></i> khoa học
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/thoitrang')}}">
                              <i class="fa fa-angle-right"></i> Thời trang
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/giaoduc')}}">
                              <i class="fa fa-angle-right"></i> Giáo dục 4.0
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/giaothong')}}">
                              <i class="fa fa-angle-right"></i> Giao thông
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/laodongvieclam')}}">
                              <i class="fa fa-angle-right"></i> Lao động việc
                              làm
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/thegioitunhien')}}">
                              <i class="fa fa-angle-right"></i> Thế giới tự
                              nhiên
                            </a>
                          </li>
                          <li>
                            <a href="{{url('/cacmonthethaokhac')}}">
                              <i class="fa fa-angle-right"></i> Các môn thể thao
                              khác
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                        <div class="footer_main_title py-3">
                          {" "}
                          Liên Hệ Quảng Cáo: ADMICRO
                        </div>
                        <div class="footer_makes_sub_font">
                          Hotline: 0794.46.33.33 - 0961.98.43.88 Email:
                          giadinh@admicro.vn
                        </div>
                        Add: Tầng 20, tòa nhà Center Building, Hapulico Complex,
                        số 1 Nguyễn Huy Tưởng, phường Thanh Xuân Trung, quận
                        Thanh Xuân, Hà Nội
                      </div>
                      <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                        <div class="footer_main_title py-3">
                          {" "}
                          CHUYÊN TRANG GIA ĐÌNH VÀ XÃ HỘI - BÁO ĐIỆN TỬ SỨC KHỎE
                          VÀ ĐỜI SỐNG
                        </div>
                        <div class="footer_makes_sub_font">
                          Cơ quan chủ quản: Bộ Y tế Tổng biên tập: Trần Tuấn
                          Linh
                        </div>
                        Cơ quan chủ quản: Bộ Y tế Tổng biên tập: Trần Tuấn Linh
                        Hoạt động theo Giấy phép số 60/GP-CBC ngày 23/7/2021 của
                        Cục Báo chí - Bộ Thông tin và Truyền thông ® Mọi hình
                        thức sao chép thông tin, hình ảnh phải có sự đồng ý bằng
                        văn bản. Vui lòng dẫn “giadinh.suckhoedoisong.vn” khi
                        phát hành lại thông tin từ website này.
                      </div>
                    </div>
                    <div class="row justify-content-center pt-2 pb-4">
                      <div class="col-12 col-md-8 col-lg-7 ">
                        <div class="input-group">
                          <span
                            class="input-group-addon fh5co_footer_text_box"
                            id="basic-addon1"
                          >
                            <i class="fa fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
