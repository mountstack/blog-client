import axios from 'axios'; 
import config from '../../config/index'; 

export function getAllArticles() {
    return function (dispatch) { 
        axios.get(`${config.baseUrl}/api/post`) 
            .then(res => { 
                dispatch({
                    type: 'GET_ALL_ARTICLES', 
                    payload: res.data.posts
                }) 
            })
            .catch(err => console.log(err))
    } 
} 

export function getOnlyMyArticles() {
    return function (dispatch) { 
        axios.get(`${config.baseUrl}/api/post/my-posts`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }) 
            .then(res => { 
                dispatch({
                    type: 'GET_ONLY_MY_ARTICLES', 
                    payload: res.data.posts
                }) 
            })
            .catch(err => console.log(err))
    } 
} 

