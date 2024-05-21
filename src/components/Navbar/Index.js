import React from 'react' 
import { Link, NavLink } from 'react-router-dom'; 
// import { useSelector } from 'react-redux'; 

function Index({token, setLoggedIn}) { 
    // const length = useSelector(state => state.cart.length); 

    return (
        <div className='flex justify-around bg-gray-800 py-4 '>
            <Link to="/"> 
                <h1 className='text-3xl font-bold text-white'> 
                    Blog Application
                </h1> 
            </Link> 

            { 
                token && 
                <div>
                    <Link to="/dashboard"> 
                        <button className='mr-5 bg-green-600 text-white px-10 py-2 rounded-md text-xl'> 
                            Dashboard
                        </button> 
                    </Link> 

                    <button 
                        className='bg-red-700 text-white px-10 py-2 rounded-md text-xl'
                        onClick={() => {
                            localStorage.removeItem('token'); 
                            setLoggedIn(false); 
                        }}> 
                        Logout 
                    </button> 
                </div>
            } 

            { 
                !token && 
                <div>
                    <Link to="/signin"> 
                        <button className='mr-5 bg-green-600 text-white px-10 py-2 rounded-md text-xl'> 
                            Signin
                        </button> 
                    </Link> 
                    <Link to="/signup"> 
                        <button className='bg-green-600 text-white px-10 py-2 rounded-md text-xl'> 
                            Signup 
                        </button> 
                    </Link> 
                </div>
            }
        </div> 
    ) 
} 

export default Index; 