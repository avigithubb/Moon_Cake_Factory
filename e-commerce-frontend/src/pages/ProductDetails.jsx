import React, {useState, useEffect} from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ProductDetails(props){
    const [swiperRef, setSwiperRef] = useState(null);
    const [proData, setProData] = useState([]);
    const [identicalPro, setIdenPro] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const productKey = query.get("productId");

    useEffect(() =>{
        fetch(`/myapp/get_product/${productKey}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken")
              },
            credentials: "same-origin",  // <- this is important!
             
        })
        .then(response=> response.json())
        .then(data=>{
            // console.log(data[0])
            setProData(data);
        })
    }, [])

    useEffect(()=>{
        if(proData.length > 0){
            fetch(`/myapp/get_category/${proData[0].category}/`, {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data=>{
                setIdenPro(data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
    },[proData])

    // console.log(identicalPro)

    const [srcImg, setSrcImg] = useState('Loading...');
    function changeImage(src) {
        setSrcImg(src);
    }
    return (
        <>
        <Navbar />
        <div className="w-[100vw]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex -mx-4">
             
                <div className="w-full md:w-1/2 px-4 mb-8">
                    <img src={proData.length === 0 ? (srcImg) : (proData[0].image.replace("/media/https%3A", "https:/"))} alt="Product"
                                className="w-[30vw] h-auto rounded-lg shadow-md mb-4" id="mainImage"/>
                    <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                    {proData.length === 0 ? "": (proData[0].image1 ===  null ? "" : <img src={(proData[0].image1)} alt="Thumbnail 1"
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onClick={(e)=>(changeImage(e.target.src))}/>)}
                    {proData.length === 0 ? "": (proData[0].image2 ===  null ? "" : <img src={(proData[0].image2)} alt="Thumbnail 1"
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onClick={(e)=>(changeImage(e.target.src))}/>)}
                    {proData.length === 0 ? "": (proData[0].image3 ===  null ? "" : <img src={(proData[0].image3)} alt="Thumbnail 1"
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onClick={(e)=>(changeImage(e.target.src))}/>)}
                    {proData.length === 0 ? "": (proData[0].image4 ===  null ? "" : <img src={(proData[0].image4)} alt="Thumbnail 1"
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onClick={(e)=>(changeImage(e.target.src))}/>)}
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-4 m-auto text-left mx-10 text-white">
                    <h2 className="text-3xl font-bold mb-2">{proData.length === 0 ? (<p>Loading...</p>) : (proData[0].name)}</h2>
                    <p className="text-white mb-4">SKU: WH1000XM4</p>
                    <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">${proData.length === 0 ? (<p>Loading...</p>) : (proData[0].price)}</span>
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
                    <span className="ml-2 text-white">{proData.length === 0 ? (<p>Loading...</p>) : (proData[0].rating)} (120 reviews)</span>
                    </div>
                    <p className="text-gray-700 mb-6">{proData.length === 0 ? (<span>Loading...</span>) : (proData[0].description)}</p>

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
                    <input type="number" id="quantity" name="quantity" min="1" value="1"
                                    className="text-black w-12 text-center rounded-md border-gray-700  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>

                    <div className="flex space-x-4 mb-6">
                    <Link
                        to={`/cart?productId=${proData.length === 0 ? (1) : (proData[0].id)}`}
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </Link>
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
            </div>
        </div>
        <div></div>
        <div className='lg:w-[60vw] sm:w-[100vw] mt-[3rem] m-auto text-left'>
                <h2 className='text-2xl font-bold mb-5'>Also Checkout</h2>
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
                    {identicalPro.map((product, index)=>(
                        <SwiperSlide>
                            <img src={product.image.replace("/media/https%3A", "https:/")} alt="glob" className="rounded w-[6rem] lg:h-[8rem] sm-[6rem] m-auto" />
                            <h2 className="text-center">{product.name}</h2>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center mt-4">
                    <Link to={`/explore?category=${identicalPro.length === 0 ? '' : identicalPro[0].category}`} className='text-black bg-gray-200 px-5 py-2 rounded hover:bg-gray-300 transition m-auto'>
                        Take a look
                    </Link>
                </div>
            </div>
        <Footer />
    </>
    )
}

export default ProductDetails;