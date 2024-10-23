// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import listAll from '@/constants/APIList/listAll';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { removeAddingSubInput, removeUpdatingSubInput } from '@/redux/admin/slices/MasterSettings/SubInputs';
// import { createSubInput, updateSubInput } from '@/redux/admin/actions/MasterSettings/SubInputs';

// function AddEditSubInput({ initialValues, type }) {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [parentElements, setParentElements] = useState([]);
//   const { addedSubInput,
//     isAddingSubInput,
//     addingSubInputError, updatedSubInput,
//     isUpdatingSubInput,
//     updatingSubInputError } = useSelector(state => state.subInput);

//   useEffect(() => {
//     if (addedSubInput) {
//       toast.success("Added successfully");
//       navigate("/dashboard/admin/masterSettings/sub-inputs");
//     }
//     dispatch(removeAddingSubInput());
//   }, [addedSubInput, addingSubInputError])

//   useEffect(() => {
//     if (updatedSubInput) {
//       toast.success("Updated successfully");
//       navigate("/dashboard/admin/masterSettings/sub-inputs");
//     }
//     if (updatingSubInputError) {
//       toast.error(updatingSubInputError);
//     }
//     dispatch(removeUpdatingSubInput());
//   }, [updatedSubInput, updatingSubInputError])

//   // Simulate API call to fetch parentElementId options
//   useEffect(() => {
//     const fetchParentElements = async () => {
//       try {
//         let response = await axios.get(listAll.getAllFieldTypes, {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU5MmQ1Zjk3NTJlMGM1MDY4NzE3OTYiLCJuYW1lIjoiRGhhcnZpayBCYWRnYSIsImVtYWlsIjoiZGhhcnZpay5iYWRnYUBtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyOTE5ODQ4Mn0.YzXtOabxgRdiIZckCEVlCxOKjL8K2ybvKFy2Hj_CarA`,
//           },
//         });
//         response = response?.data?.data;
//         response = response?.map((res) => {
//           return { _id: res._id, typeName: res.typeName };
//         });
//         setParentElements(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchParentElements();
//   }, []);

//   // Formik Setup
//   const formik = useFormik({
//     initialValues,
//     validationSchema: Yup.object({
//       inputTypeId: Yup.string().required('Input type is required'),
//       subtypeName: Yup.string().required('Sub type name is required')
//     }),
//     onSubmit: (values) => {
//       const formData = {
//         inputTypeId : values.inputTypeId,
//         subtypeName: values.subtypeName
//       };
//       if (type === "add") {
//         dispatch(createSubInput(formData));
//       } else if (type === "edit") {
//         dispatch(updateSubInput(formData));
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-6 p-4 bg-gray-100 rounded-md shadow-md">
//       {/* Element Name Field */}
//       <div className="w-full">
//         <label htmlFor="inputType" className="block text-sm font-medium text-gray-700">
//           Input Type Name
//         </label>
//         <select
//             id="inputType"
//             name="inputTypeId"
//             value={formik.values?.inputTypeId}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="">Select Element</option>
//             {parentElements?.map((field) => (
//               <option key={field._id} value={field._id}>
//                 {field.typeName}
//               </option>
//             ))}
//           </select>
//         {formik.touched?.inputTypeId && formik.errors?.inputTypeId ? (
//           <div className="text-red-500 text-sm mt-1">{formik.errors?.inputTypeId}</div>
//         ) : null}
//       </div>

//       <div className="w-full">
//         <label htmlFor="subtypeName" className="block text-sm font-medium text-gray-700">
//           Sub Type Name
//         </label>
//         <input
//             id="subtypeName"
//             name="subtypeName"
//             value={formik.values.subtypeName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         {formik.touched?.subtypeName && formik.errors?.subtypeName ? (
//           <div className="text-red-500 text-sm mt-1">{formik.errors?.subtypeName}</div>
//         ) : null}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         disabled={isAddingSubInput}
//       >
//         {
//           isAddingSubInput ? <div className='flex items-center justify-center'>
//             <div className='loader'></div>
//           </div> : "Submit"
//         }
//       </button>
//     </form>
//   );
// }

// export default AddEditSubInput;
