import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
import HomeIcon from '@mui/icons-material/Home';


// import Cookies from "js-cookie";
// import { useCookies } from 'react-cookie';
// import Cookies from "universal-cookie";


// const cookies = new Cookies();
// const mycsrf = cookies.get("csrftoken");
// console.log(mycsrf);

// const [cookies] = useCookies(['csrftoken']);
// const csrfToken = cookies.csrftoken;
// console.log(csrfToken);

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

// const csrfToken = getCookie('csrftoken');
// console.log(csrfToken);


function Login(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {auth, login, logout, whoami} = useAuth();
    const [error, setError] = useState("");
    const navigateTo = useNavigate();

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    // isResponseOk(response){
    //     if (response.status >= 200 && response.status <= 299){
    //         return response.json();
    //     }
    //     else {
    //         throw Error(response.statusText);
    //     }
    // }

    useEffect(()=>{
        if(auth.isAuthenticated){
            console.log(auth)
            navigateTo("/explore");
        }
    }, [auth.isAuthenticated])

    async function handleFormSubmit(event){
        event.preventDefault();

        try {
            const Login = await login(username, password);
            console.log("Login Successfull", Login);
            navigateTo("/explore");
        }
        catch(e){
            setError("Invalid username or password");
            console.log(e);
        }
    }

    

    

    return (
        <>
        <a href="/" className="rounded-full bg-transparent lg:bg-white w-12 h-12 justify-center content-center float-none lg:float-right mt-10 mx-20"><HomeIcon /></a>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[100vw]">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                <img className="w-8 h-8 mr-2 rounded-full" src="../src/assets/glob.jpg" alt="logo" />
                MCF    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            {error && <small className="text-danger">{error}</small>}
                        </div>  
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} onChange={handleUsernameChange} placeholder="Your Username" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={handlePasswordChange} required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}


// function Login(){
//     const [isLogin, setLogin] = useState("");
//     const navigateTo = useNavigate();
//     const {setAuth} = useAuth();

//     function formSubmit(e){
//         e.preventDefault()
//         const formData = new FormData(e.target);

//         const data = {
//             username: formData.get("username"),
//             password: formData.get("password")
//         }

//         fetch("http://127.0.0.1:8000/myapp/log-me-in/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",  // <- this is important!
//             body: JSON.stringify(data),
//         })
//         .then((res) => res.json())
//         .then(resData=>{
//         if (resData.message === "success") {
//         setAuth({
//             isAuthenticated: true,
//             username: resData.username,
//             userId: resData.user_id
//         });
//         console.log(resData);
//         navigateTo("/explore");
//         } else {
//         alert("Login failed!");
//         }
//         })
          
//     }

//     // console.log(isLogin.user_id);
//     // console.log(isLogin.is_authenticated);

//     // useEffect(()=>{
//     //     if(isLogin.message === "success"){
//     //         navigateTo("/explore");
//     //     }
//     // }, [isLogin])

//     return (
//             <>
//             <a href="/" className="float-right mt-5 mx-20">Home</a>
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[100vw]">
//                 <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
//                     <img className="w-8 h-8 mr-2 rounded-full" src="../src/assets/glob.jpg" alt="logo" />
//                     MCF    
//                 </a>
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                             Sign in to your account
//                         </h1>
//                         <form onSubmit={formSubmit} className="space-y-4 md:space-y-6" action="#">
//                             <div>
//                                 <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//                                 <input type="text" name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" required=""/>
//                             </div>
//                             <div>
//                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                 <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-start">
//                                     <div className="flex items-center h-5">
//                                         <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
//                                     </div>
//                                     <div className="ml-3 text-sm">
//                                         <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
//                                     </div>
//                                 </div>
//                                 <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
//                             </div>
//                             <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//                             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                 Don’t have an account yet? <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
        
//     )
// }

export default Login;