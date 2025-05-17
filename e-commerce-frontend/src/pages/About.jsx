import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About(){
    return(
        <>
            <Navbar />
            <div className="w-[100vw] m-auto">
                <h2 className="text-6xl text-white my-14">About Us</h2>
                <p className="text-gray-200 align-middle content-center w-[40vw] m-auto my-20">
                    Welcome to <b>Moon Cake Factory</b>, your one-stop destination for seamless online shopping. Our e-commerce platform is designed to offer a fast, secure, and user-friendly shopping experience. Whether you're browsing for the latest fashion, tech gadgets, home essentials, or unique finds, we've got something for everyone.<br/><br/>

                    With an intuitive interface, real-time product search, secure payment gateway <em>(powered by Stripe)</em>, and detailed product pages, our app ensures you have all the information you need to make confident purchases. Our admin panel provides deep insights and analytics to manage products and orders efficiently.<br/><br/>
                    <span className="text-left">
                        <span className="float-left">Key Features:</span><br/>
                        <ul className="my-5">
                            <li>🚀 Smooth and responsive UI for all screen sizes</li>
                            <li>🔍 Advanced product search and category filters</li>
                            <li>💳 Secure and easy checkout process</li>
                            <li>📦 Track orders in real-time</li>
                            <li>📈 Admin dashboard for performance insights</li>
                            <li>🌐 Built with React & Django for speed and reliability</li>
                        </ul>
                    </span>

                    <span className="text-green-300">Experience shopping the modern way — with just a few taps. Your next favorite item is just a scroll away!</span>
                </p>
            </div>
            <Footer />
        </>
    )
}

export default About;