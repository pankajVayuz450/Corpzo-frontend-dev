import { getAllBusiness } from '@/redux/admin/actions/UserManagement';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CiLocationOn } from "react-icons/ci";
import { FaCalendar } from "react-icons/fa";
import { formatDate, formatReadableDate } from '@/Helpers/globalfunctions';
import SearchBoxNew from '@/components/common/SearchBoxNew';
const BusinessDetails = () => {
  const { user, businessDetails } = useSelector((state) => state.userMgmt);
  const dispatch = useDispatch();

  return (
    <>
      {businessDetails && businessDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 p-1">
          {businessDetails.map((business) => {
            const address = [
              business.businessAddressL1,
              business.businessAddressL2,
              business.businessAddressCity,
              business.businessAddressState,
              business.businessAddressPin,
            ].filter(Boolean).join(', ');

            return (
              <div key={business.businessNumber} className="relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-full max-w-[15rem]">
                <div className="flex flex-row justify-between">
                  <div className="w-full flex flex-col gap-0">
                    <h1 className="font-bold truncate">
                      {business.businessName} ({business.typeOfBusiness})
                    </h1>
                    <span className="text-xs">Business {business.businessNumber}</span>
                  </div>
                  {business.active ? (
                    <span className="absolute top-1 right-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col gap-2 text-gray-700 bg-white p-2 text-xs">
                  <div className="flex flex-row gap-2">
                    <span className="font-semibold"><FaCalendar /></span>
                    <p>{formatReadableDate(business.yearOfStablish)}</p>
                  </div>
                </div>
                <div className="relative flex flex-col gap-2 text-gray-700 bg-white p-2 text-xs">
                  <div className="flex flex-row gap-2">
                    <span className="font-semibold"><CiLocationOn /></span>
                    <p>{address || 'Address not available'}</p>
                  </div>
                </div>
                <hr />
                <div className="absolute bottom-0 flex justify-around text-xs">
                  <span className="text-red-500 font-semibold">Critical</span>
                  <span className="text-blue-500 font-semibold">Total services {business.totalService}</span>
                  <span className="text-green-500 font-semibold">Service</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4">
          {/* SVG or "No Data" image */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M9 20h6a2 2 0 002-2v-4a2 2 0 00-2-2h-1.414A2 2 0 0111 10.586l-2-2A2 2 0 018.414 8H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No business details available</p>
        </div>
      )}
    </>
  );
}

export default BusinessDetails