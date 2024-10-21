import React, {useEffect, useState} from 'react';
import {
  Input,
  Option,
  Select,
  Dialog, 
  DialogHeader, 
  DialogBody,
  DialogFooter,
  Button
} from "@material-tailwind/react";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllCategories, updateStatus } from '@/redux/admin/actions/MasterSettings/Category';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import { getAllInvestors } from '@/redux/admin/actions/InvestorManagement';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
const data = [ 
    {
       caseId : "PartnerShip firm registration",  
       updatedBy : "Sakshi", 
       date : "May 19, 20223",  
    }, 
    {
       caseId : "Private limited company", 
       updatedBy : "Ram", 
       date : "May 19, 20223",  
    }, 
    {
       caseId : "Uk Business corp", 
       updatedBy : "Farukh", 
       date : "May 19, 20223",  
    }, 
]
const ParntnerShipReistration = () => {
const isFetching = false; 
const totalRecords= 2;

  return (
    <div className='w-full mt-2'> 
    <TitleComponent title={"CORPZO | Partnership Firm Registration"}/>
    
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <div className='w-[20%]'>

        </div>
        <div className="w-[30%]">
          <Input
            size="sm"
            placeholder="Search..."
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            // value={searchQuery}
            // onChange={handleSearch}
          />
        </div>
      {/* { searchQuery.length > 0 &&  <button onClick={handleClearFilter}>
          clear
        </button>} */}
      </div>
      <>
      {
        isFetching ? (
          <TableShimmer/>
        ) : (
         <>
            {data && data.length > 0? (
               <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Name
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Updated By 
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Date 
                   </th>
                  
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {data && data.map((form, index) => (
                   <tr key={index}>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm text-gray-500">{form.caseId}</div>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm text-gray-500">{form.updatedBy}</div>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm text-gray-500">{form.date}</div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>  
            ) : (
              <>
             <div className="flex justify-center items-center h-screen">
  <img src="/img/Nodata.svg" className="w-[40%]" alt="No data found" />
</div>
</>
            )}
         </>
        )
      }
    
    </>

    {totalRecords > 10 && <ReactPaginate
          className=""
          previousLabel={
            data.length > 0 ? (
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
            data.length > 0 ? (
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
          // pageCount={Math.ceil(subCategoryList.length / 5)}
          pageCount={totalRecords/10}
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

export default ParntnerShipReistration;
