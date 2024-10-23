// import { fetchSubInput } from '@/redux/admin/actions/MasterSettings/SubInputs';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'
// import AddEditSubInput from './AddEditSubInput';
// import { toast } from 'react-toastify';
// import { removeFetchingSubInputs } from '@/redux/admin/slices/MasterSettings/SubInputs';
// import { TailSpin } from 'react-loader-spinner';

// const EditSubInput = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch()
//     const { subInputField,
//         isLoadingSubInputField,
//         loadingSubInputFieldError } = useSelector(state => state.subInput);

//     useEffect(() => {
//         if (loadingSubInputFieldError) {
//             toast.error(loadingSubInputFieldError);
//         }
//         dispatch(removeFetchingSubInputs());
//     }, [loadingSubInputFieldError])

//     useEffect(() => {
//         if (id) {
//             dispatch(fetchSubInput(id));
//         }
//     }, [id])

//   return (
//     <div>
//       {isLoadingSubInputField ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <TailSpin
//             height="80"
//             width="80"
//             color="#4fa94d"
//             ariaLabel="loading"
//             visible={true}
//           />
//         </div>
//       ) : subInputField ? (
//         // Render table with attributes data
//         <AddEditSubInput type={"edit"} initialValues={{
//             inputTypeId : subInputField?.inputTypeId,
//             subtypeName: subInputField?.subtypeName
//         }}/>
//       ) : (
//         // Initially show "No Data" if no attributes are fetched
//         <p>No Data</p>
//       )}
//     </div>
//   )
// }

// export default EditSubInput
