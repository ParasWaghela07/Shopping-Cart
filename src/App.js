import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Auth from "./Pages/Auth";
import Login from "./Pages/Login";
import Signup1 from "./Pages/Signup1";
import Signup2 from "./Pages/Signup2";
import Signup3 from "./Pages/Signup3";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate=useNavigate();

  async function checkCookie() {
    try {
      const url = process.env.REACT_APP_API_URL;
      const response = await fetch(`${url}/checkUserCookie`, {
            method: 'GET', // Use 'GET' as the request method
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is JSON
            },
            credentials: 'include' // Include cookies with the request
        });

        const data = await response.json(); // Parse the JSON response

        // console.log(data);

        if (data.success) {
            navigate('/Home'); // Navigate to the result page
        }
    } catch (e) {
        console.log(e.message); // Handle errors
    }
}


  useEffect(()=>{
    checkCookie();
  },[])
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/signup1" element={<Signup1/>}/>
        <Route path="/signup2" element={<Signup2/>}/>
        <Route path="/signup3" element={<Signup3/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
