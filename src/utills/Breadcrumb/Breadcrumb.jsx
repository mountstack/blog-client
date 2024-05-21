import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { Home, ChevronRight } from 'lucide-react'; 

const Breadcrumb = ({id, name, link, form=false}) => { 
    return ( 
        <nav 
            aria-label="Breadcrumb" 
            className={`flex ${form && 'mt-[5px]'}`}> 
            <ul className="flex items-center gap-1 text-sm text-gray-600"> 
                <Home size="20" color="#f56565" /> 
                <ChevronRight size="20" /> 
                <li> 
                    <Link 
                        to={link}
                        className="block hover:text-gray-700 text-md font-semibold transition-all duration-500 hover:underline underline-offset-4"> 
                        {name} 
                    </Link> 
                </li> 
                { form && <ChevronRight size="20" /> } 
                { form ? id ? 'Update' : 'Create' : "" } 
            </ul> 
        </nav> 
    ) 
} 

export default Breadcrumb; 