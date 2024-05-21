import React from 'react'; 
import ReactTable from './ReactTable'; 

const TableWrapper = ({dataSet, columns}) => { 
    // dataSet = [
    //     ...dataSet, 
    //     ...dataSet, 
    //     ...dataSet, 
    //     ...dataSet, 
    // ] 

    if(dataSet.length === 0) { 
        return ( 
            <div className='h-[200px] bg-red-100 flex justify-center items-center mt-3'>
                <h1 className='text-red-500 text-3xl font-bold'>
                    No Data Found 
                </h1> 
            </div> 
        ) 
    } 
    return ( 
        <ReactTable dataSet={dataSet} columns={columns} /> 
    ) 
} 

export default TableWrapper; 