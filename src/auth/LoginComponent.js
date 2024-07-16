import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { useEffect } from "react";

export function LoginComponent(){
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/pages') 
        }
    }, [])
    return <div> Login</div>
}