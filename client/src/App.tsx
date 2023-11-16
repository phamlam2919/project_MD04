import "./App.css";
import Homepage from "./Pages/homepage/Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Detail from "./Pages/detail/Detail";
import Cart from "./Pages/cart/Cart";
import Pay from "./Pages/pay/Pay";
import BIll from "./Pages/bill/BIll";
import Shop from "./Pages/shop/Shop";
import ShopEarphone from "./Pages/shop/ShopEarphone";
import PortableSpeaker from "./Commons/newportablespeaker/PortableSpeaker";
import IndoorSpeakers from "./Commons/newindoorspeakers/IndoorSpeakers";
import AdminPage from "./Admin/AdminPage";
import Users from "./Admin/users/Users";
import ProductList from "./Admin/ProductList/ProductList";
import ProductDetail from "./Admin/ProductList/ProductEdit";
import AddProduct from "./Admin/ProductList/AddProduct";
import { useEffect } from "react";
function App() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/loa-marshall" element={<Shop />}></Route>
                <Route
                    path="/loa-marshall/loa-di-dong"
                    element={<PortableSpeaker />}
                />
                <Route
                    path="/loa-marshall/loa-nghe-trong-nha"
                    element={<IndoorSpeakers />}
                />
                <Route path="/shopEarphone" element={<ShopEarphone />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/bill" element={<BIll />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="user" element={<Users />} />
                    <Route path="products">
                        <Route index element={<ProductList />} />
                        <Route path="edit/:id" element={<ProductDetail />} />
                        <Route path="addproduct" element={<AddProduct />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
