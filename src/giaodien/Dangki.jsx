import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { default as React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Dangki() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  async function handleSignupSubmit(event) {
    event.preventDefault();

    console.log({ name, email, password, sdt });
    try {
      const formData = new FormData();
      formData.append("hoten", name);
      formData.append("sodt", sdt);
      formData.append("email", email);
      formData.append("matkhau", password);

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/dkdn`,
        formData
      );
      alert("Đăng kí tài khoản thành công");
      setname("");
      setsdt("");
      setemail("");
      setpassword("");
      navigate("/login");
    } catch (err) {
      alert("Email đã tồn tại, vui lòng đăng kí bằng email khác.");
    }
  }
  return (
    <>
      {user ? (
        <></>
      ) : (
        <Box
          maxWidth="xl"
          margin="50px auto"
          sx={{ display: "flex", alignItems: "center", gap: 3 }}
        >
          <Paper sx={{ p: 5, flex: 1, minHeight: 630 }}>
            <Typography variant="h4">Register Form</Typography>
            <Box my={2}>
              <Box
                className="login__social"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
                  p: 1,
                  mt: 1,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  cursor: "pointer",

                  "&:hover": {
                    background: "#f5f5f5",
                  },
                }}
              >
                <GoogleIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Continue with Google
                </Typography>
              </Box>
              <Box
                className="login__social"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
                  p: 1,
                  mt: 1,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  cursor: "pointer",

                  "&:hover": {
                    background: "#f5f5f5",
                  },
                }}
              >
                <FacebookIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Continue with Facebook
                </Typography>
              </Box>
              <Box
                className="login__social"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
                  p: 1,
                  mt: 1,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  cursor: "pointer",

                  "&:hover": {
                    background: "#f5f5f5",
                  },
                }}
              >
                <AppleIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Continue with Apple
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <TextField
                name="name"
                label="Họ và tên"
                fullWidth
                value={name}
                required
                onChange={(e) => setname(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <TextField
                name="sdt"
                label="Số điện thoại"
                fullWidth
                required
                value={sdt}
                onChange={(e) => setsdt(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </Box>
            <Box mt={2}>
              <TextField
                type={isShowPassword ? "text" : "password"}
                name="password"
                label="Mật khẩu"
                fullWidth
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setIsShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {isShowPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={false}
                startIcon={
                  false ? <CircularProgress color="inherit" size="1em" /> : null
                }
                fullWidth
                size="large"
                onClick={handleSignupSubmit}
              >
                Sign up
              </Button>
            </Stack>

            <Typography variant="body2" sx={{ mt: 1 }}>
              By continuing with Google, Apple, or Email, you agree to
              TFashion’s Terms of Service and Privacy Policy.
            </Typography>
            <Divider sx={{ pt: 2 }} />

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              Already signed up?
              <Link to="/login">
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => {}}
                >
                  Go to login
                </Typography>
              </Link>
            </Typography>
          </Paper>
          <Box flex="1">
            <img
              src="https://todoist.b-cdn.net/assets/images/44245fc51c3e2ab05ee6d92c13e2e08a.png"
              alt="bg-img"
            />
          </Box>
        </Box>
      )}
    </>
  );
}
