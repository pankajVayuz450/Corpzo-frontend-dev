import React, { useEffect, useState } from 'react'

// Import Select from react-select with alias MultiSelect

import FormRenderer from './FormRenderer';
import { formData } from './dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAgent, getApplicationForm } from '@/redux/admin/actions/ApplicationManagement';
import LoadingPage from '@/components/common/LoadingPage';
import { formatDate, formatReadableDate } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import { TailSpin } from 'react-loader-spinner';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ApplicationAPIs from '@/constants/APIList/ApplicationManagement';


const CreateApplication = () => {
  const { applicationsList, totalCount, isFetching, attributeId, userId, formId, applicationId, applicationFormData, agentList } = useSelector((state) => state.applications)
  const dispatch = useDispatch()
  const { id } = useParams();
  const [params] = useSearchParams();

  // console.log(params.get("formId"),params.get("userId"));
  

  const [applicationDetails, setApplicationDetails] = useState(null);
  // console.log("applicationDetails", applicationDetails);

  useEffect(() => {
    const fetchAplicationDetails = async () => {
      const response = await axios.get(`${ApplicationAPIs.getApplication}?page=1&sort_by=date_asc&applicationId=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      // console.log("response :",response.data?.data[0]);
      setApplicationDetails(response.data?.data[0]);
      dispatch(getApplicationForm(response.data?.data[0]?._id, response.data?.data[0]?.userId, response.data?.data[0]?.formId))
    };
    fetchAplicationDetails();

  }, [])

  const userApplicationData = applicationFormData?.map((applicationData) => {
    return applicationData
    // return applicationData
  });

  const userApplicationData2 = applicationFormData?.map((applicationData) => {
    return applicationData?.user_application?.[0]
    // return applicationData
  });

  useEffect(() => {
    // console.log("check application data.....", agentList);

    // console.log("check form data", applicationFormData)

    // dispatch(getApplicationForm(applicationId, userId, formId))
    dispatch(getActiveAgent("agent"))



  }, [])

  const breadcrumbData = [
    {


      name: 'Application',
      url: "/dashboard/admin/application-management",
      children: [
        {
          name: 'Application Form',
          url: '/dashboard/admin/add-application'


        },
      ],
    }
  ];


  // return <div>No data</div>

  return (
    <div className='w-100'>
      <Breadcrumb items={breadcrumbData} />


      {/* {isFetching ? <div className="flex justify-center items-center min-h-screen">
        <TailSpin height={50} width={50} color="blue" />
      </div> : applicationFormData?.length > 0 ? (<FormRenderer formData={applicationFormData} caseId={userApplicationData2[0]?.caseId || 'No Case ID'} amount={userApplicationData2[0]?.amount} startDate={formatDate(userApplicationData2[0]?.startDate)} agentData={agentList || []} />) : (
        <>
          <HeaderTitle title="Application Form" />
          <div className="flex justify-center items-center h-screen">

            <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
          </div>

        </>
      )} */}
      {isFetching ? <div className="flex justify-center items-center min-h-screen">
        <TailSpin height={50} width={50} color="blue" />
      </div> : applicationDetails ? (<FormRenderer 
                                        formData={applicationFormData} 
                                        caseId={applicationDetails.caseId || 'No Case ID'} 
                                        amount={applicationDetails.amount} 
                                        startDate={formatDate(applicationDetails.startDate)} 
                                        agentList={agentList || []} 
                                        agentData={applicationDetails.agent_data||[]}
                                        completionDate={applicationDetails.expectedCompletionDate} 
                                      />) : (
        <>
          <HeaderTitle title="Application Form" />
          <div className="flex justify-center items-center h-screen">

            <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
          </div>

        </>
      )}

    </div>
  )
}

export default CreateApplication