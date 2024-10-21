import { deleteSubAdmin, fetchSubAdmins } from '@/redux/admin/actions/subAdmin';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import deleteIcon from '/public/img/icons8-remove-64.png';
import editIcon from '/public/img/edit.png';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteSubAdminModal';
import { TailSpin } from 'react-loader-spinner';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const SubAdminTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subAdmins, isSubAdminsFetching,isSubAdminDeleting } = useSelector((state) => state.subAdmins);
    const [subAdminToDelete, setSubAdminToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      if (!subAdmins.length) {
        dispatch(fetchSubAdmins());
      }
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/submadminmanagemnt/edit-subadmin/${id}`);
    };

    const closeModal = () => {
        setSubAdminToDelete(null);
        setIsModalOpen(false);
      };

      const openModal = (id) => {
        setSubAdminToDelete(id);
        setIsModalOpen(true);
      };
    

      const handleDelete = () => {
        dispatch(deleteSubAdmin(subAdminToDelete))
        .unwrap()
        .then(() => {
            closeModal();
        })
      };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM d, yyyy');
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            {isSubAdminsFetching &&<TailSpin
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000} //3 secs
          />}

            {!isSubAdminsFetching && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email ID</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Services</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Added On</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Line Manager</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Active</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subAdmins.map((subAdmin) => (
                                <tr key={subAdmin._id} className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-700">{subAdmin.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{subAdmin.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{subAdmin.access.join(', ')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(subAdmin.createdAt)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{subAdmin.lineManager}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{subAdmin.isActive ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 flex space-x-4">
  <button
    aria-label="Edit"
    onClick={() => handleEdit(subAdmin._id)}
  >
   <FaEdit 
    className='text-blue-500 '
   />
  </button>
  <button aria-label="Delete"
    onClick={() =>openModal(subAdmin._id)}
  >
    <MdDelete/>
  </button>
</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        isDeleting={isSubAdminDeleting}
        entityName="Sub-Admin"
      />

        </div>
    );
};

export default SubAdminTable;
