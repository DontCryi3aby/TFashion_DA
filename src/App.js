import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./giaodien/Home";
import Detail from "./giaodien/Detail";

import Dangnhapadmin from "./admin/Dangnhapadmin";

import Dk from "./giaodien/Dangki";
import Dn from "./giaodien/Dangnhap";

// import AddProduct from "./admin/Product/AddProduct";
import Detail_product from "./admin/Product/Detail_product";
import { Cart } from "./giaodien/Cart";
import Thanhtoan from "./giaodien/Thanhtoan";
import Sominu from "./giaodien/Sominu";
import Chanvay from "./giaodien/Chanvay";
import Vaydamcongso from "./giaodien/Vaydamcongso";
import Bosuutapmoi from "./giaodien/Bosuutapmoi";
import Somichanvay from "./giaodien/Somichanvay";
import Sandouudai from "./giaodien/Sandouudai";
import Xahang from "./giaodien/Xahang";
import Dondathang from "./admin/Dondathang";
import Thongtinkh from "./admin/Thongtinkh";

import Hrctddhmn from "./giaodien/thegioicuaphaidep/Hrctmddhmn";
import Cdcvbc from "./giaodien/thegioicuaphaidep/Cdcvbc";
import Nbvanvddx from "./giaodien/thegioicuaphaidep/Nbvanvddx";
import Checkout from "./giaodien/Checkout";
import Kiemtradon from "./giaodien/Kiemtradon";
import ProductAll from "./admin/Product/ProductAll";
import Dashboard from "./admin/Dashboard";
import UpdateProduct from "./admin/Product/UpdateProduct";
import UserProfile from "./giaodien/User/UserProfile";
import ProductDetail from "./admin/Product/ProductDetail";
import AddProduct from "./admin/Product/AddProduct2";
import Category from "./admin/Category";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Dondathang />} />
          <Route path="/admin/product/detail" element={<Detail_product />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/:id/edit" element={<UpdateProduct />} />
          <Route path="/admin/products/:id" element={<ProductDetail />} />
          <Route path="/admin/products" element={<ProductAll />} />
          <Route path="/admin/customers" element={<Thongtinkh />} />
          <Route path="/admin/login" element={<Dangnhapadmin />} />
          <Route path="/admin/categories" element={<Category />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/Thanhtoan" element={<Thanhtoan />} />
          <Route path="/kiemtradon" element={<Kiemtradon />} />

          <Route path="/category/sominu" element={<Sominu />} />
          <Route path="/category/chanvay" element={<Chanvay />} />
          <Route path="/category/vaydamcongso" element={<Vaydamcongso />} />
          <Route path="/category/bosuutapmoi" element={<Bosuutapmoi />} />
          <Route path="/category/somichanvay" element={<Somichanvay />} />
          <Route path="/category/sandouudai" element={<Sandouudai />} />
          <Route path="/category/xahang" element={<Xahang />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/cdcvbc" element={<Cdcvbc />} />

          <Route path="/nbvanvddx" element={<Nbvanvddx />} />
          <Route path="/hrctddhmn" element={<Hrctddhmn />} />

          <Route path="/login" element={<Dn />} />
          <Route path="/register" element={<Dk />} />

          <Route path="/Detail/:title/:id" element={<Detail />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
