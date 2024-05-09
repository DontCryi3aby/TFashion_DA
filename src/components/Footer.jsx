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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack>
              <Box width={120}>
                <img src={Logo} alt="Logo" />
              </Box>
              <Typography variant="body2" sx={{ textAlign: "justify", mt: 4 }}>
                TFashion store is a premium theme with advanced admin module.
                It’s extremely customizable, easy to use and fully responsive
                and retina ready.
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
                <Typography sx={{ mb: 5 }}>MY ACCOUNT</Typography>
                <Typography variant="body2">My Account</Typography>
                <Typography variant="body2">Checkout</Typography>
                <Typography variant="body2">Shopping Cart</Typography>
                <Typography variant="body2">Wishlist</Typography>
                <Typography variant="body2">Custom Link</Typography>
                <Typography variant="body2">Terms & Conditions</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ mb: 5 }}>QUICK LINK</Typography>
                <Typography variant="body2">Store Location</Typography>
                <Typography variant="body2">My Account</Typography>
                <Typography variant="body2">Orders Tracking</Typography>
                <Typography variant="body2">Size Guide</Typography>
                <Typography variant="body2">FAQs</Typography>
                <Typography variant="body2">Shipping Policy</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5 }}>INSTAGRAM</Typography>
                <ImageList
                  cols={3}
                  gap={0}
                  rowHeight={123}
                  sx={{ overflowY: "hidden" }}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <Box>
                        <img
                          srcSet={`${item.img}`}
                          src={`${item.img}`}
                          alt={item.title}
                          loading="lazy"
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
    img: "http://blueskytechco.net/mazia/media/instagram/17889749311627752_507835571.jpg",
    title: "Breakfast",
  },
  {
    img: "http://blueskytechco.net/mazia/media/instagram/17862527753055125_1006386370.jpg",
    title: "Burger",
  },
  {
    img: "http://blueskytechco.net/mazia/media/instagram/17860233158082263_259859570.jpg",
    title: "Camera",
  },
  {
    img: "http://blueskytechco.net/mazia/media/instagram/18160500955019076_741109932.jpg",
    title: "Coffee",
  },
  {
    img: "http://blueskytechco.net/mazia/media/instagram/17854475732183135_1816744513.jpg",
    title: "Hats",
  },
  {
    img: "http://blueskytechco.net/mazia/media/instagram/17887577536639322_783458067.jpg",
    title: "Honey",
  },
];
