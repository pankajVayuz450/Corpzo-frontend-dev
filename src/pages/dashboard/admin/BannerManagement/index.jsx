import React, { useEffect, useState } from 'react';
import {
  Input,
  Switch,
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllDepartments, updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getBanners } from '@/redux/admin/actions/banner';
import { toast } from 'react-toastify';
import { removeFetchingBannersError } from '@/redux/admin/slices/bannerSlice';

const BannerManagement = () => {
  
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {departmentList, isFetching, totalCount, totalPages} = useSelector((state)=> state.department)
  const navigate = useNavigate();

  const { banners,
    isFetchingBanners,
    fetchingBannersError } = useSelector(state => state.banner)
  
  useEffect(() => {
    dispatch(getBanners());
  }, [])

  useEffect(() => {
    if (fetchingBannersError) {
      toast.error("Error occur in fetching banners data")
    }
    dispatch(removeFetchingBannersError())
  }, [fetchingBannersError])

  const handleEdit = id => {
    console.log(id, "id")
    navigate(`/dashboard/admin/masterSettings/edit-department/${id}`);
  };
  

  const handlePageClick=(e)=>{
   dispatch(getAllDepartments(e.selected+1, 10))
    setSearchParams({page :5, limit : 10})
  }
  const handleStatus = (form) => {
    // Toggle the status
    console.log(form)
    const newStatus = !form.active;
    const data = {
      name: form.name,
      description : form.description,
     active:newStatus,
      }
    dispatch(updateStatus(form.departmentId, data));
  };
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  
    
    const timeout = setTimeout(() => {
      
      setSearchParams({ search: value });
      
      dispatch(getAllDepartments(1, 10, value));
    }, 2000);
  
    setDebounceTimeout(timeout);
  };
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    console.log(query)
    if (query) {
      dispatch(getAllDepartments(1,10,query));
     
    }
  }, [searchParams, dispatch]);
  const handleClearFilter = () => {
    setSearchQuery(''); 
    setSearchParams({}); 
    dispatch(getAllDepartments(1, 10)); 
    setSearchQuery('')
  }
  return (
    <div className='w-full'> 
    <TitleComponent title={"CORPZO | Banner Management"}></TitleComponent>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-banner" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Banner
        </NavLink>
        <div className='w-[30%] flex gap-4 justify-end items-center mb-4'>
        <div className="">
          <Input
            size="sm"
            placeholder="Search..."
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
         {searchQuery.length > 0 &&  <button onClick={handleClearFilter}>
            clear
          </button>}
        </div>
      </div>
      {
        isFetchingBanners ? (
          <TableShimmer/>
        ) : (
          <>
            {
             banners && banners.length > 0 ? (
<table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Banner Image
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Banner Title 
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Url
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {banners && banners.map((form, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{form.bannerImage}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{form.bannerTitle}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{form.url}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{(form.createdAt)}</div>
            </td>
            <td >
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {form.active === true ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4">
              {/* {renderActionColumn(form)} */}
              <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(form.departmentId)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <Switch checked={form.active} onChange={()=>{handleStatus(form)}}/>
          </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>  
              ) : (
                <div className="flex justify-center items-center h-screen">
                <img src="/img/Nodata.svg" className="w-[50%]" alt="No data found" />
              </div>)
            }
          </>
        )
      }

{departmentList.length > 10 && <ReactPaginate
          className=""
          previousLabel={
            departmentList.length > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : null
          }
          nextLabel={
            departmentList.length > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : null
          }
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          // forcePage={page}
          containerClassName={"flex items-center justify-center mt-3 mb-4"}
          pageClassName={
            "block border border-solid border-lightGr ay hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
          }
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"bg-blue-500 text-white"}
        />}
    </div>
  );
}

export default BannerManagement;
