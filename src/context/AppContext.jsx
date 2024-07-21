import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [cartData,setcartData]=useState([{}]);

    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [otp,setotp]=useState('');


    const value={
        cartData,
        setcartData,
        name,
        setname,
        email,
        setemail,
        otp,
        setotp
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}