import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import {toast} from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function Signup3(){

    const {name,email}=useContext(AppContext);
    
    const [pass,setpass]=useState('');
    const [cpass,setcpass]=useState('');

    const [eye1,seteye1]=useState(false);
    const [eye2,seteye2]=useState(false);

    const navigate=useNavigate();

    function passhandler(e){
        setpass(e.target.value);
    }
    function cpasshandler(e){
        setcpass(e.target.value);
    }

    async function creatAccount(){
        if(!pass || !cpass){
            toast.error("All fields are required")
        }
        else if(pass===cpass){
            try{
                const url = process.env.REACT_APP_API_URL;
                const response = await axios({
                    url: `${url}/signup`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        name:name,
                        email:email,
                        password:pass
                    },
                    withCredentials: true 
                });
    
                console.log(response);
    
                if(response.data.success){
                    toast.success("Account Created Successfully")
                    navigate('/')
                }
                else{
                    toast.error("Server issue during account creation")
                }
            }
            catch(e){
                toast.error("Something went wrong ! please follow the steps carefully")
                console.log("leo" , e.message);
            }
        }
        else{
            toast.error("Password and Confirm password not matching")
        }
    }

    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-50 text-blue-950">
        <div className="flex items-center justify-center lg:justify-between max-w-[1200px] w-[80%]">
    
            <div className="flex justify-center flex-col gap-y-7 p-2">
                <h1 className="text-4xl font-medium text-black">Set Password</h1>

                <div>
                <p className="font-semibold text-xl">Password</p>
                <div className="flex justify-center items-center gap-x-2">
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type= {eye1 ? "text" : "password"}
                value={pass}
                onChange={passhandler} />

                {eye1?<IoEyeOutline className="text-2xl cursor-pointer" onClick={()=>seteye1(!eye1)}/> : <IoEyeOffOutline className="text-2xl cursor-pointer" onClick={()=>seteye1(!eye1)}/>}
                </div>
                </div>

                <div>
                <p className="font-semibold text-xl">Confirm Password</p>
                <div className="flex justify-center items-center gap-x-2">
                <input className="bg-gray-200 p-2 rounded-md outline-none text-lg"
                type= {eye2 ? "text" : "password"}
                value={cpass}
                onChange={cpasshandler} />

                {eye2?<IoEyeOutline className="text-2xl cursor-pointer" onClick={()=>seteye2(!eye2)}/> : <IoEyeOffOutline className="text-2xl cursor-pointer" onClick={()=>seteye2(!eye2)}/>}
                </div>
                </div>

                <button className="bg-green-700 w-full text-white font-bold text-xl p-3 rounded-lg hover:bg-green-600 transition duration-200" onClick={creatAccount}>
                    Create account
                </button>

            </div>

            <img src="/pass.png" alt="" className="w-[500px] hidden lg:block "/>
        </div>
    </div>
    )
}

export default Signup3;