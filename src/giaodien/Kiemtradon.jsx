import React, { useState, useEffect } from "react";
import '../App.css'
import {AiFillCaretDown} from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'
import {RiUserSearchFill} from 'react-icons/ri'
import { Link } from "react-router-dom";

import axios from 'axios';

export default function Kiemtradon() {

    const [slsptgh,setslsptgh] = useState(0);
    useEffect(() => {
     axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
       .then((response) => {
         setslsptgh(response.data); 
   
       })
       .catch((error) => {
         console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
       });
   }, []);
     const userData = localStorage.getItem('userData');
     const user = userData ? JSON.parse(userData).user : null;
     const userId = user ? user.id : null;
 
 const handleLogout = ()=>{
  
   localStorage.removeItem('userData');
 };
  return (
    <div>  <div>
    <ul id="header">
      <li><Link to="/">Giới thiệu</Link></li>
      <li id="down1">
        <Link to="/">Sản phẩm <AiFillCaretDown /></Link>
        <ul id="dc1">
          <li><Link to="/category/sominu">Sơ mi nữ</Link></li>
          <li><Link to="/category/chanvay">Chân váy</Link></li>
          <li><Link to="/category/vaydamcongso">Váy đầm công sở</Link></li>
        </ul>
      </li>
      <li><Link to="/">Góc cửa hàng</Link></li>
      <li id="down2">
        <Link to="/">Hot Deal <AiFillCaretDown /></Link>
        <ul id="dc2">
          <li><Link to="/category/bosuutapmoi">Bộ sưu tập mới</Link></li>
          <li><Link to="/category/somichanvay">Sơ mi chân váy</Link></li>
          <li><Link to="/category/sandouudai">Săn đồ ưu đãi</Link></li>
          <li><Link to="/category/xahang">Xả hàng</Link></li>
        </ul>
      </li>
      <li><Link to="/">Tuyển dụng</Link></li>
      <li><Link to="/">Feedback</Link></li>
      <li><Link to="/">Liên hệ</Link></li>
      <li> 
        <Link to="/Cart">Giỏ hàng <BsFillCartFill/></Link>
        <div className="cart-count">{slsptgh}</div>
       </li>
    </ul>
  </div>

  
  <div id="login-register">
            <ul>
              {user ? (
                <>
                  <li>Xin chào: {user.name}</li>
                  <li>
                  <button onClick={handleLogout} style={{with: 150,height:42,fontSize:12,float:'left'}}> <Link to="/account/login"> Đăng xuất </Link></button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/account/login">Đăng nhập/</Link></li>
                  <li><Link to="/account/register">Đăng ký</Link></li>
                </>
              )}
            </ul>
          </div>

          <div className="containerkiemtradon" style={{display:'flex'}}>
             <div className="leftkiemtradon" style={{width:'30%',background:'red',height:250,marginTop:-55,marginLeft:60,fontSize:200}}>
                 <RiUserSearchFill/>
             </div>
             <div className="rightkiemtradon" style={{ width: '60%', background: 'yellow', marginLeft: 15 }}>
  <div style={{ float: 'left' }}>
    <h3>TRA CỨU THEO MÃ ĐƠN HÀNG</h3>
    <p>Để theo dõi đơn hàng của bạn, xin vui lòng nhập số điện thoại đơn hàng của bạn vào ô dưới đây và nhấn nút "Theo dõi".</p>
    <div style={{ float: 'left' }}>
  <label htmlFor="phoneNumber" style={{ fontWeight: 550 }}>Số điện thoại</label>
  <input style={{marginLeft:15}} type="text" id="phoneNumber" />
  <button style={{background:'blue' ,color:'white'}}>THEO DÕI</button>
</div><br></br><br></br>

<div className="donhangcuaban">
  <h4>ĐƠN HÀNG CỦA BẠN</h4>
  <p>tình trang đơn hàng</p>

  <table class="table">
  <thead>
    <tr>
      <th scope="col">Đơn hàng</th>
      <th scope="col">Ngày tháng</th>
      <th scope="col">Trạng thái</th>
      <th scope="col">Tổng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>


  </div>
</div>

          </div>
          
          <div style={{marginTop: '20px',borderRadius:'15px',background:'#cc9c69',marginTop:100}}>
        <div class="container-fluid fh5co_footer_bg pb-3">
    <div class="container animate-box">
        <div class="row">
        
            <div class="col-12 col-md-4 col-lg-3">
                <div class="footer_main_title py-3"> Địa chỉ tòa soạn</div>
                <div class="footer_sub_about pb-3"> Trụ sở chính: Số 138A Giảng Võ - Quận Ba Đình - Thành phố Hà Nội
Địa chỉ liên hệ: Tòa nhà Tổng cục Dân số, ngõ 8 đường Tôn Thất Thuyết, quận Nam Từ Liêm, TP Hà Nội
Điện thoại: 024.3846.1042 - Fax: 024.3844.3144
Đường dây nóng: 0931.965.967
Email: giadinhnet@suckhoedoisong.vn
                </div>
                <div class="footer_mediya_icon">
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-linkedin"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-google-plus"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-twitter"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-facebook"></i></div>
                    </a></div>
                </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2">
                <div class="footer_main_title py-3"> Category</div>
                <ul class="footer_menu">
                    <li><a href="{{url('/kinhdoanh')}}"><i class="fa fa-angle-right"></i> kinh doanh</a></li>
                    <li><a href="{{url('/khoahoc')}}"><i class="fa fa-angle-right"></i> khoa học</a></li>
                    <li><a href="{{url('/thoitrang')}}"><i class="fa fa-angle-right"></i> Thời trang</a></li>
                    <li><a href="{{url('/giaoduc')}}"><i class="fa fa-angle-right"></i> Giáo dục 4.0</a></li>
                    <li><a href="{{url('/giaothong')}}"><i class="fa fa-angle-right"></i> Giao thông</a></li>
                    <li><a href="{{url('/laodongvieclam')}}"><i class="fa fa-angle-right"></i> Lao động việc làm</a></li>
                    <li><a href="{{url('/thegioitunhien')}}"><i class="fa fa-angle-right"></i> Thế giới tự nhiên</a></li>
                    <li><a href="{{url('/cacmonthethaokhac')}}"><i class="fa fa-angle-right"></i> Các môn thể thao khác</a></li>
                </ul>
        
                
            </div>
            <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                <div class="footer_main_title py-3"> Liên Hệ Quảng Cáo: ADMICRO</div>
                <div class="footer_makes_sub_font">Hotline: 0794.46.33.33 - 0961.98.43.88
                    Email: giadinh@admicro.vn</div>
                Add: Tầng 20, tòa nhà Center Building, Hapulico Complex, số 1 Nguyễn Huy Tưởng, phường Thanh Xuân Trung, quận Thanh Xuân, Hà Nội 
                
            </div>
            <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                <div class="footer_main_title py-3"> CHUYÊN TRANG GIA ĐÌNH VÀ XÃ HỘI - BÁO ĐIỆN TỬ SỨC KHỎE VÀ ĐỜI SỐNG</div>
                <div class="footer_makes_sub_font">Cơ quan chủ quản: Bộ Y tế
Tổng biên tập: Trần Tuấn Linh</div>
            

Cơ quan chủ quản: Bộ Y tế
Tổng biên tập: Trần Tuấn Linh
Hoạt động theo Giấy phép số 60/GP-CBC ngày 23/7/2021 của Cục Báo chí - Bộ Thông tin và Truyền thông
® Mọi hình thức sao chép thông tin, hình ảnh phải có sự đồng ý bằng văn bản. Vui lòng dẫn “giadinh.suckhoedoisong.vn” khi phát hành lại thông tin từ website này.
                
            </div>
            
        </div>
        <div class="row justify-content-center pt-2 pb-4">
            <div class="col-12 col-md-8 col-lg-7 ">
                <div class="input-group">
                    <span class="input-group-addon fh5co_footer_text_box" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                 
                 
                </div>
            </div>
        </div>
    </div>
</div>
    </div>

          
          </div>
  )
}
