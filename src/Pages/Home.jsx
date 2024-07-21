import { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Home(){
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(false);
    const{cartData,setcartData}=useContext(AppContext);

    async function fetchcartitems(){
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
            setcartData(res.data);
        }
        catch(e){
            console.log(e.message);
        }
    }

    async function fetchitems(){
        setLoading(true);
        try{
            const respose=await fetch('https://fakestoreapi.com/products');
            const res=await respose.json();
            // console.log(res);
            setItems(res);
        }
        catch(e){
            console.log("Error agya ji");
            setItems([]);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchitems();
        fetchcartitems();
    },[]);

    return(
        <div className="w-[100vw] h-[100vh] overflow-x-hidden">
            <Navbar/>
            <div className="flex justify-center items-center mt-[10vh]">
            {
                loading?<Spinner/>:
                    items?.length>0 ?
                (
                    <div className="grid xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-5 mb-10 space-y-10 gap-x-5 min-h-[80vh]">
                        {
                            items.map((item)=>(
                                    <Product key={item.id} item={item} fetchcartitems={fetchcartitems}/>
                            ))
                        }
                    </div>
                ):
                    <p>NO DATA FOUND</p>
            }
        </div>
        </div>
    );
}

export default Home;