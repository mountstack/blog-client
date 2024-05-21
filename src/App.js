import { useState, useEffect } from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2'; 
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/Navbar/Index';
import Home from './components/Home/Index.js';
import Signup from './components/auth/Signup.jsx';
import Signin from './components/auth/Signin.jsx';
import Menu from './components/Dashboard/Menu/Menu';
import Profile from './components/Dashboard/Profile/Profile.js';
import Category from './components/Dashboard/Category/Category.jsx';
import CategoryForm from './components/Dashboard/Category/CategoryForm.jsx';
import Article from './components/Dashboard/Article/Article.jsx';
import ArticleForm from './components/Dashboard/Article/ArticleForm.jsx';

function App() { 
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  let token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const location = useLocation();

  useEffect(() => {
    token = localStorage.getItem('token');
    if (token) { 
      console.log('login user: ' + token);
      axios.defaults.headers.common['Authorization'] = token;
    }
    else {
      axios.defaults.headers.common['Authorization'] = "";
    }
  }, [loggedIn])

  useEffect(() => {
    // Calculate the height as 100vh - 100px
    const height = window.innerHeight - 150;
    setScrollbarHeight(height);

    // Handle window resize
    const handleResize = () => {
      const newHeight = window.innerHeight - 150;
      setScrollbarHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dashboard = location.pathname.split('/')[1];
  if (dashboard === 'dashboard') {
    return (
      <div className='flex h-[100vh]'> 
        <Menu />

        <div className='flex flex-1 flex-col'>
          <div className='min-h-[80px] h-[80px] bg-slate-300 p-4'> 
            This is top menu
          </div>
          <div className='bg-slate-950/10 flex flex-1'>
            <div className='m-2 p-4 flex-1 rounded-md border border-gray-400/70 bg-white'>
              <Scrollbars autoHide style={{ height: scrollbarHeight }}> 
              <Routes>
                <Route path='/dashboard/category' element={<Category />} />
                <Route path='/dashboard/category/create' element={<CategoryForm />} />
                <Route path='/dashboard/category/:id' element={<CategoryForm />} /> 

                <Route path='/dashboard/article' element={<Article />} /> 
                <Route path='/dashboard/article/create' element={<ArticleForm />} />
                <Route path='/dashboard/article/:id' element={<ArticleForm />} /> 

                <Route path='/dashboard/profile' element={<Profile />} />
              </Routes> 
              </Scrollbars> 
            </div> 
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar token={token} setLoggedIn={setLoggedIn} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/signup'
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path='/signin'
          element={!token ? <Signin setLoggedIn={setLoggedIn} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  )
}

export default App; 