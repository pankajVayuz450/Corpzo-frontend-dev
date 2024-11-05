import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { addCaseHistory, getAllApplications, manageApplicationEscalateStatus, updateApplicationStatus } from '@/redux/admin/actions/ApplicationManagement';
import { Select, Option } from "@material-tailwind/react";
import SearchBoxNew from '@/components/common/SearchBoxNew';
import Pagination from '@/components/common/Pagination';
import DynamicStatusSelect from './DynamicStatusSelect';
import { setActiveIndex, setApplicationId, setFormId, setUserId } from '@/redux/admin/slices/AppliationManagement/Index';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import { FaSpinner } from 'react-icons/fa';


const ApplicationManagement = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { applicationsList, totalCount, isFetching,submitLoading,activeIndex,userId } = useSelector((state) => state.applications)
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role")

  // Handle edit application action



  // Toggle application status


  console.log("check acctive status",activeIndex)

  const query = searchParams.get('search') || '';
  const page = searchParams.get('page') || 1;
  const escalate = searchParams.get("isEscalated"|| false)
 

  // Automatically fetch applications based on searchParams
  useEffect(() => {
  
    setSearchQuery(query);

   
if(!escalate){

  dispatch(getAllApplications(page, query));
}
    

    

  }, [searchParams, dispatch, query,escalate]);

  //status intigratin
  const statusOptions = [
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hold', label: 'Hold' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'open', label: 'Open' },
    { value: 'escalate', label: 'Escalate' },
    
  ];


  const handleStatusChange = (newStatus, applicationId,index,escalatedTo,status) => {

   
  dispatch(setActiveIndex(index))

    dispatch(updateApplicationStatus({
      applicationId: applicationId,
      status: newStatus
    })); // Dispatch action to update status in the backend
    setSelectedStatus(newStatus); // Update local status state
    dispatch(addCaseHistory({
      "applicationId": applicationId,
      "action": ` Status changed ${status} to ${newStatus}`,
      "performedBy": userId,
        // "reason": rejectReason,
      // "statusBefore": status,
      // "statusAfter": newStatus
  }));

    const payload = {
      "applicationId":applicationId ,
      // "attributeId":attributeId,
      "status":"escalate"

    }
    if(newStatus==="escalate"){

      dispatch(manageApplicationEscalateStatus(payload))
    }
  
  };

  const nevigateToform=(applicationId,formId,userId)=>{
    dispatch(setApplicationId(applicationId))
    dispatch(setFormId(formId))
    dispatch(setUserId(userId))
    
    navigate("/dashboard/admin/add-application")
  }

  const breadcrumbData = [
    {
      
          name:escalate?"Escalate": 'Application',
          url:escalate?"/dashboard/admin/application-management?isEscalated=true":"/dashboard/admin/application-management",
         
    }
  ];
  // Clear filter

  // handle escalations button 
  const handleEscalationsButton = ()=>{
    navigate(`/dashboard/admin/application-management?isEscalated=true`)
    dispatch(getAllApplications(page, query,true));
  }


  return (
    <div className='w-full'>
    <Breadcrumb items={breadcrumbData}/>
    {/* <h1 className="text-xl md:text-3xl font-semibold mb-4">{"Application Management"}</h1> */}
    {!escalate?<HeaderTitle title="Application Management" />:<HeaderTitle title="Escalation" />}
      <TitleComponent title={"CORPZO | Application Management"}></TitleComponent>
      <div className='flex justify-end items-center w-full mb-4'>
        <div className='flex justify-between gap-5 '>
      {!escalate &&   <button className='bg-blue-500 text-white px-2 py-1 rounded-md' onClick={handleEscalationsButton}>   {isFetching && escalate  ? (
                                                <FaSpinner className="animate-spin text-white text-xl inline" />
                                            ) : "Escalations"}</button> }
        <SearchBoxNew />
        </div>
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
                       
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ">
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
                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent
                        </th> */}
                        {escalate? (<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admin Manager
                        </th>): (<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent
                        </th>)}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applicationsList && applicationsList?.map((form, index) => (
                        <tr key={index}>
                          
                          <td className="px-6 py-4 whitespace-nowrap  ">
                            <div className="text-sm text-blue-500 cursor-pointer underline " onClick={()=>nevigateToform(form._id,form.formId,form.userId)}>{form.caseId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{form.user_data[0]?.name || "..."}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.agent_data[0]?.email) ||"..."}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.service_data[0]?.name)||"..."}</div>
                          </td>
                          {escalate?<td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.manager_data[0]?.name)||"..."}</div>
                          </td>:<td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{(form.agent_data[0]?.name)||"..."}</div>
                          </td>}
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* {renderActionColumn(form)} */}
                            <div className="min-w-[7rem]">
                              <DynamicStatusSelect
                                index={index}
                                statusList={statusOptions}
                                currentStatus={form?.status} // Pass the current status from the API
                                onStatusChange={(newStatus) => handleStatusChange(newStatus, form._id,index,form?.escalatedTo,form?.status)}
                                loading={submitLoading}
                                disabled={form.status === "escalate" ? userRole !== form?.escalatedTo : false}
                                escalatedTo={form?.escalatedTo}
                              
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                
                
                <>
                
                {!escalate?<HeaderTitle title="Application Management" />:<HeaderTitle title="Escalation" />}
                <div className="flex justify-center items-center h-screen">
                <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
              </div>
                </>
              )
            }

          </>
        )
      }
      {isFetching != true && applicationsList.length > 1 && totalCount >= 9 && <Pagination totalItems={totalCount} itemsPerPage={10} />}

    </div>
  );
}

export default ApplicationManagement;
