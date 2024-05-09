import { Link } from "react-router-dom";
import LogoImg from "../assets/images/Logo.jpg";
import { Box } from "@mui/material";

function Logo() {
  return (
    <Box width={120}>
      <Link to="/">
        <img src={LogoImg} alt="logo" />
      </Link>
    </Box>
  );
}

export default Logo;
