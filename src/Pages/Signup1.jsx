import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import Loader from '../components/Loader';
import { IoIosArrowRoundBack } from "react-icons/io";

function Signup1(){

    const [loader,setloader]=useState(false);

    const {name,setname,email,setemail,otp,setotp}=useContext(AppContext);

    const navigate=useNavigate();

    function nameHandler(e){
        console.log(name);
        setname(e.target.value);
    }

    function emailHandler(e){
        console.log(email);
        setemail(e.target.value);
    }

    async function submitHandler() {
        setloader(true);
        try {
            if (name && email) {
                const url = process.env.REACT_APP_API_URL;
                const response = await fetch(`${url}/sendotp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email
                    }),
                    credentials: 'include' // Include cookies with the request
                });
    
    
                const data = await response.json(); // Parse the JSON response
    
                // console.log(data);
    
                if (data.success) {
                    setotp(data.otp); // Update state with OTP
                    navigate('/signup2'); // Navigate to the next page
                } else {
                    toast.error(data.message); // Show error message
                }
            } else {
                toast.error("All fields are required");
            }
        } catch (e) {
            console.error(e); // Handle errors
            toast.error("An error occurred while sending OTP");
        }
        setloader(false);
    }
    
    function back(){
        navigate('/')
    }




    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-50 text-blue-950 overflow-x-hidden overflow-y-hidden">

            <div className="flex items-center justify-center lg:justify-between max-w-[1200px] w-[80%]">
                <div  className="flex justify-center flex-col gap-y-7 p-2">
                <h1 className="text-4xl font-medium text-black">Step-1</h1>

                <div>
                <p className="font-semibold text-xl">Name</p>
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type="text" 
                value={name}
                onChange={nameHandler}
                autofocus/>
                </div>

                <div>
                <p className="font-semibold text-xl">Email</p>
                <input  className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type="email"
                value={email}
                onChange={emailHandler} />
                </div>

                <button  className="bg-green-700 w-full text-white font-bold text-xl p-3 rounded-lg hover:bg-green-600 transition duration-200" onClick={submitHandler}>
                    Send OTP
                </button>

                </div>

                <img src="/signin1.png" alt="" className="w-[600px] hidden lg:block "/>
            </div>

        {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50 overflow-x-hidden overflow-y-hidden"><Loader/></div>}

        <IoIosArrowRoundBack className="fixed top-5 left-5 text-6xl cursor-pointer"onClick={back}/>

        </div>

    )
}

export default Signup1;