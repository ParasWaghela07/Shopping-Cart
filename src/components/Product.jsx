import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import Loader from '../components/Loader';


function Product({item,fetchcartitems}){

    const{cartData,setcartData}=useContext(AppContext);
    const [loader,setloader]=useState(false);

    async function removeHandler(){

        // toast.error("Item Removed From Cart!")
        setloader(true);
        try{
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/removeItem`, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body:JSON.stringify(item)
            })

            const res=await response.json();

            if(res.success){
                // fetchcartitems();
                let newArray=[];
                for(let i=0;i<cartData.length;i++){
                    let currObj=cartData[i];
                    if(currObj.id!=item.id){
                        newArray.push(currObj);
                    }
                }
        
                setcartData(newArray);
            }
            setloader(false);
            toast.error("Item removed from cart")
        }
        catch(e){
            console.log(e.message);
        }
    }

    async function addHandler(){

        // console.log(typeof(item.id));
        // console.log(Object.keys(item).length);
        // console.log(item.image)

        // console.log("kya scene :-",typeof cartData , cartData);
        setloader(true);
        try{
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/addItem`, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body:JSON.stringify(item)
            })

            const res=await response.json();

            if(res.success){
                // fetchcartitems();
                let newArray=[...cartData];
                newArray.push(item);
                setcartData(newArray);
            }
            setloader(false);
            toast.success("Item added to cart")
        }
        catch(e){
            console.log(e.message);
        }
    }

    return(
        <div className="flex flex-col items-center justify-between transition duration-300 ease-in gap-3 px-3 py-4 mt-10 rounded-xl border border-slate-300 hover:shadow-2xl hover:border-slate-900 relative">
            <h2 className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{item.title}</h2>
            <p className="w-40 text-gray-500 font-normal text-[12px] text-left">{item.description.split(" ").slice(0,10).join(" ") + "..."}</p>
            <div className="h-[180px]">
                <img src={item.image} className="h-full w-full"/>
            </div>
            <div className="flex justify-between gap-12 items-center w-full mt-5">
                <p className="text-green-600 font-semibold">${item.price}</p>
                    {
                        cartData.some((i) => i.id == item.id) ? (
                            <button onClick={removeHandler} className="bg-white text-gray-700 border-2 border-slate-700 px-2 py-1 rounded-2xl hover:bg-gray-700 hover:text-white font-semibold transition-all duration-200">
                                REMOVE
                            </button>
                        ) :(
                            <button onClick={addHandler}  className="bg-white text-gray-700 border-2 border-slate-700 px-2 py-1 rounded-2xl hover:bg-gray-700 hover:text-white font-semibold transition-all duration-200">
                                ADD
                            </button>
                        )
                    }
            </div>

            {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader/></div>}
        
    </div>
    )
}

export default Product;

