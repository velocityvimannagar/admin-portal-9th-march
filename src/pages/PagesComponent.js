import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { useEffect } from "react";

export function PagesComponent(){
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    console.log(isAuthenticated)
    useEffect(()=>{
        // console.log('Navigate back')
        // if(!isAuthenticated){
        //     navigate('/login') 
        // }
    }, [])
   
    return <div>
        dfdfs
        asfsd
        sdf
    </div>
}