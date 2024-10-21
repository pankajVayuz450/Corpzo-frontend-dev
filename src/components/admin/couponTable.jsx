// src/components/CouponTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoupons } from '@/redux/admin/actions/coupon';
import { useNavigate } from 'react-router-dom';
import { deleteCoupon } from '@/redux/admin/actions/coupon';
import DeleteModal from './DeleteSubAdminModal';
import { TailSpin } from 'react-loader-spinner';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CouponTable = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const { coupons, isCouponsFetching,isCouponDeleting } = useSelector((state) => state.coupons);
  const [subAdminToDelete, setSubAdminToDelete] = useState(null);

  useEffect(() => {
    coupons.length === 0 && dispatch(getAllCoupons());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/couponmanagement/edit-coupon/${id}`);
    };

    const handleDelete = () => {
        dispatch(deleteCoupon(subAdminToDelete))
        .unwrap()
        .then(() => {
            closeModal();
        })
      };

    const closeModal = () => {
        setSubAdminToDelete(null);
        setIsModalOpen(false);
      };

    const openModal = (id) => {
        setSubAdminToDelete(id);
        setIsModalOpen(true);
        };


  if (isCouponsFetching) {
    return <TailSpin
    color="#00BFFF"
    height={80}
    width={80}
    timeout={3000} //3 secs
  />;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Coupons List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coupon Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.couponTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.discount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(coupon.validity).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(coupon.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(coupon.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button onClick={()=>handleEdit(coupon._id)}><FaEdit/></button>
                  <button onClick={() =>openModal(coupon._id)} className="text-red-600 hover:text-red-900"><MdDelete/></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No coupons available</td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onDelete={handleDelete}
                isDeleting={isCouponDeleting}
                entityName="Coupon"
            />
    </div>
  );
};

export default CouponTable;