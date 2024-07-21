import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";



function Navbar(){
    const{cartData,setcartData}=useContext(AppContext);

    const navigate=useNavigate();

    async function logout(){
        try{
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/logout`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const data=await response.json();

            if(data.success){
                toast.success("Logged Out")
                navigate('/');
            }
            else{
                toast.error("Errors while logging out")
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="w-[100vw] h-[10vh] bg-[#0f172a] px-4 fixed top-0 z-40">
            <div className="max-w-[1200px]  mx-auto h-full flex justify-between items-center relative">
                
                <NavLink to="/Home">
                <img src="../logo.png" className="hidden sm:block w-[170px] h-[50px]"/>
                </NavLink>

                <button className="bg-red-500 text-white font-bold p-1 px-2 rounded-md al -order-1" onClick={logout}>LOG OUT</button>
                
                <div className="flex items-center gap-x-3 text-xl sm:-order-first">
                <NavLink to="/Home">
                 <p className="text-white">Home</p>
                 </NavLink>

                 {
                    <NavLink to="/cart">
                    <MdOutlineShoppingCart className="text-white text-3xl relative"/>
                    {
                       cartData.length>0 &&
                       <div className="text-white bg-orange-400 rounded-full w-[18px] h-[18px] flex justify-center items-center text-[12px] absolute -right-1 top-3 2xl:top-5 animate-bounce">{cartData.length}</div>
                    }
                    </NavLink>
                 }

                 
                    
                </div>

            </div>
        </div>
    )
}

export default Navbar;