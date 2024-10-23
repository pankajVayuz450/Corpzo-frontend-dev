import React, { useEffect } from 'react'

// Import Select from react-select with alias MultiSelect

import FormRenderer from './FormRenderer';
import { formData } from './dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAgent, getApplicationForm } from '@/redux/admin/actions/ApplicationManagement';
import LoadingPage from '@/components/common/LoadingPage';
import { formatDate, formatReadableDate } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';


const CreateApplication = () => {
    const { applicationsList, totalCount, isFetching,attributeId,userId,formId,applicationId,applicationFormData,agentList } = useSelector((state) => state.applications)
     const dispatch = useDispatch()

     const userApplicationData = applicationFormData?.map((applicationData) => {
      return applicationData
      // return applicationData
  });

     const userApplicationData2 = applicationFormData?.map((applicationData) => {
      return applicationData?.user_application?.[0]
      // return applicationData
  });

     useEffect(()=>{
      console.log("check application data.....",agentList);

        console.log("check form data",applicationFormData)

        dispatch(getApplicationForm(applicationId,userId,formId))
        dispatch(getActiveAgent("agent"))



     },[])

     const breadcrumbData = [
      {
        
          
            name: 'Application',
            url:"/dashboard/admin/application-management",
            children: [
              {
                name: 'Application Form',
                url: '/dashboard/admin/add-application'
               
                
              },
            ],
      }
    ];


    return (
        <div className='w-100'>
 <Breadcrumb items={breadcrumbData}/>


          {isFetching?<LoadingPage/>:applicationFormData?.length > 0 ?(<FormRenderer formData={applicationFormData} caseId={userApplicationData2[0]?.caseId|| 'No Case ID'} amount={userApplicationData2[0]?.amount} startDate={formatDate(userApplicationData2[0]?.startDate)} agentData={agentList || []} />):(
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