import React from "react";
import { useNavigate } from "react-router-dom";

function Success(){

    const navigateTo = useNavigate();

    function handleClick(){
        navigateTo('/explore')
    }

    return (
        <div>
            <h1>Payment Done</h1>
            <p>Thankyou for completing your secure online payment</p>
            <p>Have a great day</p>
            <button onClick={handleClick}>Go Back</button>
        </div>
    )
}

export default Success;