import { API } from "../const.js";
import { createContext, useContext, useState } from "react";

//auth context var
const AuthContext = createContext();

// export for login, register, and details
export default function AuthProvider({children}) {
    //token state withb local storage
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const register = async (creds) => {
        const response = await fetch("/users",{
            method: "POST",
            headers: { "Content-Type": "application/json",
        },  
            body: JSON.stringify(creds),
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }
        const result = await response.json();
        console.log(result);
        setToken(result.token);
        localStorage.setItem("token", result.token);

    };

//login function 
const login = async (creds) => {
    const response = await fetch("/users/login",{
        method: "POST",
        headers: { "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    });

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg);
    }
    const result = await response.json();
    console.log(result);
    setToken(result.token);
    localStorage.setItem("token", result.token);

};

// acc func

const account = async () => {
  const response = await fetch("/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();


}
// logout func
const logout = () => setToken(null);
localStorage.removeItem("token");


// auth context 
const value = {token, register, login, account, logout };
return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>

);}




//favorites func

// reviews func

// auth context export 


export function useAuth(){
const context = useContext(AuthContext);
console.log("AuthContext:", context);
return context;
};