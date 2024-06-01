import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  console.log({ params });

  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get("title");
  console.log({ searchTitle });
  const [isLoading, setIsLoading] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  console.log({ products });

  useEffect(() => {
    const url = searchTitle
      ? `${process.env.REACT_APP_BASEURL}/api/product?title=${searchTitle}`
      : `${process.env.REACT_APP_BASEURL}/api/product`;

    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log("res:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
    setIsLoading(false);
  }, [searchTitle]);

  const handleFilterPrice = async () => {
    let url;

    if (priceFrom || priceTo) {
      if (searchTitle) {
        url = `${process.env.REACT_APP_BASEURL}/api/product?title=${searchTitle}`;
        if (priceFrom) {
          url += `&priceFrom=${priceFrom}`;
        }
        if (priceTo) {
          url += `&priceTo=${priceTo}`;
        }
      } else {
        url = `${process.env.REACT_APP_BASEURL}/api/product?`;
        if (priceFrom && priceTo) {
          url += `priceFrom=${priceFrom}&priceTo=${priceTo}`;
        } else {
          if (priceFrom) {
            url += `priceFrom=${priceFrom}`;
          }
          if (priceTo) {
            url += `priceTo=${priceTo}`;
          }
        }
      }

      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          console.log("res:", response.data);
          setProducts(response.data);
          console.log("length", response.data.length);
        })
        .catch((error) => {
          console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
        });
      setIsLoading(false);
    }
  };

  return (
    <Stack minHeight="100vh">
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, flex: 1 }}>
        {isLoading && <Typography variant="h5">Loading...</Typography>}
        {!isLoading && products.length ? (
          <>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 1,
                  px: 6,
                }}
              >
                <Typography>Lọc sản phẩm</Typography>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Giá từ
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">Vnđ</InputAdornment>
                    }
                    label="Giá từ"
                    size="small"
                    type="number"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Đến
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">Vnđ</InputAdornment>
                    }
                    label="Đến"
                    size="small"
                    type="number"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </FormControl>
                <Button variant="contained" onClick={handleFilterPrice}>
                  Tim kiếm
                </Button>
              </Box>
            </Box>
            {searchTitle ? (
              <Typography variant="h4">Kết quả cho "{searchTitle}"</Typography>
            ) : (
              <Typography variant="h4">Tất cả sản phẩm</Typography>
            )}
            <div className="vay">
              {products.map((product) => {
                return (
                  <Link
                    to={`/Detail/${product.title}/${product.id}`}
                    key={product.id}
                    className="product-detail-item"
                  >
                    <Box className="vay1" sx={{ color: "#fff", mt: 1 }}>
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                        alt=""
                      />

                      <Typography
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        sx={{ mt: 1, color: "#000", fontWeight: 600 }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.gia)}
                      </Typography>
                    </Box>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <Typography variant="h5">Không tìm thấy sản phẩm</Typography>
        )}
      </Container>
    </Stack>
  );
}

export default Products;
