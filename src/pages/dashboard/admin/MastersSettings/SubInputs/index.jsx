// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ReusableTable from "@/components/common/Tables";
// import { TailSpin } from "react-loader-spinner";
// import { deleteSubInput, fetchAllSubInputs, updateSubInput } from "@/redux/admin/actions/MasterSettings/SubInputs";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import formInputFields from "@/constants/APIList/formInputFields";
// import { toast } from "react-toastify";
// import { removeDeletingSubInput, removeFetchingSubInputs } from "@/redux/admin/slices/MasterSettings/SubInputs";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// const SubInputs = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 
//   const [inputFields, setInputFields] = useState([]);
//   const [selectedElementId, setSelectedElementId] = useState("");
//   const [deletedId, setDeletedId] = useState("");

//   const { subInputFields,
//     isLoadingSubInputFields,
//     loadingSubInputFieldsError,
//     deletedSubInput,
//     isDeletingSubInput,
//     deletingSubInputError } = useSelector((state) => state.subInput);

//   useEffect(() => {
//     if (loadingSubInputFieldsError) {
//         toast.error("Failed to fetch data");
//     }
//     dispatch(removeFetchingSubInputs());
//   }, [loadingSubInputFieldsError])


//   const formatDate = (dateString) => {
//     return format(new Date(dateString), 'MMM dd, yyyy');
//   };

//   useEffect(() => {
//     if (deletedSubInput) {
//       toast.success("Deleted successfully")
//     }
//     if (deletingSubInputError) {
//       toast.error(deletingSubInputError)
//     }
//     dispatch(removeDeletingSubInput());
//   }, [deletedSubInput, deletingSubInputError])

//   const handleDelete = (id) => {
//     setDeletedId(id);
//     dispatch(deleteSubInput({id}))
//   }

//   const handleEdit = (id) => {
//     navigate(`/dashboard/admin/masterSettings/sub-input/edit/${id}`)
//   }

//    //This Column is requred for the Table 
//    const columns = [
//     {
//       Header: 'Sub Types',
//       accessor: 'subtypeName',
//       Cell: ({ row }) => row?.original?.subtypeName,
//     },
//     {
//       Header: 'Created At',
//       accessor: 'createdAt',
//       Cell: ({ value }) => formatDate(value),
//     },
//     {
//       Header: 'Updated At',
//       accessor: 'updatedAt',
//       Cell: ({ value }) => formatDate(value),
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       Cell: ({ row }) => (
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button 
//             onClick={() => handleEdit(row.original?._id)} 
//             className="bg-blue-300 hover:bg-blue-500 transition-all p-2 rounded"
//           >
//             <FaEdit className="text-white" />
//           </button>
//           <button 
//             onClick={() => handleDelete(row.original?._id)} 
//             className="bg-red-300 hover:bg-red-500 transition-all p-2 rounded"
//           >
//             {
//               (row.original?._id === deletedId && isDeletingSubInput) ? (
//                 <div className="flex items-center justify-center">
//                   <div className="loader-delete"></div>
//                 </div>
//               ) : (
//                 <MdDelete className="text-white" />
//               )
//             }
//           </button>
//         </div>
//       ),
//     },
//   ];
  

//    // Fetch dropdown options when the component mounts
//    useEffect(() => {
//     axios.get(formInputFields.getAllInputs, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//       },
//     })
//       .then((response) => {
//         // console.log("response.data",response.data?.data);

//         setInputFields(response.data?.data); // Assuming response.data contains the list of elements
//       })
//       .catch((error) => {
//         console.error("Error fetching input fields:", error);
//       });
//   }, []);

//   const handleElementChange = (e) => {
//     setSelectedElementId(e.target.value); // Update selected element on dropdown change
//   };
  

//   useEffect(() => {
//     if (selectedElementId) {
//         dispatch(fetchAllSubInputs(selectedElementId));
//     }
//   }, [selectedElementId]);

//   return (
//     <div>
//       <h1 className="text-xl md:text-3xl font-semibold">Sub Input</h1>

//       <div className="flex justify-between p-3 bg-gray-300 rounded-md">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//           onClick={() => navigate("/dashboard/admin/masterSettings/sub-input/create")}
//         >
//           Add
//         </button>

//         {/* Dropdown for selecting element */}
//         <div className="">
//           <select
//             value={selectedElementId}
//             onChange={handleElementChange}
//             className="p-2 border rounded"
//           >
//             <option value="">Select Element</option>
//             {inputFields.map((field) => (
//               <option key={field._id} value={field._id}>
//                 {field.typeName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>



//       {/* Show spinner while fetching data */}
//       {isLoadingSubInputFields ? (
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
//       ) : subInputFields && subInputFields.length > 0 ? (
//         // Render table with attributes data
//         <ReusableTable data={subInputFields} editPath={"/dashboard/admin/masterSettings/subInput/edit"} columns={columns} />
//       ) : (
//         // Initially show "No Data" if no attributes are fetched
//         <p>No Data</p>
//       )}
//     </div>
//   );


  
// };

// export default SubInputs;
