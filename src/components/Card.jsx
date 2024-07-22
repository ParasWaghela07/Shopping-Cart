// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { BiSolidTrashAlt } from "react-icons/bi";
// import {toast} from "react-hot-toast";
// import Loader from '../components/Loader';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// function Card({item,setLoading}){
//     const{cartData,setcartData}=useContext(AppContext);
//     const [loader,setloader]=useState(false);
//     const navigate=useNavigate();

//     async function fetchcartitems(){
//         setLoading(true);
//         try{
//             const url = process.env.REACT_APP_API_URL;
//             const response = await fetch(`${url}/getUserItems`, {
//                 method:"GET",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 credentials: 'include'
//             });
//             const res=await response.json();
//             console.log("IN HOME fetchcartitems- " , res);
//             if(res.message=="User Not Found") {
//                 navigate('/')
//             }
//             setcartData(res.data);

//         }
//         catch(e){
//             console.log(e.message);
//         }
//         setLoading(false);
//     }

//     async function removeHandler(){

//         // toast.error("Item Removed From Cart!")
//         setloader(true);
//         try{
//             const url = process.env.REACT_APP_API_URL;
//             const response = await fetch(`${url}/removeItem`, {
//                 method:"POST",
//                 headers:{
//                     'Content-Type': 'application/json'
//                 },
//                 credentials:'include',
//                 body:JSON.stringify(item)
//             })

//             const res=await response.json();

//             if(res.success){
//                 fetchcartitems();
//             }
//             setloader(false);
//             toast.error("Item removed from cart")
//         }
//         catch(e){
//             console.log(e.message);
//         }
//     }
//     return(
//         item && 
//         <div className="flex flex-col mb-10 w-[100%] gap-y-7">

//         <div className="flex flex-col gap-y-5 items-center md:flex-row">
//             <div className="w-[25%] h-[100%]">
//             <img src={item?.image} className="w-full h-full object-cover"/>
//             </div>
//             <div className="flex flex-col gap-y-5 px-5 w-[70%]">
//             <h2 className="text-[#0f172a] font-bold text-md">{item?.title}</h2>
//             <p className="font-semibold text-gray-600">{item?.description.split(" ").slice(0,15).join(" ") + "...."}</p>

//             <div className="flex justify-between">
//                 <p className="text-green-600 font-extrabold">${item?.price.toFixed(2)}</p>
//                 <button onClick={removeHandler} className="bg-red-200 rounded-full p-2">
//                 <BiSolidTrashAlt className="text-red-800"/>
//                 </button>
//             </div>
//             </div>
//         </div>

//         <div className="w-full h-1 bg-gray-400"></div>
//         {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader/></div>}

//     </div>
//     )
// }

// export default Card;

import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { BiSolidTrashAlt } from "react-icons/bi";
import { toast } from "react-hot-toast";
import Loader from '../components/Loader';
import { useNavigate } from "react-router-dom";

function Card({ item, setLoading ,amount,setamount}) {
    const { cartData, setcartData } = useContext(AppContext);
    const [loader, setloader] = useState(false);
    const navigate = useNavigate();

    async function fetchcartitems(){
        setLoading(true);
        try{
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/getUserItems`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: 'include'
            });
            const res=await response.json();
            console.log("IN HOME fetchcartitems- " , res);
            if(res.message=="User Not Found") {
                navigate('/')
            }
            setcartData(res.data);
        }
        catch(e){
            console.log(e.message);
        }
        setLoading(false);
    }

    async function removeHandler() {
        setloader(true);
        try {
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/removeItem`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(item)
            });

            const res = await response.json();

            if (res.success) {
                fetchcartitems();
                const updatedAmount=amount-item.price.toFixed(2);
                setamount(updatedAmount);
                toast.success("Item removed from cart");
            }
            setloader(false);
        } catch (e) {
            console.log(e.message);
            toast.error("Error removing item");
        }
        setloader(false);
    }

    // Default values for item properties
    const imageSrc = item?.image || 'default-image.png';
    const title = item?.title || 'No Title';
    const description = item?.description
        ? item.description.split(" ").slice(0, 15).join(" ") + "..."
        : 'No Description';
    const price = item?.price?.toFixed(2) || '0.00';

    return (
        <div className="flex flex-col mb-10 w-[100%] gap-y-7">
            <div className="flex flex-col gap-y-5 items-center md:flex-row">
                <div className="w-[25%] h-[100%]">
                    <img src={imageSrc} className="w-full h-full object-cover" alt={title} />
                </div>
                <div className="flex flex-col gap-y-5 px-5 w-[70%]">
                    <h2 className="text-[#0f172a] font-bold text-md">{title}</h2>
                    <p className="font-semibold text-gray-600">{description}</p>
                    <div className="flex justify-between">
                        <p className="text-green-600 font-extrabold">${price}</p>
                        <button onClick={removeHandler} className="bg-red-200 rounded-full p-2">
                            <BiSolidTrashAlt className="text-red-800" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-1 bg-gray-400"></div>
            {loader && <div className="fixed top-0 right-0 left-0 flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader /></div>}
        </div>
    );
}

export default Card;
