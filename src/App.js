import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";

import laptop_banner from "./Components/Assets/Laptops.png";
import repairs_banner from "./Components/Assets/repairs.png";
import parts_banner from "./Components/Assets/WOMEN.png";
import Admin from "./Pages/Admin/Admin";
import ListProduct from "./Pages/Admin/ListProduct/ListProduct";
import AddProduct from "./Pages/Admin/AddProduct/AddProduct";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./shared/PrivateRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route
              path="/men"
              element={<ShopCategory banner={laptop_banner} category="men" />}
            />
            <Route
              path="/women"
              element={<ShopCategory banner={parts_banner} category="women" />}
            />
            <Route
              path="/kid"
              element={<ShopCategory banner={repairs_banner} category="kid" />}
            />
            <Route path="product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="listproduct" element={<ListProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
          </Routes>
        </AuthProvider>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
