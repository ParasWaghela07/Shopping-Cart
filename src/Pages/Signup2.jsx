import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

function Signup2(){
    const [userOtp,setuserotp]=useState('');
    const {name,email}=useContext(AppContext);

    const {otp}=useContext(AppContext);

    const navigate=useNavigate();

    function checkInvalid(){
        if(!name || !email){
            navigate('/');
        }
    }

    function verifyOtp(){
        if(!otp){
            toast.error("Something went wrong ! please follow the steps carefully")
        }
        else if(otp==userOtp){
            toast.success("Otp verified !")
            navigate('/signup3');
        }
        else{
            toast.error("Invalid Otp")
        }
    }

    function userOtpHandler(e){
        setuserotp(e.target.value);
    }
    function back(){
        navigate('/signup1')
    }

    useEffect(()=>{
        checkInvalid();
    },[])

    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-50 text-blue-950 overflow-x-hidden overflow-y-hidden">

            <div className="flex items-center justify-center lg:justify-between max-w-[1200px] w-[80%]">
                <div  className="flex justify-center flex-col gap-y-7 p-2">
                <h1 className="text-4xl font-medium text-black">Step-2</h1>

                <div className="flex items-center gap-x-2">
                <p className="font-semibold text-xl">OTP :- </p>
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type="text" 
                value={userOtp}
                onChange={userOtpHandler} />
                </div>

                <button  className="bg-green-700 w-full text-white font-bold text-xl p-3 rounded-lg hover:bg-green-600 transition duration-200" onClick={verifyOtp}>
                    Verify OTP
                </button>

                </div>

                <img src="/otp.png" alt="" className="w-[500px] hidden lg:block "/>
            </div>

            <IoIosArrowRoundBack className="fixed top-5 left-5 text-6xl cursor-pointer"onClick={back}/>

        </div>

    )
}

export default Signup2;