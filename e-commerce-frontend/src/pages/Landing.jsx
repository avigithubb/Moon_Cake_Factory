import React, { useRef, useState, useEffect, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { AuthContext } from "../context/AuthContext";
import ProductDetails from "../pages/ProductDetails";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { useAuth } from '../context/AuthContext';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const mycsrf = cookies.get("csrftoken");
console.log(mycsrf);
// console.log(document.cookie);

function LandingPage(){
    const [swiperRef, setSwiperRef] = useState(null);
    // const [easeOut, setEaseOut] = useState(1);
    const [productData, setProductData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    // const { auth } = useAuth();
    // const { setAuth } = useAuth();
    const navigateTo = useNavigate();
    const [productId, setProductId] = useState();

    useEffect(()=>{
        fetch(`/myapp/get_csrf_token/`, {
            method: "GET",
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(document.cookie)
        })
    }, [])

    useEffect(()=>{
       
        fetch("/myapp/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data =>{
            setProductData(data);
        })
    }, [])

//     useEffect(()=>{
//         fetch("http://127.0.0.1:8000/myapp/check_login/", {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",  // <- this is important!
//         })
//         .then((res) => res.json())
//         .then(resData=>{
//         if (resData.isAuthenticated === true) {
//             console.log(resData)
//         setAuth({
//             isAuthenticated: true,
//             username: resData.username,
//             userId: resData.user_id
//         });
//         }else{
//             console.log(resData)
//             setAuth({
//                 isAuthenticated: false
//             })
//         }
//     })
// }, [])
    // if(auth.isAuthenticated === true){
    //     setAuth({
    //         isAuthenticated: true,
    //         username: auth.username,
    //         userId: auth.userId
    //     });
    // }

    function handleAdd(product_id){
        fetch(`/myapp/add_to_cart/${product_id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken")
            },
            credentials: "same-origin",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message)
            navigateTo("/cart");
        })
        .catch(e=>{
            console.log(e)
            navigateTo("/login")
            alert("Login Required!")
        })
    }

    useEffect(()=>{
        if(productId){
            navigateTo(`/details?productId=${productId}`)
        }
    }, [productId])

    window.addEventListener("scroll", () => {
        // setEaseOut(prevValue=>{
        //     easeOut = prevValue - 0.1;
        // })
        if(window.scrollY > 200){
            document.getElementsByClassName("header-img")[0].style.opacity = 0.8;
            document.getElementsByClassName("header-img")[0].style.scale = 1;
        }
        if(window.scrollY > 300){
            document.getElementsByClassName("header-img")[0].style.scale = 1.2;
        }
        if(window.scrollY > 400){
            document.getElementsByClassName("header-img")[0].style.opacity = 0.6;
            document.getElementsByClassName("header-img")[0].style.scale = 1.4;
        }
        if(window.scrollY > 500){
            document.getElementsByClassName("header-img")[0].style.scale = 1.6;
        }
        if(window.scrollY > 600){
            document.getElementsByClassName("header-img")[0].style.opacity = 0.4;
            document.getElementsByClassName("header-img")[0].style.scale = 1.8;
        }
        if(window.scrollY > 700){
            document.getElementsByClassName("header-img")[0].style.scale = 2;
        }
        if(window.scrollY > 800){
            document.getElementsByClassName("header-img")[0].style.opacity = 0.2;
            document.getElementsByClassName("header-img")[0].style.scale = 2.2;
        }
        if(window.scrollY > 900){
            document.getElementsByClassName("header-img")[0].style.opacity = 0;
            document.getElementsByClassName("header-img")[0].style.scale = 2.4;
        }
        
        
    })

    const mans_wear = productData.filter(product => product.category == "men's clothing");
    const womans_wear = productData.filter(product => product.category == "women's clothing");
    const technology = productData.filter(product => product.category == "electronics");
    const assessories = productData.filter(product => product.category == "jewelery");
    // console.log(productData[0].image.replace("%3A", ":/"))
    



    return (
        <>
            <Navbar className="my-nav fixed top-0 left-0 w-full z-50 bg-transparent shadow-md" />
            <div className="relative w-full h-[100vh] overflow-hidden">
                <img className="header-img h-[100vh] max-w-full w-[100vw] mt-[-100px] absolute inset-0 object-cover z-0" src="../src/assets/moon-cover.jpeg" alt="Moon cake" />
                <div className="heading-text absolute top-[30%] left-1/2 transform -translate-x-1/2 text-center text-white px-6 z-10">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">MOON CAKE FACTORY</h1>
                    <p className="mb-6 text-lg font-normal text-blue-200 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">A platform for your desired needs</p>
                    
                </div>
            </div>
            <div className='p-link w-[95vw] lg:w-[60vw] flex flex-col lg:flex-row m-auto mb-40'>
                <img src={productData.length === 0 ? (<p>Loading products...</p>) : (productData[0].image.replace("/media/https%3A", "https:/"))} alt="glob" className='rounded w-[30vw]' />
                <div className="w-full md:w-1/2 px-4 m-auto text-left lg:mx-10 sm:mx-0 text-white">
                    <h2 className="text-3xl font-bold mb-2">{productData.length === 0  ? (<p>Loading products...</p>) : (productData[0]["name"])}</h2>
                    <p className="text-white mb-4">SKU: WH1000XM4</p>
                    <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">${productData.length === 0 ? (<p>Loading products...</p>) : (productData[0]["price"])}</span>
                    </div>
                    <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span className="ml-2 text-white">{productData.length === 0  ? (<p>Loading products...</p>) : (productData[0]["rating"])} (120 reviews)</span>
                    </div>
                    <p className="text-gray-700 mb-6">{productData.length === 0 ? (<p>Loading products </p>) : (productData[0]["description"])}</p>

                    <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color:</h3>
                    <div className="flex space-x-2">
                        <button
                                        className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                        <button
                                        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                        <button
                                        className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                    </div>
                    </div>

                    <div className="mb-6">
                    <label for="quantity" className="block text-sm font-medium text-white mb-1">Quantity:</label>
                    <input onChange={(e)=> setQuantity(e.target.value)} type="number" id="quantity" name="quantity" min="1" value={quantity}
                                    className="text-black w-12 text-center rounded-md border-gray-700  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>

                    <div className="flex space-x-4 mb-6">
                    <button 
                        onClick={() => handleAdd(productData[0].id)}
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </button>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Industry-leading noise cancellation</li>
                        <li>30-hour battery life</li>
                        <li>Touch sensor controls</li>
                        <li>Speak-to-chat technology</li>
                    </ul>
                    </div>
                </div>

            </div>
            <div className='p-link w-[95vw] lg:w-[60vw] flex flex-col lg:flex-row m-auto mb-40'>
            <div className="w-full md:w-1/2 px-4 m-auto text-left lg:mx-10 sm:mx-0 text-white">
                    <h2 className="text-3xl font-bold mb-2">{productData.length === 0 ? (<p>Loading products...</p>): (productData[1].name)}</h2>
                    <p className="text-white mb-4">SKU: WH1000XM4</p>
                    <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">${productData.length === 0 ? (<p>Loading products...</p>): (productData[1].price)}</span>
                    </div>
                    <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span className="ml-2 text-white">{productData.length === 0 ? (<p>Loading products...</p>) : (productData[1].rating)} (120 reviews)</span>
                    </div>
                    <p className="text-gray-700 mb-6">{productData.length === 0 ? (<p>Loading products...</p>) : (productData[1].description)}</p>

                    <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color:</h3>
                    <div className="flex space-x-2">
                        <button
                                        className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                        <button
                                        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                        <button
                                        className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                    </div>
                    </div>

                    <div className="mb-6">
                    <label for="quantity" className="block text-sm font-medium text-white mb-1">Quantity:</label>
                    <input onChange={(e)=> setQuantity(e.target.value)} type="number" id="quantity" name="quantity" min="1" value={quantity}
                                    className="text-black w-12 text-center rounded-md border-gray-700  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>

                    <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => handleAdd(productData[1].id)}
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </button>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Industry-leading noise cancellation</li>
                        <li>30-hour battery life</li>
                        <li>Touch sensor controls</li>
                        <li>Speak-to-chat technology</li>
                    </ul>
                    </div>
                </div>
                <img src={productData.length === 0 ? (<p>Loading products...</p>) : (productData[1].image.replace("/media/https%3A", "https:/"))} alt="glob" className='rounded w-[30vw]' />

            </div>
            <div className='p-link w-[95vw] lg:w-[60vw] flex flex-col lg:flex-row m-auto mb-40'>
            <img src={productData.length === 0 ? (<p>Loading products...</p>) : (productData[5].image.replace("/media/https%3A", "https:/"))} alt="glob" className='rounded w-[30vw]' />
            <div className="w-full md:w-1/2 px-4 m-auto text-left lg:mx-10 sm:mx-0 text-white">
                    <h2 className="text-3xl font-bold mb-2">{productData.length === 0 ? (<p>Loading products...</p>) : (productData[5].name)}</h2>
                    <p className="text-white mb-4">SKU: WH1000XM4</p>
                    <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">${productData.length === 0 ? (<p>Loading products...</p>) : (productData[5].price)}</span>
                    </div>
                    <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 text-yellow-500">
                        <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span className="ml-2 text-white">{productData.length === 0 ? (<p>Loading products...</p>) : (productData[5].rating)} (120 reviews)</span>
                    </div>
                    <p className="text-gray-700 mb-6">{productData.length === 0 ? (<p>Loading products...</p>) : (productData[5].description)}</p>

                    <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color:</h3>
                    <div className="flex space-x-2">
                        <button
                                        className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                        <button
                                        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                        <button
                                        className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                    </div>
                    </div>

                    <div className="mb-6">
                    <label for="quantity" className="block text-sm font-medium text-white mb-1">Quantity:</label>
                    <input onChange={(e)=> setQuantity(e.target.value)} type="number" id="quantity" name="quantity" min="1" value={quantity}
                                    className="text-black w-12 text-center rounded-md border-gray-700  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>

                    <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => handleAdd(productData[5].id)}
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </button>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Industry-leading noise cancellation</li>
                        <li>30-hour battery life</li>
                        <li>Touch sensor controls</li>
                        <li>Speak-to-chat technology</li>
                    </ul>
                    </div>
                </div>

            </div>
            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left sm:w-[100vw]'>
                <h2 className='text-2xl font-bold mb-5'>Top Recommends</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}

                    {productData.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to="/explore?category=''" className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>
            

            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left sm:w-[100vw]'>
                <h2 className='text-2xl ml-0 font-bold mb-5'>Mens Wear</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}
                    {mans_wear.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore?category=${mans_wear.length === 0 ? "" : mans_wear[0].category}`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>

            

            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left sm:w-[100vw]'>
                <h2 className='text-2xl ml-0 font-bold mb-5'>Womens Wear</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}
                    {womans_wear.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore?category=${womans_wear.length === 0 ? '' : womans_wear[0].category}`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>

            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left sm:w-[100vw]'>
                <h2 className='text-2xl ml-0 font-bold mb-5'>Technology</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}
                    {technology.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore?category=${technology.length === 0 ? '' : technology[0].category}`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>

            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left sm:w-[100vw]'>
                <h2 className='text-2xl ml-0 font-bold mb-5'>Accessories</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}
                    {assessories.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore?category=${assessories.length === 0 ? '' : assessories[0].category}`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>

            <div className='p-link lg:w-[60vw] mt-[3rem] m-auto text-left justify-center sm:w-[100vw]'>
                <h2 className='text-2xl ml-0 font-bold mb-5'>Great Deals</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={6}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide>
                    <SwiperSlide><img src="../src/assets/glob.jpg" alt="glob" className="rounded" /></SwiperSlide> */}
                    {productData.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                        src={product.image.replace("/media/https%3A", "https:/")}
                        alt="glob"
                        className="rounded w-[6rem] lg:h-[8rem] sm:h-[6rem] m-auto hover:cursor-pointer hover:opacity-[0.5]"
                        onClick={()=>setProductId(product.id)}
                        />
                        <h2 className='text-center'>{product.name}</h2>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition'>
                    Take a look
                    </Link>
                </div>
            </div>

            <Footer className="my-foot fixed" />
        </>
    )
}

export default LandingPage;

