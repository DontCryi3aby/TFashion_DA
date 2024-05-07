import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import CartTable from "./CartTable";
import useMoneyFormat from "../../hooks/useMoneyFormat";

export function Cart() {
  const [slsptgh, setslsptgh] = useState(0);
  const [cart, setcart] = useState([]);
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
  const [tongcart, settongcart] = useState(0);
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/homecart`)
      .then((response) => {
        setcart(response.data);
        console.log(cart);
        const total = response.data.reduce(
          (acc, product) => acc + product.tong,
          0
        );
        settongcart(total);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  return (
    <Box>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h2" textAlign="center">
          Giỏ hàng của bạn
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Box width="60%">
            <CartTable productList={cart} />
          </Box>
          <Box
            sx={{
              flex: 1,
              py: 6,
              px: 5,
              background: "#f5f5f5",
              border: "1px solid #ebebeb",
            }}
          >
            <Typography variant="h6">SUMARY</Typography>
            <Divider sx={{ mt: 2 }} />

            <Stack mt={1}>
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid rgba(0,0,0,0.2)",
                  px: 2,
                  py: 1,
                }}
              >
                <Box flex={1}>Tổng cộng</Box>
                <Box flex={1}>{useMoneyFormat(tongcart)}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid rgba(0,0,0,0.2)",
                  px: 2,
                  py: 1,
                }}
              >
                <Box flex={1}>Giảm giá</Box>
                <Box flex={1}>{useMoneyFormat(0)}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid rgba(0,0,0,0.2)",
                  px: 2,
                  py: 1,
                }}
              >
                <Box flex={1}>
                  <b>Tổng tiền đơn hàng</b>
                </Box>
                <Box flex={1}>
                  <b>{useMoneyFormat(tongcart)}</b>
                </Box>
              </Box>
            </Stack>

            <Accordion sx={{ background: "transparent", mt: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography fontWeight="bold" variant="body1">
                  Áp dụng mã giảm giá
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Link to="/thanhtoan">
              <Button
                size="large"
                variant="contained"
                sx={{
                  background: "#000",
                  color: "#fff",
                  mt: 2,
                }}
                fullWidth
              >
                TIẾN HÀNH THANH TOÁN
              </Button>
            </Link>

            <Link href="/" sx={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                component="h6"
                textAlign="center"
                mt={1}
                sx={{
                  "&:hover": {
                    color: "#ff5722",
                  },
                }}
              >
                Thanh toán với nhiều địa chỉ
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
