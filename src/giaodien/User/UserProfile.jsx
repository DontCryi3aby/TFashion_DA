import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AccountInfo } from "./AccountInfo";
import { AccountDetailsForm } from "./AccountDetailsForm";

// function AccountInfo({ user }) {
//   const [avatar, setAvatar] = useState(user.avatar ? user.avatar : "");
//   const [name, setName] = useState(user.name || "");

//   const [image, setImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_BASEURL}/api/users/${user.id}`)
//       .then((response) => {
//         const { avatar, name } = response.data;
//         setAvatar(avatar);
//         setName(name);
//       });
//   }, [user.id]);

//   const handleImgChange = (e) => {
//     const imgFile = e.target.files[0];
//     setImage(imgFile);
//     setPreviewImage(URL.createObjectURL(imgFile));
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Stack spacing={2} sx={{ alignItems: "center" }}>
//           <div>
//             <Avatar
//               src={`${process.env.REACT_APP_BASEURL}/storage/${avatar}`}
//               sx={{ height: "80px", width: "80px" }}
//             />
//           </div>
//           <Stack spacing={1} sx={{ textAlign: "center" }}>
//             <Typography variant="h5">{name}</Typography>
//             <Typography color="text.secondary" variant="body2">
//               Hà Nội, Việt Nam
//             </Typography>
//           </Stack>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button
//           component="label"
//           variant="contained"
//           tabIndex={-1}
//           startIcon={<CloudUploadIcon />}
//           sx={{ margin: "0 auto" }}
//         >
//           Cập nhật ảnh đại diện
//           <input
//             type="file"
//             name="hinhanh"
//             onChange={handleImgChange}
//             accept="image/*"
//             hidden
//           />
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

// function AccountDetailsForm({ user }) {
//   const [name, setName] = useState(user.name || "");
//   const [email, setEmail] = useState(user.email || "");
//   const [phoneNum, setPhoneNum] = useState(user.sdt || "");

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_BASEURL}/api/users/${user.id}`)
//       .then((response) => {
//         const { sdt, name, email } = response.data;
//         setName(name);
//         setEmail(email);
//         setPhoneNum(sdt);
//       });
//   }, [user.id]);

//   const handleUpdateProfile = async () => {
//     console.log({ name, email, phoneNum });
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("sdt", phoneNum);
//     formData.append("_method", "PATCH");

//     const response = await axios.post(
//       `${process.env.REACT_APP_BASEURL}/api/users/${user.id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("data: ", response.data);
//     localStorage.setItem("userData", JSON.stringify(response.data));
//     alert("Cập nhật tài khoản thành công!");
//     window.location.reload();
//   };

//   return (
//     <Box>
//       <Card>
//         <CardHeader
//           subheader="Thông tin cá nhân có thể thay đổi"
//           title="Thông tin"
//         />
//         <Divider />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid md={9} xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Họ và tên</InputLabel>
//                 <OutlinedInput
//                   label="Họ và tên"
//                   name="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid md={3} xs={12}></Grid>
//             <Grid md={9} xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Email</InputLabel>
//                 <OutlinedInput
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid md={3} xs={12}></Grid>
//             <Grid md={9} xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Số điện thoại</InputLabel>
//                 <OutlinedInput
//                   label="Số điện thoại"
//                   name="sdt"
//                   value={phoneNum}
//                   onChange={(e) => setPhoneNum(e.target.value)}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid md={3} xs={12}></Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: "flex-end" }}>
//           <Button
//             sx={{ width: 240 }}
//             variant="contained"
//             onClick={handleUpdateProfile}
//           >
//             Cập nhật
//           </Button>
//         </CardActions>
//       </Card>
//     </Box>
//   );
// }

export default function UserProfile() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  return (
    <Box>
      <Header />
      <Box py={5} px={2}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <AccountInfo />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <AccountDetailsForm />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
