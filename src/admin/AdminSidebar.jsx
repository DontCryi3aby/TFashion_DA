import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  const [open, setOpen] = React.useState(true);
  const [openCategoryList, setOpenCategoryList] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryClick = () => {
    setOpenCategoryList(!openCategoryList);
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", pt: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ReceiptLongOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý sản phẩm" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/products">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Xem danh sách sản phẩm" />
            </ListItemButton>
          </Link>
          <Link to="/admin/products/add">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Thêm sản phẩm mới" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <ListItemButton onClick={handleCategoryClick}>
        <ListItemIcon>
          <ReceiptLongOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý danh mục" />
        {openCategoryList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategoryList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/admin/categories">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Xem danh sách danh mục" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <Link to="/admin/orders">
        <ListItemButton>
          <ListItemIcon>
            <CalendarMonthOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Danh sách đơn hàng" />
        </ListItemButton>
      </Link>
      <Link to="/admin/customers">
        <ListItemButton>
          <ListItemIcon>
            <GroupOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Danh sách khách hàng" />
        </ListItemButton>
      </Link>
    </List>
  );
}
