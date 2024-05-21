import React from 'react'; 
import Menu from './Menu/Menu'; 
import Content from './Content/Content';

const Index = () => { 
    return ( 
        <div className='flex h-[100vh]'> 
            <Menu /> 
            <Content /> 
        </div> 
    ) 
} 

export default Index; 