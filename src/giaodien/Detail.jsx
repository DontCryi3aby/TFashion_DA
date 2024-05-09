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
        <div>
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
                        Đừng mãi chỉ chạy theo xu hướng, hiểu rõ cơ thể mình mới
                        là điều quan trọng nhất để mặc đẹp mỗi ngày. Hy vọng
                        những chia sẻ của Citi Mode sẽ phần nàng tự tin hơn
                        trong khoảng lựa chọn trang phục để luôn tỏa sáng nhất
                        nàng nhé.
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
                        Nếu những thiết kế đầm suông mang đến sự thoải mái, trẻ
                        trung hay những kiểu dáng bodycon ấn tượng cho vẻ ngoài
                        cuốn hút thì những thiết kế đầm xòe lại không làm cho
                        các Quý cô thất vọng với sự nhẹ nhàng và vô cùng nữ
                        tính.
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
                        Chân váy bút chì là 1 trong những item kinh điển của phụ
                        nữ công sở. Item này vừa đơn giản, tôn dáng lại mang cảm
                        giác thanh lịch, chỉn chu cho người mặc. Phụ nữ Hàn cũng
                        thường xuyên chọn diện chân váy bút chì khi đến sở làm.
                        Thậm chí, họ còn biến tấu, mix&match chân váy bút chì
                        với nhiều item khác biệt để có được những bộ cánh mới mẻ
                        mỗi ngày.
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
                        bỏng. Trong thời trang, không ít những món đồ màu đỏ đã
                        trở thành biểu tượng thương hiệu riêng cũng như đại diện
                        thương hiệu chung. Trang phục màu đỏ có sức mê hoặc khó
                        cưỡng, tạo hiệu ứng thị giác mạnh mẽ, là cách các nàng
                        thể hiện bản lĩnh tự tin và khả năng làm chủ tình huống.
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
                        Trong trường hợp quá lười chọn đồ hoặc bí ý tưởng, nàng
                        cứ diện một set đồ an toàn mà chuẩn nhất cho chốn công
                        sở, chính là nguyên set đồ vest. Áo vest đi cùng chân
                        váy luôn là outfit đạt điểm 10 về độ lịch sự, mang đậm
                        hơi thở quý cô công sở và gần như không có điểm trừ.
                        Outfit này chỉ có đôi chút bất tiện nếu diện trong thời
                        tiết nóng bức. Bởi vì thế nàng hãy ưu tiên chọn set đồ
                        này cho những ngày khí hậu mát mẻ, đặc biệt trong những
                        ngày có sự kiện quan trọng như họp hành, gặp mặt khách
                        hàng để đảm bảo nét thanh lịch, kín đáo cho chính mình
                        nàng nha!
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
                        Thời trang không chỉ là lĩnh vực liên quan đến phạm trù
                        thẩm mỹ mà ở trong đó còn ẩn chứa những bí mật hết sức
                        thú vị. Có thể nàng chưa biết, mỗi màu sắc trong thời
                        trang đều nói lên một tính cách ẩn sâu trong con người
                        nàng. Và dưới đây là ý nghĩa màu sắc thời trang và cách
                        phối màu quần áo phù hợp cho mỗi ngày đi làm nàng nha!
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
          </div>
        </div>
      </Container>
      <Footer />
    </Box>
  );
}
