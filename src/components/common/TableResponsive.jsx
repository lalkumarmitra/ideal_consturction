import React from 'react'
import SimpleBar from "simplebar-react";
import { useTable } from "react-table";

export const TableResponsive = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups,  rows,  prepareRow } = useTable({ columns, data });
    if(data.length)
    return (
        <>
            <div className="d-none d-lg-block">
                <table {...getTableProps()} className="table table-bordered dt-responsive nowrap table-striped align-middle" style={{ width: "100%" }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, index) => (
                                    <th {...column.getHeaderProps()}className={columns[index].HeaderClass} >{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell, i) => {
                                        return <td {...cell.getCellProps()} className={columns[i].DataClass}>{cell.render('Cell')}</td>;
                                    })} 
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div >
            <div className="d-lg-none">
                <div id="user_list_lst_container">
                    <div className="row mb-3">
                        <div className="col">
                            <div>
                                <input
                                    className="search form-control"
                                    id="tableAsListSearchInput"
                                    placeholder="Type to Search"
                                />
                            </div>
                        </div>
                    </div>
                    <SimpleBar style={{ height: "calc(100vh - 376px)" }}>
                        <ul className="list list-group list-group-flush mb-0" id="table_as_list">
                            {data.map((row,id)=>{
                                const list_obj = columns.filter(d=>d.Header==='List')
                                return (list_obj.length)? (<li key={id} className="list-group-item ">{list_obj[0].list(row)}</li>):'invalid list data';
                            })}
                        </ul>
                    </SimpleBar>
                </div>
            </div>
        </>
    )
    return (
        <div className='d-flex align-items-center justify-content-center p-5'>
            <h2>No Data Found</h2>
        </div>
    )
}
