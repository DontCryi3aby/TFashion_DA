import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

export function AccountInfo() {
  const { id } = useParams();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${id}`)
      .then((response) => {
        const { avatar, name } = response.data;
        setAvatar(avatar);
        setName(name);
      });
  }, [id]);

  const handleImgChange = (e) => {
    const imgFile = e.target.files[0];
    setImage(imgFile);
    setPreviewImage(URL.createObjectURL(imgFile));
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar
              src={`${process.env.REACT_APP_BASEURL}/storage/${avatar}`}
              sx={{ height: "80px", width: "80px" }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{name}</Typography>
            <Typography color="text.secondary" variant="body2">
              Hà Nội, Việt Nam
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ margin: "0 auto" }}
        >
          Cập nhật ảnh đại diện
          <input
            type="file"
            name="hinhanh"
            onChange={handleImgChange}
            accept="image/*"
            hidden
          />
        </Button>
      </CardActions>
    </Card>
  );
}
