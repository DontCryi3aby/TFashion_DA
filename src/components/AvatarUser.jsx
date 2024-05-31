import { Box } from "@mui/material";

function AvatarUser({ img }) {
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

export default AvatarUser;
