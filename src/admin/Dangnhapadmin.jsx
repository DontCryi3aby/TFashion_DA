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
import { default as React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dangnhapadmin() {
  const adminData = localStorage.getItem("adminData");
  const admin = adminData ? JSON.parse(adminData).user : null;
  const adminId = admin ? admin.id : null;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  // Lưu thông tin người dùng vào localStorage

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
      return;
    }
  }, [admin]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log({ email, password });
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/accountlogin`,
        { email, password }
      );
      if (response.status === 200) {
        console.log("admin", response.data);
        const { token, user } = response.data;

        const adminData = { token, user }; // Tạo đối tượng chứa thông tin người dùng
        const adminDataJSON = JSON.stringify(adminData); // Chuyển đối tượng thành chuỗi JSON

        localStorage.setItem("adminData", adminDataJSON); // Lưu chuỗi JSON vào localStorage

        alert("Login successful");
        navigate("/admin/dashboard");
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
        alert("Login successful");
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

  return (
    <>
      {admin ? (
        <></>
      ) : (
        <Box
          maxWidth="xl"
          margin="50px auto"
          sx={{ display: "flex", alignItems: "center", gap: 3 }}
        >
          <Paper sx={{ p: 5, flex: 1, minHeight: 630 }}>
            <Typography variant="h4">You are an Admin?</Typography>
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
                label="Password"
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
              <Button
                type="submit"
                variant="contained"
                disabled={false}
                startIcon={
                  false ? <CircularProgress color="inherit" size="1em" /> : null
                }
                fullWidth
                size="large"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Stack>
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", mt: 1 }}
            >
              Forgot your password?
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              By continuing with Google, Apple, or Email, you agree to
              TFashion’s Terms of Service and Privacy Policy.
            </Typography>
            <Divider sx={{ pt: 2 }} />
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
