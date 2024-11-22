// src/pages/CouponList.js

import HeaderTitle from '@/components/common/HeaderTitle';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';

import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { getAllCoupons, updateCouponStatus } from '@/redux/admin/actions/coupon';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { Switch, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import Select from 'react-select';
import {  getAllActiveSubCategoriesAll } from '@/redux/admin/actions/Services';
import { setCouponIndex } from '@/redux/admin/slices/coupon';
import { MdEdit } from 'react-icons/md';
import TitleComponent from '@/components/common/TitleComponent';
const CouponList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([[], [], []]); // For three dropdowns
  const { couponsList, coupons, isCouponsFetching, totalCount, currentPage, isCouponUpdating, isActiveCouponIndex } = useSelector((state) => state.coupons);
  console.log("coupons isCouponUpdating", isCouponUpdating);
  const { activeCategories, activeSubCategoriesList, getActiveBusinessEmailList } = useSelector((state) => state.service)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState('[]');
 
  const handleCreateCoupon = () => {
    navigate('/dashboard/admin/couponmanagement/create-coupon');
  };
  //  const skip= searchParams.get('skip');
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10
  const search = searchParams.get('search') || "";



  

  const formattedActiveCategoryList = activeCategories?.map(category => ({
    value: category.categoryId,
    label: category.categoryName
  }));

  const formattedActiveSubCategoryList = activeSubCategoriesList.map(subCategory => ({
    value: subCategory.subCategoryId,
    label: subCategory.subSectionTitle
  }));
  const formattedActiveBusinessEmail = getActiveBusinessEmailList.map(user => ({
    value: user.userId,
    label: user.email
  }));
  const handleCategoryChange = (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    console.log(selectedIds, "selectedIds")
    setSelectedCategoryIds(selectedIds); // Store as an array

    if (selectedIds.length > 0) {
      dispatch(getAllActiveSubCategoriesAll({ sectionIds: selectedIds })); // Pass array directly to the API
    }
  };
  useEffect(() => {



    dispatch(getAllCoupons({ page: page, limit: limit, search: search }));


  }, [page, limit, search]);

  const handleStatus = (form, index) => {
    const newStatus = !form.active; // Toggle the status
    const data = {
      active: newStatus, // Updated status
    };

    dispatch(setCouponIndex(index))


    // Dispatch the updateCoupon action with the couponId and updated fields
    dispatch(updateCouponStatus(form.couponId, data)); // Pass the couponId and flattened data
  };
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

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
      <TitleComponent title={"CORPZO | Coupon Management"}/>
      <div className='flex justify-between'>
        <button onClick={handleCreateCoupon} className="bg-blue-500 text-white px-2 py-2 rounded mb-4">Create Coupon</button>
        <div className='flex gap-4 items-center'>
          {/* <span><FaFilter className='fill-blue-500 cursor-pointer' onClick={toggleDialog} /></span> */}
          <SearchBoxNew placeholder={"Search"} queryParam={"search"} />
        </div>
      </div>
      <Dialog open={isDialogOpen} handler={toggleDialog} size="md" className="max-h-[600px] overflow-y-auto">
        <DialogHeader>Filter Coupons</DialogHeader>
        <DialogBody divider>
          {/* Radio Buttons */}
          <div className='flex gap-4'>

            <div className="flex flex-row gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="option1"
                 
                  className="mr-2"
                />
                Fixed
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="option2"
                 
                  className="mr-2"
                />
                Percentage
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Select Category
              </Typography>
              <Select
                isMulti
                name="categoryId"
                options={formattedActiveCategoryList}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleCategoryChange}
              />
              {/* {errors.categoryId && touched.categoryId && <p className='text-sm text-red-500'>{errors.categoryId}</p>} */}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Select Sub Category
              </Typography>
              <Select
                isMulti
                name="subCategoryId"
                options={formattedActiveSubCategoryList}
                className="basic-multi-select"
                classNamePrefix="select"
                // value={formattedActiveSubCategoryList?.filter(option => values?.subCategoryId?.includes(option?.value))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];

                  setFieldValue("subCategoryId", selectedValues);

                }}

              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Businesses
              </Typography>
              <Select
                isMulti
                name="activeBusinessEmail"
                options={formattedActiveBusinessEmail}
                className="basic-multi-select"
                classNamePrefix="select"
                // value={formattedActiveBusinessEmail?.filter(option => values?.activeBusinessEmail?.includes(option?.value))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                  console.log("check the sub cetegory value ..........", selectedValues)
                  setFieldValue("activeBusinessEmail", selectedValues);

                }}
                onBlur={() => setFieldTouched('activeBusinessEmail', true)}
              />
            </div>
           
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggleDialog} className="mr-2">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            toggleDialog();
            console.log('Selected options:', selectedOptions);
            console.log('Selected radio:', selectedRadio); // Log selected radio option
          }}>
            Apply
          </Button>
        </DialogFooter>
      </Dialog>
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
                      <td className="px-6 py-4 whitespace-nowrap" >
                        <span className=''>
                          {isCouponUpdating && isActiveCouponIndex === index ? <TailSpin height={20} width={20} color="blue" /> :<Switch key={index} checked={form.active} disabled={isCouponUpdating} onChange={() => { handleStatus(form, index) }}  />}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* {renderActionColumn(form)} */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(form?.couponId)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MdEdit/>
                          </button>

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
