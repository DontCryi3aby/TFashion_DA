import { Box } from "@mui/material";
import img from "../../src/assets/images/avatar.jpg";

function Avatar() {
  return (
    <Box
      width={50}
      height={50}
      sx={{
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img src={img} alt="avatar" />
    </Box>
  );
}

export default Avatar;
