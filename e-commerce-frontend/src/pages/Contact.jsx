import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function handleSubmit(e){
        e.preventDefault();
        
        fetch(`/myapp/contact-us/`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
        <Navbar />
        <div className="w-[100vw] text-center">
            <h2 className="text-6xl text-white my-14">Contact Us</h2>
            <div className="contact-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h3 className="text-3xl my-4">Contact Us MoonProduct</h3>
                    <p>Please fill this form with a message. We will get back in 24 hours.</p>
                    <input onChange={handleChange} type="text" placeholder="Name" value={formData.name} name="name" required autofocus />
                    <input onChange={handleChange} type="email" placeholder="Email" value={formData.email} name="email" required />
                    <input onChange={handleChange} type="tel" placeholder="Mobile Number" value={formData.phone} name="phone" required />
                    <textarea onChange={handleChange} placeholder="Message" name="message" value={formData.message} required></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        </div>
        <Footer />
        </>
    )
}

export default Contact;