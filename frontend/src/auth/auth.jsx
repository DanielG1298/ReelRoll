import { API } from "../const.js";
import { createContext, useContext, useState } from "react";

//auth context var
const AuthContext = createContext();

// export for login, register, and details
export default function AuthProvider(){

    const [token, setToken] = useState();

    const register = async (creds) => {
        const response = await fetch("/users",{
            method: "POST",
            headers: { "Content-Type": "application/JSON",
        },  
            body: JSON.stringify({ username, email, password}),
        });
        const result = await response.json();
        console.log(result);
        setToken(result.token);

    };

//login function 
const login = async (creds) => {
    const response = await fetch("/users/login",{
        method: POST,
        headers: { "Content-Type": "application/JSON",
    },
    body: JSON.stringify({ username, password}),
    });
    const result = await response.json();
    console.log(result);
    setToken(result.token);

};

// acc func

const account = async () =>{
    const response = await fetch('/users/me',{
        method: 'GET',
        headers: { "Content-Type": "apllication/json",
            "Authrization": `Bearer ${token}`,
         },
    }
);  const result = await response.json();
    return result;

}
// logout func
const logout = () => setToken(null);


// auth context 
const value = {token, register, login, account, logout };
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




//favorites func

// reviews func

// auth context export 


export function useAuth(){
const context = useContext(AuthContext);
console.log("AuthContext:", context);
return context;
};