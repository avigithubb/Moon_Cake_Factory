import React, {useContext, useState, createContext, useEffect} from "react";
import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";


const cookies = new Cookies();
const mycsrf = cookies.get("csrftoken");
console.log(mycsrf);


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : {
          isAuthenticated: false,
          username: null,
          password: null,
          userId: null,
          email: null,
          profile_image: null,
          phone: null,
        };
  });

  // const navigateTo = useNavigate();
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () =>{
    fetch("/myapp/session/", {
        credentials: "same-origin"
    })
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        if(data.isAuthenticated){
            setAuth(prevValues => ({
              ...prevValues,
              isAuthenticated: true
            })
            )
        }else{
            setAuth({isAuthenticated: false})
        }
    })
    .catch((e)=>{
        console.log(e);
    })
  }

  const isResponseOk = (response) =>{
      if (response.status >= 200 && response.status <= 299){
          return response.json();
      }
      else {
          throw Error(response.statusText);
      }
  }

  const whoami = () =>{
    fetch("/myapp/whoami/", {
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(res=> res.json())
    .then(data => {
        console.log("You're logged in as: " + data.username)
    })
    .catch((e)=>{
        console.log(e);
    })
  }

  const logIn = (username, password) =>{
    fetch("/myapp/log-me-in/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken")
        },
        credentials: "same-origin",  // <- this is important!
        body: JSON.stringify({username: username, password: password}),
    })
    .then((res) => res.json())
    .then(resData=>{
    console.log(resData.pnone_no);
    setAuth({isAuthenticated: true, username: username, password: password, userId: resData.userId, email: resData.email, profile_image: resData.profile_pic, phone: resData.phone_no});
    })
    .catch((e)=>{
        console.log(e)
        // set({error: "Wrong username or password"})
    })
  }

  const logOut = (navigate) =>{
    fetch("/myapp/logout/", {
        credentials: "same-origin",
    })
    .then(isResponseOk)
    .then(data=>{
        console.log(data);
        setAuth({isAuthenticated: false, username: null, password: null, userId: null, email: null, profile_image: null, phone: null})
        // navigateTo("/")
        if (navigate) navigate("/login");
    })
    .catch((e)=>{
        console.log(e);
    })
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login: logIn, logout: logOut, whoami: whoami}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);