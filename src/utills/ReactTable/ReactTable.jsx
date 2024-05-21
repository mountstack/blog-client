import React, { useState, useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
    useReactTable, getCoreRowModel, flexRender,
    getPaginationRowModel, getSortedRowModel, getFilteredRowModel
} from '@tanstack/react-table';

function ReactTable({ dataSet, columns }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const data = useMemo(() => dataSet);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        }
    }); 

    return ( 
        <div className='py-2'> 
            <Scrollbars autoHide style={{ height: 400 }}> 
                <table 
                    style={{ tableLayout: 'fixed', width: '100%' }}
                    className="divide-y divide-gray-200 border border-x-0 border-y-gray-300">
                    <thead className='sticky top-0 bg-gray-100'>
                        {table.getHeaderGroups().map(headerGroup => ( 
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const title = header.column.columnDef.header;
                                    const canFilter = header.column.columnDef?.canFilter; 
                                    const { size, maxSize} = header.column.columnDef
                                    return (
                                        <th 
                                            key={header.id} 
                                            className={`p-2 text-gray-700 font-[600]
                                                ${size && `w-[${size}px]`} 
                                                ${maxSize && `w-[${maxSize}px]`}`
                                            } 
                                            colSpan={header.colSpan}>
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                                style={{
                                                    textAlign: title === 'Action' ? 'center' : 'start'
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted()] ?? null}
                                                {canFilter && header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => ( 
                            <tr key={row.id} className=" hover:bg-slate-50 hover:text-blue-700 w-full">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-[6px] w-[200px]">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr> 
                        ))} 
                    </tbody> 
                </table> 
            </Scrollbars> 

            <div className="h-3" />

            <div className="flex items-center gap-2 text-gray-800">
                <button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1 text-gray-800">
                    <div>Page</div>
                    <p className=' text-gray-800 font-semibold'>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </p>
                </span>
                <span className="flex items-center gap-1 text-gray-800">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16 border-gray-300"
                    />
                </span> 
                <select 
                    className='border border-gray-300'
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}>
                    {[3, 5, 10, 15, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

function Filter({ column, table }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue(); 

    return typeof firstValue === 'number' ? ( 
        <div 
            className="flex space-x-2" 
            onClick={(e) => e.stopPropagation()}>
            <input
                type="number"
                value={(columnFilterValue ? columnFilterValue[0] : '') ?? ''}
                onChange={(e) =>
                    column.setFilterValue((old) => [e.target.value, e.target.value])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded border-gray-300"
            />
        </div>
    ) : (
        <input
            className="w-36 border shadow rounded pl-3 py-1 my-1 border-gray-300"
            onChange={(e) => column.setFilterValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder={`Search...`}
            type="text"
            value={(columnFilterValue ?? '')}
        />
    );
}

export default ReactTable; 