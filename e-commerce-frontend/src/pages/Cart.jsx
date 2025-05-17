import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Cart(){

    // const query = new URLSearchParams(useLocation().search);
    // const productId = query.get("productId");
    const [allCartItems, setCartItems] = useState([]);


    function isDeleted(message, id){
        if(message == "Success"){
            setCartItems(prevItems => {
                const updatedItems = prevItems.filter(item => item.id !== id)
                if(updatedItems.length === 0){
                    window.location.reload()
                }
                else{
                    return updatedItems;
                }
            }
            )
        }
    }

    useEffect(()=>{
        fetch(`/myapp/all_cart_items/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken")
              },
              credentials: "same-origin", 
              
        })
        .then(response=> response.json())
        .then(data=>{
            setCartItems(data)
        })
        .catch(err=>(
            console.log(err)
        ))
    }, [])

    return (
        <>
        <Navbar />
        <h2 className="text-6xl mt-5 mb-5">Shopping Cart</h2>
        <div className="bg-gray-700 h-2 w-[60vw] m-auto"></div>
        {
            allCartItems.length === 0 ? (
                <div className="text-center content-center m-auto">
                <img src="/src/assets/EmptyCart.gif" alt="empty cart" className="m-auto" />
                <p className="italic text-white my-10">Ooops! There's no item in your cart.</p>
                </div>
            ) : (
                allCartItems.map((each, index) => (
                    <CartItem key={index} proId={each.id} img={each.image.replace("/media/https%3A", "https:/")} quanti={each.quantity} desc={each.description} isDeleted={isDeleted} name={each.name} price={each.price} />
                ))
                
            )
        }
        <div className="m-auto my-20">
            <a href="/explore"><button className="w-[30vw]">Continue Shopping</button></a>
        </div>
        <Footer />
        </>
    )
}

export default Cart;