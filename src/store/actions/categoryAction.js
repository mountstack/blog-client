import axios from 'axios'; 
import config from '../../config/index'; 

export function getAllCategory() {
    return function abc(dispatch) { 
        axios.get(`${config.baseUrl}/api/category`) 
            .then(res => {  
                dispatch({
                    type: 'GET_ALL_CATEGORY', 
                    payload: res.data.categories
                }) 
            })
            .catch(err => console.log(err))
    } 
} 

