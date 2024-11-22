import React, { useState, Fragment, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTable } from 'react-table';
import { Dialog, Transition } from '@headlessui/react';
import Pagination from './Pagination';
import { Switch } from '@material-tailwind/react';
import SearchBox from './SearchBox';

const ReusableTable = ({ data, totalData, columns = [], editPath, onDelete, onStatusChange, key }) => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();



  const [searchParams] = useSearchParams('page');

  const page = searchParams.get('page') || 1;


  const handleDelete = id => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    // onDelete(deleteId);
    setOpen(false);
  };

  // const handleEdit = id => {
  //   navigate(`${editPath}/${id}`);
  // };


  const tableColumns = useMemo(() => [
    {
      Header: 'Sr. No',
      Cell: ({ row }) => <div>{(page - 1) * 10 + row.index + 1}</div>, // Add custom Sr. No column
    },
    ...columns, // Spread parent-passed columns
    //  {
    //   Header: 'Status',
    //   Cell: ({ row }) => (
    //     <Switch 
    //       checked={row.original.active} 
    //       onChange={() => onStatusChange(row.original._id, row.original.active)}
    //     />
    //   ),
    // },
    // {
    //   Header: 'Actions',
    //   Cell: ({ row }) => (
    //     <div className="flex space-x-2">
    //       <button
    //         onClick={() => handleEdit(row.original._id)}
    //         className="text-blue-500 hover:text-blue-700"
    //       >
    //         Edit
    //       </button>
    //       {/* <button
    //         onClick={() => handleDelete(row.original._id)}
    //         className="text-red-500 hover:text-red-700"
    //       >
    //         Delete
    //       </button> */}
    //     </div>
    //   ),
    // },
  ], []);



  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: tableColumns, data });

  return (
    <div>
      {data && data.length ? (
        <div className='overflow-x-scroll overflow-y-hidden'>
          <table key={key} {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-2 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <Pagination totalItems={totalData} itemsPerPage={10} /> */}
        </div>
      ) : <div className="flex justify-center items-center h-screen">
        <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
      </div>}

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Confirm Delete
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this item?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ReusableTable;