import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import glob from "../assets/glob.jpg";
import profile from "../assets/profile.png";

function Navbar(props){
    const [isLogout, setLogout] = useState("");
    const [isLogin, setLogin] = useState(false);
    const[productName, setInput] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
  

    const { auth, logout} = useAuth();

    const navigateTo = useNavigate();
    function LogOut(){
        fetch("/myapp/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "same-origin",  // <- this is important!
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.message === "success") {
              setLogout("success");
              navigateTo("/login");
            } else {
              alert("Logout failed!");
            }
          });
        
    }

    function handleChange(e){
        
        setInput(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      console.log(productName);

      navigateTo(`/explore?searchedInput=${productName}`)
    }

    function handleLogout(){
        logout(navigateTo)
    }




    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 w-[100vw]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={glob} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MKF</span>
            </a>
            
            <form onSubmit={handleSubmit} className="flex md:order-2">
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
                </button>
                <div className="relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search icon</span>
                </div>
                    <input onChange={handleChange} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={productName} placeholder="Search..." />
                </div>
                
            </form>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                  <div className="relative mt-3 md:hidden">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                      </div>
                      <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                  </div>
                  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                      <a href="/" className={`block py-2 px-3 rounded-sm md:p-0 ${currentPath === "/"  ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"  : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" }`}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/explore" className={`block py-2 px-3 rounded-sm md:p-0 ${currentPath === "/explore" ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}`}>
                        Explore
                      </a>
                    </li>
                    <li>
                      <a href="/cart" className={`block py-2 px-3 rounded-sm md:p-0 ${currentPath === "/cart" ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" }`}>
                        Cart
                      </a>
                    </li>
                  </ul>
                </div>
               
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        auth.isAuthenticated == false ? (
                            <div className="items-right justify-between mx-5">
                                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li><a href="/sign-up">Sign up</a></li>
                                    <li><a href="/login">Login</a></li>
                                </ul>
                            </div>
                        ) :
                        ( <>
                        <button
                            onClick={() => setIsOpen(!isOpen)} type="button" className="flex text-sm bg-white rounded-full md:me-0 w-10 p-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isOpen}>
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                              src={auth.profile_image ? `http://localhost:8000/myapp${auth.profile_image}` : profile}
                              alt="User avatar"
                            />
                          </button>
                          
                          {isOpen && (
                            // <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown"></div>
                            <div className="z-50 my-4 lg:my-[-14rem] mt-[14rem] lg:mt-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 lg:right-[15rem]" id="user-dropdown">
                              <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{auth.username}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{auth.email}</span>
                              </div>
                              <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                  <a href="/edit-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Edit Profile
                                  </a>
                                </li>
                                <li>
                                  <button onClick={handleLogout} className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Sign out
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}


                          
                          
                          {/* <button
                            onClick={() => setIsOpen(!isOpen)}
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isOpen}
                          >
                            <span className="sr-only">Open main menu</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 17 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                              />
                            </svg>
                          </button> */}
                          </>
                        )
                    }
                
                 </div>
            
            </div>
           
            </nav>

        </>
    )
}

export default Navbar;