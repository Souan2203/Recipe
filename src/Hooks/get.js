import axios from "axios";
import { useCallback } from "react";

export default function useGet(){
    const fetchAll = useCallback((apiurl,auth)=>{
        try{
           let response= await axios .get(apiurl,auth)
           return response?.data
        }catch(error){
            console.log(error);
            
        }
    },[])
    return [fetchAll]
}