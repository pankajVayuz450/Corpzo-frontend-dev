// src/pages/CouponList.js
import CouponTable from '@/components/admin/couponTable';
import HeaderTitle from '@/components/common/HeaderTitle';
import LoadingPage from '@/components/common/LoadingPage';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import ReusableTable from '@/components/common/Tables';
import TableShimmer from '@/components/common/TableShimmer';
import couponAPIs from '@/constants/APIList/couponAPIs';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { deleteCoupon, getAllCoupons, updateCouponStatus } from '@/redux/admin/actions/coupon';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { Switch } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CouponList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { couponsList, coupons, isCouponsFetching, totalCount, currentPage, isCouponUpdating } = useSelector((state) => state.coupons);
  console.log("coupons isCouponUpdating", isCouponUpdating);

  const handleCreateCoupon = () => {
    navigate('/dashboard/admin/couponmanagement/create-coupon');
  };
  //  const skip= searchParams.get('skip');
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10
  const search = searchParams.get('search') || "";

  useEffect(() => {



    dispatch(getAllCoupons({ page: page, limit: limit, search: search }));


  }, [page, limit, search]);

  const handleStatus = (form) => {
    const newStatus = !form.active; // Toggle the status
    const data = {

      active: newStatus, // Updated status
    };

    // Dispatch the updateCoupon action with the couponId and updated fields
    dispatch(updateCouponStatus(form.couponId, data)); // Pass the couponId and flattened data
  };



  const handleEdit = (id) => {


    const selectedCoupon = couponsList.find(coupon => coupon.couponId === id);

    if (selectedCoupon) {

      navigate(`/dashboard/admin/couponmanagement/edit-coupon/${id}`,);
    } else {
      console.error("Coupon not found!");
    }
  };

  const breadcrumbData = [


    {
      name: 'Coupon Management',
      url: '/dashboard/admin/coupounmanagement',
    },
  ];



  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={"Coupon Management"} totalCount={totalCount} />
      <div className='flex justify-between'>
        <button onClick={handleCreateCoupon} className="bg-blue-500 text-white px-2 py-2 rounded mb-4">Create Coupon</button>
        <SearchBoxNew placeholder={"Search"} queryParam={"search"} />
      </div>
      {isCouponsFetching ? <TableShimmer />
        :
        (
          <>
            {couponsList && couponsList.length > 0 ? (<table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr. No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {couponsList && couponsList?.map((form, index) => {
                  const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                  return (
                    <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{idx}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{form?.couponTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{form?.discount}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatReadableDate(form?.validity)}</div>
                    </td>
                    <td >
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form?.active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {form.active === true ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {/* {renderActionColumn(form)} */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(form?.couponId)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <Switch checked={form.active} disabled={isCouponUpdating} onChange={() => { handleStatus(form) }} />
                      </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>) : (
              <div className="flex justify-center items-center h-screen">
                <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
              </div>
            )}

          </>
        )
      }
      {/* <CouponTable /> */}
      <div>
        {/* <Pagination  totalItems={16} itemsPerPage={limit}/> */}

        {isCouponsFetching != true && totalCount >= 9 && <Pagination totalItems={totalCount} itemsPerPage={limit} page={currentPage} />}


      </div>
    </div>
  );
};

export default CouponList;
