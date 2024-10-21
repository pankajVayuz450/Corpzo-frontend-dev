import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Modal from 'react-modal';
import DeleteModal from '@/components/admin/DeleteModal';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, columns }) => {
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    isOpen: false,
    actionType: '',
    details: {}
  });
  const { title } = useSelector((state) => state.data);
console.log(data);
  const openModal = (actionType, details) => {
    setModalData({ isOpen: true, actionType, details });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, actionType: '', details: {} });
  };

  const getDetails = (row, title) => {
    switch (title) {
      case 'Elements':
        return { title: row.typeName, id: row._id ,parentElementId:row.parentElementId,hasChildElements:row.hasChildElements,isSelfClosed:row.isSelfClosed};
      case 'SubTypes':
        return { title: row.subtypeName, id: row._id };
      case 'Attributes':
        return { title: row.attributeName, id: row._id };
      case 'Valid Form Element':
        return { title: row.element, id: row._id };
      case 'Valid Form Element Types':
        return { title: row.elementType, id: row._id };
      case 'Valid Form Element Attributes':
        return { title: row.attribute, id: row._id };
      default:
        return {};
    }
  };

  const handleEdit = (row) => {
    const details = getDetails(row, title);
    navigate('/dashboard/masterSettings/admin/dropdowndetailPage/editItem', { state: { title, ...details } });
  };

  const handleDelete = (row) => {
    const details = getDetails(row, title);
    openModal('delete', details);
  };


  const columnsWithCustomRender = useMemo(
    () =>
      columns.map((column) => {
        if (column.accessor === 'createdAt' || column.accessor === 'updatedAt') {
          return {
            ...column,
            Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
          };
        }
        return column;
      }),
    [columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns: columnsWithCustomRender, data });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
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
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
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
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(row.original)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.original)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={modalData.isOpen}
        onRequestClose={closeModal}
        contentLabel={modalData.actionType === 'edit' ? 'Edit Item' : 'Delete Item'}
      >
        {modalData.actionType === 'delete' && <DeleteModal data={modalData.details} onCloseModal={closeModal} />}
      </Modal>
    </div>
  );
};

export default Table;
