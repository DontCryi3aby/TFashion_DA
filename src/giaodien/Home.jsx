import React, { useState, useEffect } from "react";
import "../App.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { BsFillAlarmFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import axios from "axios";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Box, Button, Container, Slide, Typography } from "@mui/material";
import Slider from "../components/Slider";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import theme from "../utils/theme";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

export default function Home() {
  const [position, setPosition] = useState(0);
  const [vaydamcs, setVaydamcs] = useState([]);
  const [sominu, setSominu] = useState([]);
  const [chanvay, setChanvay] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };

  const [slsptgh, setslsptgh] = useState(0);
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/index`)
      .then((response) => {
        console.log(response.data); // Kiểm tra có trả về dữ liệu hay không

        setVaydamcs(response.data.vaydamcs);
        setSominu(response.data.sominu);
        setChanvay(response.data.chanvay);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  return (
    <div>
      <Header />

      <Slider />
      <Box>
        <Box py={2}>
          <Container maxWidth="xl">
            <Typography variant="h5" fontWeight={700}>
              VÁY ĐẦM CÔNG SỞ
            </Typography>

            <Box sx={{}}>
              {vaydamcs.map((vdcs) => {
                return (
                  <Link to={`/Detail/${vdcs.title}/${vdcs.id}`} key={vdcs.id}>
                    <Box className="vay1" sx={{ mt: 1 }}>
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_BASEURL}/upload/${vdcs.hinhanh}`}
                        alt=""
                      />

                      <Typography
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vdcs.title}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>{vdcs.gia}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Container>
        </Box>

        <Box
          py={2}
          sx={{
            background: theme.palette.primary.main,
            color: "#fff",
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h5" fontWeight={700}>
              SƠ MI NỮ
            </Typography>
            <div className="vay">
              {sominu.map((sominu) => {
                return (
                  <Link
                    to={`/Detail/${sominu.title}/${sominu.id}`}
                    key={sominu.id}
                  >
                    <Box className="vay1" sx={{ color: "#fff", mt: 1 }}>
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_BASEURL}/upload/${sominu.hinhanh}`}
                        alt=""
                      />

                      <Typography
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sominu.title}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>{sominu.gia}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Box>

        <Box sx={{ py: 2 }}>
          <Container maxWidth="xl">
            <Typography variant="h5" fontWeight={700}>
              CHÂN VÁY
            </Typography>
            <div className="vay">
              {chanvay.map((chanvay) => {
                return (
                  <Link
                    to={`/Detail/${chanvay.title}/${chanvay.id}`}
                    key={chanvay.id}
                  >
                    <Box className="vay1" sx={{ mt: 1 }}>
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_BASEURL}/upload/${chanvay.hinhanh}`}
                        alt=""
                      />
                      <Typography
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chanvay.title}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>{chanvay.gia}</Typography>
                    </Box>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Box>

        <Box
          py={2}
          sx={{
            background: theme.palette.primary.main,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ color: "#fff" }}>
              <Typography variant="h5" fontWeight={700} mb={2}>
                KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI
              </Typography>
              <Splide
                aria-label="Reviews"
                options={{
                  type: "loop",
                  arrows: false,
                  autoScroll: {
                    speed: 2,
                  },
                  perPage: 3,
                  pagination: false,
                  autoplay: true,
                  interval: 1000,
                }}
              >
                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://www.paratime.vn/wp-content/uploads/2019/09/timestudio.vn-headshot-eye-glasses-02.jpg"
                        alt=""
                      />
                      <p>Sản phẩm đáng tiền, đã mua lần thứ 3!</p>
                      <strong>Nguyễn Minh Anh</strong>
                    </div>
                  </Box>
                </SplideSlide>
                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://cdn.pancake.vn/1/s240x240/fwebp/3e/fe/96/b3/d7501da0d2bf5258b467f9257921c4d31d78f11b1c5e18383f504222.jpg"
                        alt=""
                      />
                      <p>
                        Tiền nào của nấy, rất ngại mua đồ chợ, mua sản phẩm của
                        Citi Mode rồi thấy rất ưng và yên tâm!
                      </p>
                      <strong>Kim Nguyên</strong>
                    </div>
                  </Box>
                </SplideSlide>
                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://cdn.pancake.vn/1/s240x240/fwebp/99/77/4e/23/335968d36937efc117420e80a1ea9b288be0e26df7641ee03feebed1.jpg"
                        alt=""
                      />
                      <p>
                        Citi Mode giao hàng rất nhanh mà đảm bảo. Hãng uy tín,
                        mình mua nhiều lần rồi nên rất yên tâm chuyển khoản
                        trước!
                      </p>
                      <strong>Dương Thúy</strong>
                    </div>
                  </Box>
                </SplideSlide>

                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://cdn.pancake.vn/1/s240x240/fwebp/6a/d9/d8/f0/a4f3ae039380c5c3c9b13f78306aed9ae58b4bd8e4fa08768509d708.jpg"
                        alt=""
                      />
                      <p>
                        Mặc đầm của Citi Mode rất hợp, có bộ sưu tập mới ra là
                        lại sốt xình sịch!
                      </p>
                      <strong>Nguyễn Xuân Mai</strong>
                    </div>
                  </Box>
                </SplideSlide>
                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien-002.jpg"
                        alt=""
                      />
                      <p>sản phẩm đẹp và đăng mua nha mn</p>
                      <strong>Tạ Thị Hiệp</strong>
                    </div>
                  </Box>
                </SplideSlide>
                <SplideSlide>
                  <Box sx={{ textAlign: "center" }}>
                    <div class="hand">
                      <img
                        class="img-fluid"
                        src="https://content.pancake.vn/1/s800x800/fwebp/67/e4/54/ce/8b90d9516467c674811b24968f3da97d0b7f84f3b033e247e8401a40.png"
                        alt=""
                      />
                      <p>
                        Mình đã mua và rất ưng với chất liệu ,kiểu dáng sản phẩm
                      </p>
                      <strong>Nguyễn Thị Mai</strong>
                    </div>
                  </Box>
                </SplideSlide>
              </Splide>
            </Box>
          </Container>
        </Box>

        <Box py={2}>
          <Container maxWidth="xl">
            <div className="tgpd1">
              <Typography variant="h5" fontWeight={700}>
                THẾ GIỚI CỦA PHÁI ĐẸP
              </Typography>
              <p className="eqeqr">
                Tổng hợp những kiến thức về thời trang, làm đẹp và những sự kiện
                thời trang khác
              </p>
            </div>
            <Splide
              aria-label="Blogs"
              options={{
                type: "loop",
                arrows: false,
                perPage: 3,
                gap: 20,
              }}
            >
              <SplideSlide>
                <Box>
                  <div>
                    <div>
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
                          <Button variant="contained" fullWidth>
                            Đọc tiếp <AiOutlineArrowRight />
                          </Button>
                        </Link>
                      </h6>
                    </div>
                  </div>
                </Box>
              </SplideSlide>
              <SplideSlide>
                <Box>
                  <div>
                    <div>
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
                          <Button variant="contained" fullWidth>
                            Đọc tiếp <AiOutlineArrowRight />
                          </Button>
                        </Link>
                      </h6>
                    </div>
                  </div>
                </Box>
              </SplideSlide>

              <SplideSlide>
                <Box>
                  <div>
                    <div>
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
                          <Button variant="contained" fullWidth>
                            Đọc tiếp <AiOutlineArrowRight />
                          </Button>
                        </Link>
                      </h6>
                    </div>
                  </div>
                </Box>
              </SplideSlide>
            </Splide>
          </Container>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
