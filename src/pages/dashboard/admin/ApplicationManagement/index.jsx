import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getAllApplications, updateApplicationStatus } from '@/redux/admin/actions/ApplicationManagement';
import { Select, Option } from "@material-tailwind/react";
import SearchBoxNew from '@/components/common/SearchBoxNew';
import Pagination from '@/components/common/Pagination';
import DynamicStatusSelect from './DynamicStatusSelect';


const ApplicationManagement = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { applicationsList, totalCount, isFetching } = useSelector((state) => state.applications)
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const navigate = useNavigate();

  // Handle edit application action

  console.log("check application list", applicationsList)


  // Toggle application status



  const query = searchParams.get('search') || '';
  const page = searchParams.get('page') || 1;

  // Automatically fetch applications based on searchParams
  useEffect(() => {

    setSearchQuery(query);

    dispatch(getAllApplications(page, query));
    dispatch(updateApplicationStatus(page, query));

  }, [searchParams, dispatch, query]);

  //status intigratin
  const statusOptions = [
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'Hold', label: 'Hold' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'open', label: 'Open' },
  ];


  const handleStatusChange = (newStatus, applicationId) => {

    console.log('Selected Status:calll.....', newStatus, applicationId);
    dispatch(updateApplicationStatus({
      applicationId: applicationId,
      status: newStatus
    })); // Dispatch action to update status in the backend
    setSelectedStatus(newStatus); // Update local status state
  };

  // Clear filter


  return (
    <div className='w-full'>
      <TitleComponent title={"CORPZO | Application Management"}></TitleComponent>
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-application" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Application
        </NavLink>
        <SearchBoxNew />
      </div>
      {
        isFetching ? (
          <TableShimmer />
        ) : (
          <>
            {
              applicationsList && applicationsList.length > 0 ? (
                <div className='overflow-x-auto mx-auto w-full'>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id Number
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case Id
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applicationsList && applicationsList.map((form, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{form.caseId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{form.caseId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{form.user_data[0]?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.agent_data[0]?.email)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.service_data[0]?.name)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.agent_data[0]?.name)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* {renderActionColumn(form)} */}
                            <div className="min-w-[7rem]">
                              <DynamicStatusSelect
                                index={index}
                                statusList={statusOptions}
                                currentStatus={form.status} // Pass the current status from the API
                                onStatusChange={(newStatus) => handleStatusChange(newStatus, form._id)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <img src="/img/Nodata.svg" className="w-[50%]" alt="No data found" />
                </div>)
            }

          </>
        )
      }
      {isFetching != true && applicationsList.length > 1 && totalCount >= 9 && <Pagination totalItems={totalCount} itemsPerPage={10} />}

    </div>
  );
}

export default ApplicationManagement;
