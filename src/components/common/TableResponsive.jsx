import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table';
import { Link } from 'react-router-dom';
import CustomSelect from '../CustomSelect';
import { toHaveAttribute } from '@testing-library/jest-dom/matchers';
import DataLoading from '../DataLoading';

export const TableResponsive = ({isLoading,toHaveAttribute,columns, data, isPagination = true, isShowingPageLength = true, customPageSize = 10, showFilter = true,showCustomOptionPage=true,tableId="", noRecord="No Data Found"}) => {
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, pageOptions, canPreviousPage, previousPage, gotoPage, canNextPage,
        nextPage, state: { pageIndex, pageSize, globalFilter }, setPageSize, setGlobalFilter } = useTable({ columns, data }, useFilters, useGlobalFilter, usePagination);
    React.useEffect(() => { setPageSize(customPageSize); }, [customPageSize, setPageSize]);
    const generatePageButtons = () => {
        const pageButtons = [];
        for (let i = pageIndex; i <= pageIndex + 1; i++) {
            if (i >= 0 && i < pageOptions.length) {
                pageButtons.push(i);
            }
        }
        return pageButtons;
    };
    const onChangeInSelect = event => {
        // console.log(event);
        setPageSize(Number(event.value))
      }
    const [searchQuery, setSearchQuery] = useState('');
    const filteredData = data.filter(row => { return columns.some(column => String(row[column.accessor]).toLowerCase().includes(searchQuery.toLowerCase())); });
    
    if (data.length) {
        return (
            <>
                <div className="d-none d-lg-block">
                    <div className='row mb-3 d-flex justify-content-between'>
                        {showCustomOptionPage && (
                            <div className='col-lg-2'>
                                <CustomSelect options={[
                                    {label:'2',value:2},
                                    {label:'4',value:4},
                                    {label:'8',value:8},
                                    {label:'10',value:10},
                                    {label:'20',value:20},
                                    {label:'30',value:30},
                                    {label:'40',value:40},
                                    {label:'50',value:50},
                                ]} onChange={onChangeInSelect} />
                            {/* <select className="form-select" value={pageSize} onChange={onChangeInSelect}>
                                {[2,4,8,10, 20, 30, 40, 50].map((pageSize,id) => (<option key={id} value={pageSize}>Show {pageSize}</option> ))}
                            </select> */}
                            </div>)
                        }
                        {showFilter && (<div className='col-lg-4'><input type="text" className='form-control' placeholder="Search..." value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} /></div>)}
                    </div>

                    <table id={tableId} {...getTableProps()} className="table table-bordered dt-responsive nowrap table-striped align-middle" style={{ width: '100%' }}>
                        <thead>
                            {headerGroups.map((headerGroup,id) => (<tr  {...headerGroup.getHeaderGroupProps()} key={id}>{headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} className={columns[index].HeaderClass} key={index}>{column.render('Header')} </th>
                            ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={i}>
                                        {row.cells.map((cell, i) => (
                                            <td  {...cell.getCellProps()} className={columns[i].DataClass} key={i}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {isPagination && (
                        <div className="d-flex justify-content-between align-items-center">
                            {isShowingPageLength && (<div className="col-sm">
                                    <div className="text-muted">Showing 
                                        <span className="fw-semibold ms-1">{page.length}</span> of{' '}
                                        <span className="fw-semibold">{data.length}</span> entries
                                    </div>
                                </div>
                            )}
                            <div className="col-sm-12 col-md-7">
                                <ul className="pagination justify-content-end pagination-rounded">
                                    <li className={`page-item ${!canPreviousPage ? 'd-none' : 'd-block'}`}>
                                        <Link to="#" className="page-link" onClick={() => previousPage()}><i className="mdi mdi-skip-previous-circle-outline " /></Link>
                                    </li>
                                    {generatePageButtons().map((item, key) => (
                                        <li key={key} className={`page-item ${pageIndex === item ? 'active' : ''}`}>
                                            <Link to="#" className="page-link" onClick={() => gotoPage(item)}>{item + 1}</Link>
                                        </li>
                                    ))}
                                    <li className={`page-item ${!canNextPage ? 'd-none' : 'd-block'}`}>
                                        <Link to="#" className="page-link " onClick={() => nextPage()}> <i className="mdi mdi-skip-next-circle-outline " /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-lg-none">
                    <div id="user_list_lst_container">
                        <div className='row mb-3'>
                            <div className='col'>
                                <input type="text" className='form-control' placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                        <SimpleBar  className='custom-scrollbar' style={{ height: "calc(100vh - 376px)" }}>
                            <ul className="list list-group list-group-flush mb-0" id="table_as_list">
                                {filteredData.map((row, id) => {
                                    const list_obj = columns.filter(d => d.Header === 'List')
                                    return (list_obj.length) ? (<li key={id} className="list-group-item ">{list_obj[0].list(row)}</li>) : <span key={id}>invalid list data </span>;
                                })}
                            </ul>
                        </SimpleBar>
                    </div>
                </div>
            </>
        );
    }
    return isLoading 
    ? <DataLoading />
    : (<div className="d-flex bg-light bg-opacity-50 rounded align-items-center justify-content-center p-5">
        <h3>{noRecord}</h3>
    </div>);
};
