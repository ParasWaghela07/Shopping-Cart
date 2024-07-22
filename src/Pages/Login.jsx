import {useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import React from "react";
import Loader from '../components/Loader';
import { IoIosArrowRoundBack } from "react-icons/io";


function Login(){
    const navigate=useNavigate();
    const [loginEmail,setloginEmail]=useState('')
    const [lpass,setlpass]=useState('');
    const [loader,setloader]=useState(false);

    const [eye,seteye]=useState(false);

    function loginEmailHandler(e){
        setloginEmail(e.target.value);
    }

    function lpassHandler(e){
        setlpass(e.target.value);
    }    
    
    function back(){
        navigate('/')
    }





    async function submitHandler() {
        setloader(true);
        try {
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: lpass
                }),
                credentials: "include" // Ensure cookies are sent with the request
            });
    
            const data = await response.json(); // Parse the JSON response
    
            // console.log(data);
    
            if (data.success) {
                toast.success("You’ve Logged In Successfully!")
                navigate('/Home');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while processing the request.");
        }
        setloader(false);
    }
    
return(
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-50 text-blue-950 overflow-x-hidden overflow-y-hidden">
        <div className="flex items-center justify-center lg:justify-between max-w-[1200px] w-[80%]">
    
            <div className="flex justify-center flex-col gap-y-7 p-2">
                <h1 className="text-4xl font-medium text-black">Welcome back !</h1>

                <div>
                <p className="font-semibold text-xl">Email Address</p>
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type="email" 
                value={loginEmail}
                onChange={loginEmailHandler}
                />
                </div>

                <div>
                <p className="font-semibold text-xl">Password</p>
                <div className="flex justify-center items-center gap-x-2">
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type= {eye ? "text" : "password"}
                value={lpass}
                onChange={lpassHandler} />

                {eye?<IoEyeOutline className="text-2xl" onClick={()=>seteye(!eye)}/> : <IoEyeOffOutline className="text-2xl"   onClick={()=>seteye(!eye)}/>}
                </div>
                </div>

                <button className="bg-green-700 w-full text-white font-bold text-xl p-3 rounded-lg hover:bg-green-600 transition duration-200" onClick={submitHandler}>
                    Log In
                </button>

            </div>

            <img src="/login.png" alt="" className="w-[600px] hidden lg:block "/>
            {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50 overflow-x-hidden overflow-y-hidden"><Loader/></div>}

            <IoIosArrowRoundBack className="fixed top-5 left-5 text-6xl cursor-pointer"onClick={back}/>
        </div>
    </div>
)
}


export default Login;

