import React from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import LandingPage from "../pages/Landing";
import SignUp from "../pages/Signup";
import Login from "../pages/Login"
import ProductDetails from "../pages/ProductDetails";
import Explore from "../pages/Explore";
import Cart from "../pages/Cart";
import AddItem from "../pages/AddItem";
import Profile from "../pages/Profile";
import Success from "../context/Success";
import About from "../pages/About";
import Contact from "../pages/Contact";


function Home(){
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<LandingPage />} ></Route>
                <Route path="/login" element={<Login />} ></Route>
                <Route path="/sign-up" element={<SignUp />} ></Route>
                <Route path="/details" element={<ProductDetails />} ></Route>
                <Route path="/explore" element={<Explore />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/add-item" element={<AddItem />}></Route>
                <Route path="/edit-profile" element={<Profile />}></Route>
                <Route path="/success" element={<Success />}></Route>
                <Route path="/cancel" element={<Explore/>}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Home;