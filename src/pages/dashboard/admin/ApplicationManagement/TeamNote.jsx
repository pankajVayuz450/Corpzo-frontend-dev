import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TitleComponent from '@/components/common/TitleComponent';
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { addCaseHistory, addNoteComment, getNoteAndComment } from '@/redux/admin/actions/ApplicationManagement';
import { formatDate } from '@/Helpers/globalfunctions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingPage from '@/components/common/LoadingPage';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';

const TeamNote = () => {
  const { noteList, applicationId, userId, commentLoading ,isFetching} = useSelector((state) => state.applications);
  const dispatch = useDispatch();
  const [comments, setComments] = useState({});
  const [commentsNoteId, setCommentsNoteId] = useState({});

  useEffect(() => {
    dispatch(getNoteAndComment(applicationId));
  }, [dispatch, applicationId]);

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .max(50, 'Comment must be at most 50 characters')
      .required('Comment is required'),
  });

  const handleCommentSubmit = (noteId, values, { setSubmitting, resetForm }) => {
    setComments((prevComments) => ({
      ...prevComments,
      [noteId]: values.comment
    }));
    setCommentsNoteId(noteId);
    dispatch(addNoteComment({
      "noteId": noteId,
      "commenterId": userId,
      "commentContent": values.comment,
      "type": "Team"
    }));

    dispatch(addCaseHistory({
      "applicationId": applicationId,
      "action": `Team Note Comment added`,
      "performedBy": userId,
      //   "reason": "document ",
      // "statusBefore": status,
      // "statusAfter": value
  }));
    resetForm();
    setSubmitting(false);
  };

  const breadcrumbData = [
    {
      
        
          name: 'Application',
          children: [
            {
              name: 'Application Form',
              url: '/dashboard/admin/add-application',
              children: [
                {
                  name:  'Team Note',
                  url:'/dashboard/admin/team-history',
                },
              ],
            },
          ],
    }
  ];

  if (isFetching) {
    return <LoadingPage />;
  }

  return (
    <div>
      <TitleComponent title={"CORPZO |Team Note"} />
      <Breadcrumb items={breadcrumbData}/>
      {/* <h1 className="text-xl md:text-3xl font-semibold mb-4">{"Team Note"}</h1> */}
      <HeaderTitle title="Team Note" />
      <div className="flex justify-end items-center space-x-2 mb-4">
        <NavLink to="/dashboard/admin/case-history" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Case History
        </NavLink>

        <NavLink to="/dashboard/admin/team-note/create-note" className="flex items-center bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          <FaPlus className="mr-2" />
          Add Note
        </NavLink>
      </div>

      <div>
        {noteList?.length === 0 || !noteList.some(item => !item.cloneFormFieldId) ? (
          // No Data Image
          <div className="flex justify-center items-center h-screen">
            <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
          </div>
        ) : (
          <VerticalTimeline layout='1-column-left'>
            {noteList.filter(item => !item.cloneFormFieldId)
              .map((item) => (
                <VerticalTimelineElement
                  key={item._id}
                  className={`vertical-timeline-element--${item?.type}`}
                  date={<span className="text-gray-700">{formatDate(item.createdAt)}</span>}
                  iconStyle={{ background: 'rgb(23, 12, 176)', color: '#fff' }}
                  contentStyle={{ background: 'rgb(0,0,0,0)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid rgb(23, 12, 176)' }}
                >
                  <div className="flex justify-between items-center space-x-4">
                    <div className="w-[45%]">
                      <p className='text-black'>{item.noteContent}</p>
                    </div>

                    <div className="w-[55%]">
                      <Formik
                        initialValues={{ comment: comments[item.noteId] || '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => handleCommentSubmit(item.noteId, values, actions)}
                      >
                        {({ isSubmitting, values, setFieldValue }) => (
                          <Form className="flex items-center space-x-2">
                            <div className="flex-1">
                              <Field
                                name="comment"
                                type="text"
                                placeholder="Add a comment"
                                className="border p-2 rounded w-full text-black"
                                value={values.comment}
                                onChange={(e) => {
                                  setFieldValue('comment', e.target.value);
                                  setComments((prevComments) => ({
                                    ...prevComments,
                                    [item.noteId]: e.target.value
                                  }));
                                }}
                              />
                              <ErrorMessage name="comment" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
                              disabled={isSubmitting || commentLoading}
                            >
                              {commentsNoteId === item.noteId && commentLoading ? (
                                <FaSpinner className="animate-spin mr-2" />
                              ) : (
                                <LuSend />
                              )}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>

                  {item.comments.length > 0 && (
                    <div className="ml-4 mt-2">
                      {item.comments.map((comment) => (
                        <p key={comment._id} className="text-sm text-gray-700">
                          {comment.commentContent}
                        </p>
                      ))}
                    </div>
                  )}
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
        )}
      </div>
    </div>
  );
};

export default TeamNote;
