import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({setShowLogin}) => {
  const {setToken,token,url} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Login")
    const [data,setData] = useState({
      name: "",
      email: "",
      password:""
    })


    const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value 
      setData(data => ({...data, [name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault(); // Prevent default form submission
    
      try {
        const endpoint = currentState === "Login" ? "https://fullstack-app-4a4f.onrender.com/api/user/login" : "https://fullstack-app-4a4f.onrender.com/api/user/register";
        const response = await axios.post(endpoint, data);
    
        if (response.data.success) {
          setToken(response.data.token);
          alert("Successful Login");
          localStorage.setItem("token", response.data.token); // Consider using cookies instead
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Login error:", error);
      }
    };
    
  return (
    <div className='login-popup'>
       <form className='login-popup-container' onSubmit={onLogin}>
        <div className='login-popup-title'>
            <h2> {currentState} </h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt=""/> 
        </div>
        <div className='login-popup-inputs'>
            {currentState === "Login" ? <></> :  <input onChange={onChangeHandler} name="name" value={data.name} type="text" placeholder="Your Name" required /> } 
            <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Your Email" required />
            <input onChange={onChangeHandler} name="password" value={data.value} type="password" placeholder="Password" required />
          </div>
          <button> {currentState === "Sign Up" ? "Create account" : "Login"} </button>
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p> By continuing, i agree to the terms of use & Privacy Policy.</p>
          </div>
          {currentState === "Login" ? <p> create a new account? <span onClick={()=> setCurrentState("Sign up")}> Click Here </span></p> :    <p> Already have an Account ? <span onClick={() => setCurrentState("Login")}> Login here </span></p>}
          
       
       </form>
    </div>
  )
}

export default LoginPopup
