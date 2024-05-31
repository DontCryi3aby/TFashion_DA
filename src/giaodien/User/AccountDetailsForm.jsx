import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AccountDetailsForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${id}`)
      .then((response) => {
        const { sdt, name, email } = response.data;
        setName(name);
        setEmail(email);
        setPhoneNum(sdt);
      });
  }, [id]);

  const handleUpdateProfile = async () => {
    console.log({ name, email, phoneNum });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sdt", phoneNum);
    formData.append("_method", "PATCH");

    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/api/users/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("data: ", response.data);
    localStorage.setItem("userData", JSON.stringify(response.data));
    alert("Cập nhật tài khoản thành công!");
    window.location.reload();
  };

  return (
    <Box>
      <Card>
        <CardHeader
          subheader="Thông tin cá nhân có thể thay đổi"
          title="Thông tin"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={9} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Họ và tên</InputLabel>
                <OutlinedInput
                  label="Họ và tên"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid md={3} xs={12}></Grid>
            <Grid md={9} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid md={3} xs={12}></Grid>
            <Grid md={9} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Số điện thoại</InputLabel>
                <OutlinedInput
                  label="Số điện thoại"
                  name="sdt"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid md={3} xs={12}></Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            sx={{ width: 240 }}
            variant="contained"
            onClick={handleUpdateProfile}
          >
            Cập nhật
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
