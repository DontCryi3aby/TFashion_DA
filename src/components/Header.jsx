import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Badge from "@mui/material/Badge";
import { Settings } from "@mui/icons-material";
import Logo from "./Logo";
import AvatarUser from "./AvatarUser";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
  };

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setCartCount(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  const pages = [
    { label: "Giới thiệu", link: "/about" },
    { label: "Sản phẩm", link: "/products" },
    { label: "Liên hệ", link: "/contact" },
    { label: "Feedback", link: "/feedback" },
  ];
  const settings = [
    {
      label: "Thông tin cá nhân",
      link: `/users/${userId}`,
      icon: <PermIdentityOutlinedIcon fontSize="small" />,
    },
    { label: "Cài đặt", link: "#", icon: <Settings fontSize="small" /> },
    {
      label: "Giỏ hàng",
      link: "/cart",
      icon: (
        <Badge badgeContent={cartCount} color="primary">
          <ShoppingCartOutlinedIcon fontSize="small" />
        </Badge>
      ),
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "#fff" }}
              >
                Hot Deal
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/category/sominu" sx={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose}>Sơ mi nữ</MenuItem>
                </Link>
                <Link to="/category/chanvay" sx={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose}>Chân váy</MenuItem>
                </Link>
                <Link
                  to="/category/vaydamcongso"
                  sx={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>Váy đầm công sở</MenuItem>
                </Link>
              </Menu>
            </>

            {pages.map((page) => (
              <Link to={page.link} key={page.label}>
                <Button sx={{ color: "#fff" }}>{page.label}</Button>
              </Link>
            ))}
          </Box>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {user.avatar ? (
                        <AvatarUser
                          img={`${process.env.REACT_APP_BASEURL}/storage/${user.avatar}`}
                        />
                      ) : (
                        <Avatar />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <Link to={setting.link} key={setting.label}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Button startIcon={setting?.icon} size="small">
                            <Typography sx={{ ml: 1 }}>
                              {setting.label}
                            </Typography>
                          </Button>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
                <Box>
                  <Typography align="left">{user.name}</Typography>
                  <Typography variant="body2" align="left">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Link>
                <Link
                  to="/login"
                  variant="contained"
                  sx={{ color: "#fff" }}
                  onClick={handleLogout}
                >
                  <Button variant="contained">Đăng xuất</Button>
                </Link>
              </Link>
            </Box>
          ) : (
            <Box>
              <Link to="/login">
                <Button variant="contained">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button variant="outlined" sx={{ color: "#fff" }}>
                  Đăng ký
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
