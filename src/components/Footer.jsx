import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import Logo from "../assets/images/Logo.jpg";
import footerImg1 from "../assets/images/footer1.jpg";
import footerImg2 from "../assets/images/footer2.jpg";
import footerImg3 from "../assets/images/footer3.png";
import footerImg4 from "../assets/images/footer4.png";
import footerImg5 from "../assets/images/footer5.jpg";
import footerImg6 from "../assets/images/footer6.jpg";

export function Footer(props) {
  return (
    <Box
      sx={{
        color: "#fff",
        background: "#292929",
        pt: "138px",
        mt: 2,
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Stack>
              <Box width={120}>
                <img src={Logo} alt="Logo" />
              </Box>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 4 }}>
                Thời trang công sở TFashion được thành lập từ năm 2015 với bước
                đi đầu tiên từ một cửa hàng nhỏ mặt ngõ nhưng được gây dựng, vận
                hành bởi những con người tâm huyết và có tầm nhìn rõ ràng.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 4 }}>
                TFashion định vị thương hiệu trong lĩnh vực Thời trang công sở
                nữ, và sau gần 7 năm hoạt động không biết mệt mỏi, đã có vị thế
                vững chắc của riêng mình trong làng thời trang công sở Việt Nam.
              </Typography>

              <Box height={25} sx={{ mt: 4 }}>
                <img
                  src="http://blueskytechco.net/mazia/media/wysiwyg/payment.png"
                  alt="payments"
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={3}>
                <Typography align="left" sx={{ mb: 5 }}>
                  THÔNG TIN LIÊN HỆ
                </Typography>
                <Typography align="left" variant="body2">
                  Số 41, Ngõ 134,Nguyên Xá
                </Typography>
                <Typography align="left" variant="body2">
                  i3oyhp@gmail.com
                </Typography>
                <Typography align="left" variant="body2">
                  (07) 057.681.03
                </Typography>
                <Typography align="left" variant="body2">
                  (09) 696.969.69
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="left" sx={{ mb: 5 }}>
                  CHÍNH SÁCH
                </Typography>
                <Typography align="left" variant="body2">
                  Chính sách bán hàng
                </Typography>
                <Typography align="left" variant="body2">
                  Chính sách bảo mật
                </Typography>
                <Typography align="left" variant="body2">
                  Đổi trả hoàn tiền
                </Typography>
                <Typography align="left" variant="body2">
                  Hướng dẫn mua hàng
                </Typography>
                <Typography align="left" variant="body2">
                  Tuyển dụng
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5 }}>INSTAGRAM</Typography>
                <ImageList
                  cols={3}
                  gap={0}
                  rowHeight={120}
                  sx={{ overflowY: "hidden" }}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <Box sx={{ maxHeight: 120 }}>
                        <img
                          srcSet={`${item.img}`}
                          src={`${item.img}`}
                          alt={item.title}
                          loading="lazy"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: 120,
                          }}
                        />
                      </Box>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const itemData = [
  {
    img: footerImg1,
    title: "Footer 1",
  },
  {
    img: footerImg2,
    title: "Footer 2",
  },
  {
    img: footerImg3,
    title: "Footer 3",
  },
  {
    img: footerImg4,
    title: "Footer 4",
  },
  {
    img: footerImg5,
    title: "Footer 5",
  },
  {
    img: footerImg6,
    title: "Footer 6",
  },
];
