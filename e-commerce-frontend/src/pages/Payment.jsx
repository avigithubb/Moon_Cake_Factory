import { loadStripe } from '@stripe/stripe-js';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const product_key = process.env.STRIPE_PRODUCT_KEY;
const stripePromise = loadStripe('pk_test_51RL5404Ks5wjerk3gGVwXnbhj9FsyB6vU4lzzzCiDoH6VIocNdDGuvhWh75VknQ6Lyhooa2WBmj29nLaNiIwgCiw00mTHKyuC0');

function Checkout(props){
    const handleClick = async () => {
        const stripe = await stripePromise;

        const response = await fetch("/myapp/create-checkout-session/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken")
            },
            credentials: "same-origin",
    
            body: JSON.stringify({
                name: props.name,
                description: props.description,
                amount: parseInt(props.amount),
                image: props.image,
                quantity: props.quantity,
            }),
        });

        const session = await response.json();
        

        const result = await stripe.redirectToCheckout({
            sessionId: session.id, // ✅ This is REQUIRED
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <button onClick={handleClick} className="w-32 mt-5">
            Buy ${props.amount}
        </button>
    );
};

export default Checkout;
