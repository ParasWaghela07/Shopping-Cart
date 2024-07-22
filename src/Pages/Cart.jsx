import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cartData, setcartData } = useContext(AppContext);
    const [amount, setamount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchcartitems() {
        setLoading(true);
        try {
            const url = process.env.REACT_APP_API_URL;
            const response = await fetch(`${url}/getUserItems`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const res = await response.json();
            // console.log("IN HOME fetchcartitems- ", res);
            
            if (res.message === "User Not Found") {
                navigate('/');
                return; // Exit the function if the user is not found
            }
            
            const data = res.data;
            setcartData(data);
            
            // Calculate amount based on the updated data
            const sum = data.reduce((acc, item) => acc + (item.price || 0), 0);
            setamount(sum.toFixed(2));
            
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false);
    }
    

    useEffect(() => {
        fetchcartitems();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="w-[100vw] h-full mt-[12vh] overflow-x-hidden">
                {
                    loading ? <Spinner /> :
                        cartData?.length > 0 ?
                            (
                                <div className="max-w-[1100px] mt-7 mx-auto flex flex-col md:flex-row gap-x-20 p-5 pb-[150px] md:pb-0">
                                    <div className="w-full md:w-[60%]">
                                        {
                                            cartData?.map((item) => (
                                                <Card key={item.id} item={item} setLoading={setLoading} amount={amount} setamount={setamount} />
                                            ))
                                        }
                                    </div>
                                    <div className="w-full md:w-[40%] md:h-[85%] flex md:flex-col justify-between items-center py-10 px-5 fixed bottom-0 md:top-20 right-0 bg-white">
                                        <div>
                                            <h2 className="font-bold text-green-800 text-lg">YOUR CART</h2>
                                            <h1 className="sm:text-4xl text-2xl text-green-800 font-bold tracking-wide">SUMMARY</h1>
                                            <p className="mt-3 text-gray-800 font-bold">Total Items : {cartData?.length}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-700 font-bold">Total Amount: <span className="text-black font-extrabold">${amount}</span></p>
                                            <button className="bg-green-600 text-white md:w-[100%] p-2 font-bold rounded-md mt-3">Checkout Now</button>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (
                                <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-y-2">
                                    <p className="font-bold text-2xl">No items found</p>
                                    <NavLink to="/Home">
                                        <button className="bg-green-500 px-4 py-2 rounded-md text-white font-bold text-lg">Shop Now</button>
                                    </NavLink>
                                </div>
                            )
                }
            </div>
        </div>
    );
}

export default Cart;
