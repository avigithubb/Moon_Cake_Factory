import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../pages/Products";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import Cookies from "universal-cookie";

const cookies = new Cookies();
console.log(cookies.get("csrftoken"));

function Explore(){
    const[myData, setData] = useState([]);

    const query = new URLSearchParams(useLocation().search);
    const categoryPro = query.get("category");
    const searchedInput = query.get("searchedInput");
    const { auth } = useAuth();
    const navigateTo = useNavigate();
    // const { setAuth } = useAuth();

    useEffect(()=>{
        if((categoryPro == null) || (categoryPro == '')){
            fetch(`/myapp/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken")
                  },
                credentials: "same-origin",  // <- this is important!
                
            })
            .then(response => response.json())
            .then(data =>{
                setData(data)
            })
            .catch((e) =>
                console.log(`Exception is ${e}`)
            )
        }
        else{
            fetch(`/myapp/get_category/${categoryPro}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken")
                },
                credentials: "same-origin",
            })
            .then(response => response.json())
            .then(data =>{
                setData(data)
            })
            .catch((e) =>
                console.log(`Exception is ${e}`)
            )
        }
    }, [categoryPro])

    useEffect(()=>{
        if(searchedInput != null){
            fetch(`/myapp/search/${searchedInput}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
            })
            .then(res=> res.json())
            .then(data=>{
                
                setData(data);
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }, [searchedInput])

    useEffect(() => {
        if (!Array.isArray(myData) && myData?.message) {
          alert(myData.message);
          navigateTo(`/explore?category=${null}`);
        }
      }, [myData]);

   



    return (
        <>
            <Navbar />
            <h2 className="text-6xl mt-5">Explore All</h2>
            <div className="w-[80vw] m-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {Array.isArray(myData) ? (myData.map((product,index)=>(
                    <Product key={index} proId={product.id} image={product.image.replace("/media/https%3A", "https:/")} title={product.name} rating={product.rating} price={product.price} />
                    
                ))
                ) : (null)
                }
                
            </div>
            <Footer />
        </>
    )
}

export default Explore;