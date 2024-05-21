import { useState } from 'react'; 
import axios from "axios"; 
import { toast } from 'react-toastify';
import config from '../config/index'; 

function useApiRequest() { 
    const [pending, setPending] = useState(false); 

    async function callTheAPI(apiEndPoint, data = {}) { 
        setPending(true); 
        const api = config.baseUrl + apiEndPoint; 

        let response; 
        try { 
            response = await axios.post(api, data); 
            toast(response?.data?.message, {type: 'success'}); 
        } 
        catch (error) { 
            toast(error.message, {type: 'error'}); 
        } 
        
        setPending(false); 
        if(!response) return; 

        return { 
            response: response.data 
        } 
    } 

    return {
        callTheAPI, 
        pending 
    }

}

export default useApiRequest; 