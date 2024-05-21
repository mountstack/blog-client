import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    ChevronsRight, ChevronsLeft,
    UsersRound, Layers3, Proportions
} from 'lucide-react';
import './menu.css';

const Menu = () => {
    const menus = [
        { name: 'Profile', Icon: UsersRound, link: '/dashboard/profile' },
        { name: 'Category', Icon: Layers3, link: '/dashboard/category' },
        { name: 'Articles', Icon: Proportions, link: '/dashboard/article' }
    ]

    const [fullMenu, setFullMenu] = useState(true);
    return (
        <div className={` ${fullMenu ? 'w-[270px]' : 'w-[80px]'} flex flex-col transition-all ease-in-out duration-300 ${fullMenu ? 'min-w-[250px]' : 'min-w-[70px]'}`}>
            <div className='flex-1 bg-slate-900'>
                <h1 className='text-3xl text-gray-200 p-4 transition-all delay-300 duration-700'>
                    {fullMenu ? 'Mount Stack' : 'MS'}
                </h1>

                <ul>
                    {
                        menus.map(menu => (
                            <li key={menu.name}>
                                <NavLink
                                    to={menu.link}
                                    className="hover-menu flex items-center gap-3 px-4 py-[10px] border-s-[4px] border-transparent relative group"> 
                                    <menu.Icon 
                                        className='icon transition-all duration-300'
                                        size={fullMenu ? "24" : "28"} />
                                    { 
                                        !fullMenu && // tooltip 
                                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-sm rounded py-1 px-3"> 
                                            {menu.name} 
                                        </div> 
                                    } 
                                    { 
                                        fullMenu &&
                                        <span className='text-[20px] duration-300 animate-in fade-in'>
                                            {menu.name}
                                        </span>
                                    }
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div
                onClick={() => setFullMenu(!fullMenu)}
                className='h-[50px] bg-gradient-to-b from-slate-700 to-slate-800 text-white flex justify-center items-center cursor-pointer hover:to-slate-900 transition-all duration-300'>
                {fullMenu && <ChevronsLeft size={24} />}
                {!fullMenu && <ChevronsRight size={24} />}
            </div>
        </div>
    )
}

export default Menu; 