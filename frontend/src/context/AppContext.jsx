import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { data } from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currencySymbol='$'

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])

    const value={
        doctors,
        currencySymbol 
    }
    const getDoctorData= async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/admin/list')
            if(data.success){
                setDoctors(data.doctors)

            }else{
                
               toast.error(data.message)
        
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        
        }
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDoctorData()
    },[])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
        )
}

export default AppContextProvider