import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkout from "../pages/Payment";

function CartItem(props){
    const [isDelete, setDelete] = useState();
    const [toDelete, setToDelete] = useState(false);
    const navigateTo = useNavigate();

    useEffect(()=>{
        if(toDelete == true){
            fetch(`/myapp/delete_from_cart/${props.proId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin"
            })
            .then(res => res.json())
            .then(data => {
                setDelete(data)
                props.isDeleted(data.message, props.proId)
            })
        }
    }, [toDelete])

    return (
        <>
            <div className="flex flex-col md:flex-row w-[90vw] md:w-[80vw] lg:w-[60vw] mx-auto my-10 p-4 gap-4 rounded-lg bg-gray-800 shadow-md">
  
            {/* Image */}
            <img src={props.img} alt="glob" className="h-[30vh] w-full md:w-auto object-cover rounded" />

            {/* Product Info */}
            <div className="flex flex-col justify-center text-left md:ml-6">
                <h2 className="text-white text-lg font-semibold">{props.name}</h2>
                <p className="text-white text-sm">{props.desc}.</p>
                <span className="mt-2 text-blue-400 text-sm">Quantity: {props.quanti}</span>

                {/* Checkout Button */}
                <div className="mt-4">
                <Checkout
                    name={props.name}
                    description={props.desc}
                    amount={props.price}
                    image={props.img}
                    quantity={props.quanti}
                />
                </div>
            </div>

            {/* Icons */}
            <div className="flex md:flex-col justify-between md:justify-center items-center gap-3 ml-auto">
                <Link to={`/details?productId=${props.proId}`} className="hover:text-blue-400">
                <VisibilityIcon />
                </Link>
                <button onClick={() => setToDelete(true)} className="hover:text-red-500">
                <DeleteIcon />
                </button>
            </div>
            </div>

        </>
    )
}

export default CartItem;