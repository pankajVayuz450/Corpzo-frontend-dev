import HeaderTitle from '@/components/common/HeaderTitle';
import LoadingPage from '@/components/common/LoadingPage';
import TitleComponent from '@/components/common/TitleComponent';
import { getCaseHistory } from '@/redux/admin/actions/ApplicationManagement';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


// CaseHistory Component
const CaseHistory = () => {
    const { noteList, applicationId, userId, commentLoading ,isFetching,caseHistoryList} = useSelector((state) => state.applications);
    const dispatch = useDispatch();



    useEffect(() => {

        console.log("check note list ",noteList)
        dispatch(getCaseHistory(applicationId));
      }, [dispatch, applicationId]);

      const breadcrumbData = [
        {
          
            
              name: 'Application',
              url:"/dashboard/admin/application-management",
              children: [
                {
                  name: 'Application Form',
                  url: '/dashboard/admin/add-application',
                  children: [
                    {
                      name:  'Case History',
                      url:'/dashboard/admin/case-history',
                    },
                  ],
                },
              ],
        }
      ];


      if (isFetching) {
        return <LoadingPage />; // Render LoadingPage when isFetching is true
      }

  return (
    <div>
    <Breadcrumb items={breadcrumbData}/>
    {/* <h1 className="text-xl md:text-3xl font-semibold mb-4">{"Case History"} </h1> */}
    <TitleComponent title={"CORPZO |Case History"} />
    <HeaderTitle title="Case History" />
      <div className="flex justify-end items-center space-x-2">
        <NavLink
          to="/dashboard/admin/team-note/create-note" // Update this link as needed
          className="flex items-center bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Note
        </NavLink>
      </div>

      <div>
        <VerticalTimeline layout='1-column-left'>
          {caseHistoryList.length>0 &&caseHistoryList.map((entry) => (
            <VerticalTimelineElement
              key={entry._id}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
              date={new Date(entry.createdAt).toLocaleString()} // Format the date as needed
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
              <p>
                <strong>{new Date(entry.createdAt).toLocaleString()}</strong> | <strong>{entry.userName}</strong> : {entry.action}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default CaseHistory;
