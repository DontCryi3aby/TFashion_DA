import React, { useState, useEffect } from "react";
import "../../App.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { BsFillAlarmFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box, Paper } from "@mui/material";
import { Footer } from "../../components/Footer";
export default function Cdcvbc() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  const [slsptgh, setslsptgh] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);

  return (
    <div>
      <Header />

      <Box mt={2}>
        <div
          className="cointainerhrct"
          style={{
            display: "flex",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          <div className="lefthrct" style={{ width: "25%" }}>
            <h4>BÀI VIẾT MỚI</h4>
            <table style={{ border: "1px solid gray" }}>
              <tr style={{ height: 70, border: "1px solid black" }}>
                <td>
                  <img
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                    src="https://statics.pancake.vn/web-media/f4/26/6d/06/def0ccf4c96da793fe00085976c3dc5d3cbe366d7415d744d1266284.png"
                    alt=""
                  />
                </td>
                <th>
                  <Link to="/hrctddhmn">
                    Hiểu rõ cơ thể để đẹp hơn mỗi ngày
                  </Link>
                </th>
              </tr>
              <tr style={{ height: 70, border: "1px solid black" }}>
                <td>
                  <img
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                    src="https://statics.pancake.vn/web-media/f4/26/6d/06/def0ccf4c96da793fe00085976c3dc5d3cbe366d7415d744d1266284.png"
                    alt=""
                  />
                </td>
                <th>
                  <Link to="/nbvanvddx">
                    Nổi bật và ấn tượng với đầm dáng xòe
                  </Link>
                </th>
              </tr>
              <tr style={{ height: 70, border: "1px solid black" }}>
                <td>
                  <img
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                    src="https://statics.pancake.vn/web-media/f4/26/6d/06/def0ccf4c96da793fe00085976c3dc5d3cbe366d7415d744d1266284.png"
                    alt=""
                  />
                </td>
                <th>
                  <Link to="/cdcvbc">
                    10 cách diện chân váy bút chì thanh lịch
                  </Link>
                </th>
              </tr>
            </table>
          </div>

          <Paper sx={{ width: "55%", ml: 4, p: 4 }}>
            <div className="righthrct">
              <span style={{ float: "left" }}>Tin tức&sự kiện</span>
              <br></br>
              <h1 style={{ fontWeight: 600, fontSize: "26px", float: "left" }}>
                10 cách diện chân váy bút chì thanh lịch
              </h1>
              <br></br>
              <br></br>
              <span style={{ float: "left" }}>
                Đăng bởi Nguyễn Ngọc Thạch vào lúc 18 Tháng 02 2023
              </span>

              <img
                style={{ width: "100%", height: 310 }}
                src="https://statics.pancake.vn/web-media/1a/4b/67/5e/514d87737939c2677f376420463b67867af83ce140ae07511969bcd5.png"
                alt=""
              />
              <span style={{ float: "left" }}>
                Chân váy bút chì là 1 trong những item kinh điển của phụ nữ công
                sở. Item này vừa đơn giản, tôn dáng lại mang cảm giác thanh
                lịch, chỉn chu cho người mặc. Phụ nữ Hàn cũng thường xuyên chọn
                diện chân váy bút chì khi đến sở làm. Thậm chí, họ còn biến tấu,
                mix&match chân váy bút chì với nhiều item khác biệt để có được
                những bộ cánh mới mẻ mỗi ngày. Cùng tham khảo ngay 10 cách diện
                chân váy bút chì từ phụ nữ Hàn để làm mới style đến sở làm, luôn
                ghi điểm thanh lịch, chỉn chu bạn nhé. Công thức cơ bản nhất mà
                nàng công sở nào cũng có thể diện đẹp, đó là áo sơ mi + chân váy
                bút chì. Bộ đôi này mang đến cảm giác nhã nhặn, thanh lịch cho
                chủ nhân. Khi diện sơ mi với chân váy bút chì, bạn đừng quên sơ
                vin và có thể dùng thêm 1 chiếc thắt lưng nhỏ để tăng hiệu quả
                tôn dáng. Hoàn thiện set đồ với 1 đôi giày cao gót mảnh mai và
                túi xách tay nhỏ xinh là đã có outfit ưng mắt.
                <br></br>
                <img
                  style={{ width: "100%" }}
                  src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2022/9/19/photo-10-16635731801391588269143.jpg"
                  alt=""
                />
                <br />
                Đây đích thị là dáng người lý tưởng nhất mà bất kỳ cô nàng nào
                luôn ao ước. Mông to, vòng ngực nở nang cùng một vòng eo nhỏ
                giúp nàng dễ dàng khoe trọn vóc dáng nuột nà của mình. Nếu may
                mắn sở hữu thân hình này thì cô nàng công sở không còn phải lo
                nghĩ nhiều trong khoản chọn trang phục, nàng có thể lựa chọn bất
                cứ outfit nào. Nhưng đặc biệt những chiếc váy công sở ôm tôn
                dáng chắc chắn là “vũ khí” quyến rũ và thanh lịch nhất cho các
                chị em đấy.
                <img
                  style={{ width: "100%" }}
                  src="https://statics.pancake.vn/web-media/eb/bd/eb/9c/13925b6af62ab699830d29a80b2c55aaadbbc526c77d94806505541a.jpg"
                  alt=""
                />
                <br></br>
                Bên cạnh những mẫu chân váy bút chì trơn màu truyền thống, bạn
                cũng có thể làm mới style với 1 chiếc chân váy bút chì họa tiết
                thú vị. Mix chân váy bút chì họa tiết với sơ mi sáng màu là bạn
                đã có set đồ nổi bật, thời thượng mà vẫn vẹn nguyên tính chỉn
                chu, thanh lịch như phụ nữ Hàn. Vì chân váy và áo đã khá ấn
                tượng, nên về phần phụ kiện như giày và túi, bạn hãy ưu tiên
                chọn thiết kế trơn màu, đơn giản để tránh rối mắt.{" "}
                <img
                  style={{ width: "100%" }}
                  src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2022/9/19/photo-9-16635731771432031070543.jpg"
                  alt=""
                />
                <br></br>Cô nàng này chơi trội với 1 chiếc chân váy bút chì màu
                tím pastel. Cô chọn mix váy với cardigan mỏng, màu trắng trơn
                tạo cảm giác nữ tính, yểu điệu, đúng chuẩn style xinh xẻo của
                phụ nữ Hàn. Với set đồ này, bạn chỉ nên sử dụng xoay quanh 2 đến
                3 tông màu cơ bản để tránh bị rối mắt. Chân váy bút chì là 1
                trong những item kinh điển của phụ nữ công sở. Item này vừa đơn
                giản, tôn dáng lại mang cảm giác thanh lịch, chỉn chu cho người
                mặc. Phụ nữ Hàn cũng thường xuyên chọn diện chân váy bút chì khi
                đến sở làm. Thậm chí, họ còn biến tấu, mix&match chân váy bút
                chì với nhiều item khác biệt để có được những bộ cánh mới mẻ mỗi
                ngày. Cùng tham khảo ngay 10 cách diện chân váy bút chì từ phụ
                nữ Hàn để làm mới style đến sở làm, luôn ghi điểm thanh lịch,
                chỉn chu bạn nhé. Công thức cơ bản nhất mà nàng công sở nào cũng
                có thể diện đẹp, đó là áo sơ mi + chân váy bút chì. Bộ đôi này
                mang đến cảm giác nhã nhặn, thanh lịch cho chủ nhân. Khi diện sơ
                mi với chân váy bút chì, bạn đừng quên sơ vin và có thể dùng
                thêm 1 chiếc thắt lưng nhỏ để tăng hiệu quả tôn dáng. Hoàn thiện
                set đồ với 1 đôi giày cao gót mảnh mai và túi xách tay nhỏ xinh
                là đã có outfit ưng mắt. <br />
                Bên cạnh những mẫu chân váy bút chì trơn màu truyền thống, bạn
                cũng có thể làm mới style với 1 chiếc chân váy bút chì họa tiết
                thú vị. Mix chân váy bút chì họa tiết với sơ mi sáng màu là bạn
                đã có set đồ nổi bật, thời thượng mà vẫn vẹn nguyên tính chỉn
                chu, thanh lịch như phụ nữ Hàn. Vì chân váy và áo đã khá ấn
                tượng, nên về phần phụ kiện như giày và túi, bạn hãy ưu tiên
                chọn thiết kế trơn màu, đơn giản để tránh rối mắt.{" "}
                <img
                  style={{ width: "100%" }}
                  src="https://statics.pancake.vn/web-media/e2/f8/bf/7c/fca31bfd8f1eef1321acf56946e0090c8e2eb419fd92618cc0d875ba.jpg"
                  alt=""
                />
                <br></br>Những cô nàng điệu đà có thể mix chân váy bút chì với
                áo blouse nữ tính. Chân váy có thiết kế đơn giản nên có thể kết
                hợp ăn ý cùng mọi thể loại áo blouse cầu kỳ, bánh bèo. <br />
              </span>
            </div>
          </Paper>
        </div>
      </Box>

      <Footer />
    </div>
  );
}
