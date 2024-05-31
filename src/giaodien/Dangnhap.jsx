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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { useGoogleLogin } from "@react-oauth/google";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Dangnhap() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Login google
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log({ res });

        // handle login
        const loginResponse = await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/login`,
          {
            email: res.data.email,
            name: res.data.name,
            avatar: res.data.picture,
            is_google_login: true,
          }
        );
        if (loginResponse.status === 200) {
          const { token, user } = loginResponse.data;

          const userData = { token, user }; // Tạo đối tượng chứa thông tin người dùng
          const userDataJSON = JSON.stringify(userData); // Chuyển đối tượng thành chuỗi JSON

          localStorage.setItem("userData", userDataJSON); // Lưu chuỗi JSON vào localStorage
          navigate("/");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const loginFacebook = async () => {
    console.log("login facebook");
    try {
      //login facebook
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log("res", res.user);

      // Handle login
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/login`,
        {
          email: res.user.email,
          name: res.user.displayName,
          avatar: res.user.photoURL,
          is_facebook_login: true,
        }
      );
      if (loginResponse.status === 200) {
        const { token, user } = loginResponse.data;

        const userData = { token, user }; // Tạo đối tượng chứa thông tin người dùng
        const userDataJSON = JSON.stringify(userData); // Chuyển đối tượng thành chuỗi JSON

        localStorage.setItem("userData", userDataJSON); // Lưu chuỗi JSON vào localStorage
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isloginForm, setIsLoginForm] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupSubmit = () => {
    console.log({ email, password });
  };
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Lưu thông tin người dùng vào localStorage
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/login`,
        { email, password }
      );
      if (response.status === 200) {
        const { token, user } = response.data;

        const userData = { token, user }; // Tạo đối tượng chứa thông tin người dùng
        const userDataJSON = JSON.stringify(userData); // Chuyển đối tượng thành chuỗi JSON

        localStorage.setItem("userData", userDataJSON); // Lưu chuỗi JSON vào localStorage
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("tài khoản,mật khẩu không chính xác");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user]);

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
            <Typography variant="h4">
              {isloginForm ? "Đăng nhập" : "Đăng ký"}
            </Typography>
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
                onClick={() => loginGoogle()}
              >
                <GoogleIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Đăng nhập với Google
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
                onClick={() => loginFacebook()}
              >
                <FacebookIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Đăng nhập với Facebook
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
                  Đăng nhập với Apple
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <TextField
                type={isShowPassword ? "text" : "password"}
                name="password"
                label="Mật khẩu"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {isloginForm ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={false}
                  startIcon={
                    false ? (
                      <CircularProgress color="inherit" size="1em" />
                    ) : null
                  }
                  fullWidth
                  size="large"
                  onClick={handleLoginSubmit}
                >
                  Đăng nhập
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={false}
                  startIcon={
                    false ? (
                      <CircularProgress color="inherit" size="1em" />
                    ) : null
                  }
                  fullWidth
                  size="large"
                  onClick={handleSignupSubmit}
                >
                  Đăng nhập với Email
                </Button>
              )}
            </Stack>
            {isloginForm && (
              <Typography
                variant="body2"
                sx={{ textDecoration: "underline", mt: 1 }}
              >
                Quên mật khẩu?
              </Typography>
            )}

            <Typography variant="body2" sx={{ mt: 1 }}>
              Bằng cách tiếp tục với Google, Apple hoặc Email, bạn đồng ý với
              Điều khoản dịch vụ và Chính sách quyền riêng tư của TFashion.
            </Typography>
            <Divider sx={{ pt: 2 }} />
            {isloginForm ? (
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
                Bạn chưa có tài khoản?
                <Link to="/register">
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setIsLoginForm(false);
                    }}
                  >
                    Đăng ký
                  </Typography>
                </Link>
              </Typography>
            ) : (
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
                Đã có tài khoản?
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setIsLoginForm(true);
                  }}
                >
                  Đăng nhập
                </Typography>
              </Typography>
            )}
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
