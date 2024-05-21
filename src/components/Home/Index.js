import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastMessageNotify from '../../utills/Toast'; 

import { useSelector, useDispatch } from 'react-redux'
import { getAllArticles } from '../../store/actions/articleAction'

const Index = () => { 
    const dispatch = useDispatch(); 
    const posts = useSelector(state => state.posts?.allPost)
    const lastLocationSignIn = useLocation()?.state?.signin; 
    const [prevPage, setPrevPage] = useState({
        signin: lastLocationSignIn, 
        toastDone: false 
    }) 


    useEffect(() => { 
        if(prevPage.signin && !prevPage.done) { 
            toast('Welcome!', {type: 'success'}); 
            setPrevPage({...prevPage, toastDone: true});
        } 
    }, []) 

    useEffect(function() { 
        dispatch(getAllArticles()); 
    }, []) 

    return ( 
        <div className='text-3xl'>
            This is our blogging application 

            <ToastMessageNotify /> 
        </div>
    )
}

export default Index; 