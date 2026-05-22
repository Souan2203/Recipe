import axios from "axios";
import { useCallback } from "react";

export default function useFetch(){
    const getall=useCallback(async(apiurl)=>{
        try{
           let response = await axios.get(apiurl)
           return response?.data
        }catch(error){
            console.log(error);
            
        }
    },[])
    return [getall]
}