import { faL } from "@fortawesome/free-solid-svg-icons";
import Logout from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import avt from "../assets/images/ttt.jpg";

export function AdminHeader() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        height={64}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          px: 2,
        }}
      >
        <Logo />
        <Tooltip title="Search">
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Tooltip title="Contacts">
            <IconButton aria-label="contact">
              <PeopleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton aria-label="notification">
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <Box
                  width={50}
                  height={50}
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img src={avt} alt="avatar" style={{ objectFit: "cover" }} />
                </Box>
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Box>
                <Typography fontWeight={600}>Nguyen Ngoc Thach</Typography>
                <Typography variant="body2" color="#667085">
                  ngocthach@globosoftware.net
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <Link to="/">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PermIdentityIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
            </Link>
            <Link to="/admin/settings">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </Link>
            <Link to="/account/login">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
