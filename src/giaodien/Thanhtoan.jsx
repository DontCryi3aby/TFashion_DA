import React, { useState, useEffect } from "react";
import "../App.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";

import { FaTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import useMoneyFormat from "../hooks/useMoneyFormat";

export default function Thanhtoan() {
  const [formData, setFormData] = useState(new FormData());
  const navigate = useNavigate();
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
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [tinhtp, setTinhtp] = useState("");
  const [quanhuyen, setQuanhuyen] = useState("");
  const [phuongxa, setPhuongxa] = useState("");

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };
  const [hovaten, sethovaten] = useState("");
  const [diachi, setdiachi] = useState("");
  const tinhtrangdon = "Chờ duyệt";

  const [sdt, setsdt] = useState();
  const [size, setsize] = useState("");
  const [thongtinbosung, setthongtinbosung] = useState("");

  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);

  const [sanpham, setsanpham] = useState([]);

  const [tongcart, settongcart] = useState(0);
  const [pttt, setpttt] = useState("");

  const handleDeliveryChange = (event) => {
    setIsCashOnDelivery(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("tongcart", JSON.stringify(tongcart));
  }, [tongcart]);

  // Update the value of tongcart
  const updateTongcart = (newValue) => {
    settongcart(newValue);
  };

  useEffect(() => {
    if (isCashOnDelivery) {
      setpttt("thanh toán tiền mặt");
    } else {
      setpttt("chuyển khoản ngân hàng");
    }
  }, [isCashOnDelivery]);

  const handleSubmit = async (e) => {
    const sanphamString = sanpham
      .map((sp) => `${sp.title}-(size:${sp.size})`)
      .join("\n");

    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("hovaten", hovaten);
      formData.append("diachi", diachi);
      formData.append("tinh", tinhtp);
      formData.append("quanhuyen", quanhuyen);
      formData.append("phuongxa", phuongxa);
      formData.append("sdt", sdt);
      formData.append("thongtinbosung", thongtinbosung);
      formData.append("pttt", pttt);
      formData.append("sanpham", sanphamString);
      formData.append("dkdn_id", userId);
      formData.append("thanhtien", tongcart);
      formData.append("tinhtrangdon", tinhtrangdon);

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/dondathang`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Xóa sản phẩm khỏi giỏ hàng
        await axios.delete(
          `${process.env.REACT_APP_BASEURL}/api/giohang/${userId}/delete-all`
        );

        // Hiển thị thông báo đặt hàng thành công
        alert("Bạn đã đặt hàng thành công");

        navigate("/");

        try {
          const response2 = await axios.post(
            `${process.env.REACT_APP_BASEURL}/api/send-mail/${userId}`
          );
          console.log(response2.data.message);
          // Display success message to the user
        } catch (error) {
          console.log(error.response.data.message);
          // Display error message to the user
        }

        // Cập nhật giao diện người dùng để xóa sản phẩm khỏi giỏ hàng
        // ...
      } else {
        alert("Có lỗi xảy ra khi đặt hàng");
      }
    } catch (err) {
      console.log(err);
      alert("Bạn phải điền đầy đủ thông tin trước khi đặt hàng");
    }
  };

  //sldfglksgksgsrh
  const handlePayment = async (e) => {
    e.preventDefault();
    // Save formData to localStorage
    const sanphamString = sanpham
      .map((sp) => `${sp.title}-(size:${sp.size})`)
      .join("\n");
    const formDataValues = {
      hovaten,
      diachi,
      tinhtp,
      quanhuyen,
      phuongxa,
      sdt,
      thongtinbosung,
      pttt,
      sanpham: sanphamString,
      dkdn_id: userId,
      tinhtrangdon,
      thanhtien: tongcart,
    };

    // Save the form data in localStorage
    localStorage.setItem("formData", JSON.stringify(formDataValues));
  };

  useEffect(() => {
    fetch("https://vapi.vnappmob.com/api/province")
      .then((response) => response.json())
      .then((data) => {
        setCities(data.results);
        console.log({ cities });
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      console.log({ selectedCity }, `district/${selectedCity}`);
      fetch(`https://vapi.vnappmob.com/api/province/district/${selectedCity}`)
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.results);
          setQuanhuyen("");
        });
    } else {
      setDistricts([]);
      setQuanhuyen("");
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data) => {
          setWards(data.results);
          setPhuongxa("");
        });
    } else {
      setWards([]);
      setPhuongxa("");
    }
  }, [selectedDistrict]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/homecart`)
      .then((response) => {
        setsanpham(response.data);

        const total = response.data.reduce(
          (acc, product) => acc + product.tong,
          0
        );
        settongcart(total + 30000);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  return (
    <Box>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, display: "flex", gap: 2, mb: 2 }}>
        <Box width="60%">
          <div className="thanhtoancontainer">
            <div className="thanhtoanleft">
              <hr style={{ height: 2, background: "gray" }} />
              <span>THÔNG TIN THANH TOÁN</span>
              <form id="paymentForm">
                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="hovaten"
                    className="form-control"
                    id="title"
                    placeholder="Nhập họ và tên"
                    required
                    value={hovaten}
                    onChange={(e) => sethovaten(e.target.value)}
                  />
                </div>

                <Box sx={{ display: "flex", gap: 2, my: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-tinh-tp-label">
                      Chọn tỉnh/thành phố
                    </InputLabel>
                    <Select
                      labelId="select-tinh-tp-label"
                      id="select-tinh-tp"
                      value={selectedCity}
                      label="Chọn tỉnh/thành phố"
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        console.log({ selectedValue });
                        const selectedCity = cities.find(
                          (city) => city.province_id === selectedValue
                        );
                        console.log({ selectedCity });

                        const selectedValueString = selectedCity
                          ? selectedCity.province_name
                          : "";
                        console.log({ selectedValueString });
                        setTinhtp(selectedValueString || "");
                        setSelectedCity(selectedValue);
                        setSelectedDistrict("");
                        setQuanhuyen("");
                        setPhuongxa("");
                      }}
                    >
                      {cities.map((city) => (
                        <MenuItem
                          value={city.province_id}
                          key={city.province_id}
                        >
                          {city.province_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="select-quan-huyen-label">
                      Chọn quận/huyện
                    </InputLabel>
                    <Select
                      labelId="select-quan-huyen-label"
                      id="select-quan-huyen"
                      value={selectedDistrict}
                      label="Chọn quận/huyện"
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedDistrict = districts.find(
                          (districtfa) =>
                            districtfa.district_id === selectedValue
                        ); // Find the selected district object
                        const selectedValueString = selectedDistrict
                          ? selectedDistrict.district_name
                          : ""; // Access the district_name property
                        console.log(selectedValueString);
                        setQuanhuyen(selectedValueString);
                        setSelectedDistrict(selectedValue);
                        setPhuongxa("");
                      }}
                    >
                      {districts.map((district) => (
                        <MenuItem
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {district.district_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="select-phuong-xa-label">
                      Chọn phường/xã
                    </InputLabel>
                    <Select
                      labelId="select-phuong-xa-label"
                      id="select-phuong-xa"
                      value={selectedWard}
                      label="Chọn phường/xã"
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedWard = wards.find(
                          (wardfa) => wardfa.ward_id === selectedValue
                        );
                        const selectedValueString = selectedWard
                          ? selectedWard.ward_name
                          : "";
                        console.log(selectedValueString);
                        setSelectedWard(selectedValue);
                        setPhuongxa(selectedValueString);
                      }}
                    >
                      {wards.map((ward) => (
                        <MenuItem key={ward.ward_id} value={ward.ward_id}>
                          {ward.ward_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="diachi"
                    className="form-control"
                    id="gia"
                    placeholder="Nhập địa chỉ"
                    required
                    value={diachi}
                    onChange={(e) => setdiachi(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="sdt"
                    className="form-control"
                    id="gia"
                    placeholder="Nhập số điện thoại của bạn"
                    required
                    value={sdt}
                    onChange={(e) => setsdt(e.target.value)}
                  />
                </div>

                <div className="thongtinbosung">
                  <Typography variant="h5">THÔNG TIN BỔ SUNG</Typography>
                  <br></br>
                  <span style={{ float: "left" }}>
                    Ghi chú đơn hàng (thời gian nhận hàng,nơi nhận)
                  </span>
                  <br></br>
                  <textarea
                    value={thongtinbosung}
                    onChange={(e) => setthongtinbosung(e.target.value)}
                    style={{ float: "left", padding: "10px" }}
                    name=""
                    id=""
                    cols="78"
                    rows="8"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </Box>
        <Box sx={{ flex: 1 }}>
          <div
            className="thanhtoanright"
            style={{ width: 500, marginLeft: 20, border: "2px solid black" }}
          >
            <div className="don-hang">
              <h4 style={{ marginLeft: "-100px" }}>Đơn hàng của bạn</h4>
              <div className="abcxyzthanhtoan">
                <div className="abcdthanhtoan">
                  <p className="sanpham-title">SẢN PHẨM</p>
                  <p className="tong-title">TỔNG</p>
                </div>
                <hr />
                <div
                  className="chitietabcdthanhtoan"
                  style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                  }}
                >
                  {sanpham.map((sp) => (
                    <div
                      key={sp.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: 400 }} className="sanpham-info">
                        {sp.title} - (size: {sp.size}) - x {sp.soluong}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="tong-info">
                          {sp.gia * sp.soluong}.000 ₫
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <hr></hr>
                <div className="chitietabcdthanhtoan">
                  <span className="sanpham-info">Phí vận chuyển</span>
                  <span className="tong-info">30.000 ₫</span>
                </div>
                <hr></hr>
                <div className="chitietabcdthanhtoan">
                  <span className="sanpham-info">Thành tiền</span>

                  <span className="tong-info">{useMoneyFormat(tongcart)}</span>
                </div>
                <hr></hr>
                <div className="giamgia-container">
                  <input
                    type="text"
                    className="giamgia-input"
                    placeholder="Nhập mã giảm giá"
                  />
                  <button className="giamgia-button">Áp dụng</button>
                </div>
              </div>
            </div>

            <FormControl>
              <FormLabel id="payment-metthod">
                Chọn phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="payment-metthod"
                value={isCashOnDelivery}
                onChange={handleDeliveryChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng"
                  onClick={() => setIsCashOnDelivery(true)}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Thanh toán qua VNPAY"
                  onClick={() => setIsCashOnDelivery(false)}
                />
              </RadioGroup>
            </FormControl>

            {isCashOnDelivery ? (
              <Button variant="contained" onClick={handleSubmit}>
                Đặt hàng
              </Button>
            ) : (
              <Button variant="contained" onClick={handlePayment}>
                <Link to="/checkout" sx={{ textDecoration: "none" }}>
                  <Typography sx={{ color: "#fff" }}>
                    Thanh toán với VNPAY
                  </Typography>
                </Link>
              </Button>
            )}
          </div>
        </Box>
      </Container>
      <Box mt={2}>
        <Footer />
      </Box>
    </Box>
  );
}
