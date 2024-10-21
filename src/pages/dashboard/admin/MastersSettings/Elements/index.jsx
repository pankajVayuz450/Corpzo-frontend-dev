import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { fetchAllElements } from "@/redux/admin/actions/MasterSettings/Elements";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ElementsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { elements, isFetchingElements, error } = useSelector((state) => state.elements);
  // console.log("isFetchingElements",isFetchingElements);
  console.log("store.elements",elements);


  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };



   //This Column is requred for the Table 
   const columns = [
    {
      Header: 'Element',
      accessor: 'typeName',
      Cell: ({ row }) => (row?.original?.typeName),
    },
    {
      Header: 'Self Closed',
      accessor: 'isSelfClosed',
      Cell: ({ row }) => (row?.original?.isSelfClosed?.toString()),
    },
    {
      Header: 'Parent',
      accessor: 'parentElementId',
      Cell: ({ row }) => (row?.original?.parentElementId?.toString()||"null"),
    },
    {
      Header: 'Child elements',
      accessor: 'hasChildElements',
      Cell: ({ row }) => (row?.original?.hasChildElements?.toString()),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDate(value),
    },
  ];
  

  useEffect(() => {
    // elements.length === 0 &&
    dispatch(fetchAllElements());
  }, []);

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Form Elements</h1>
      {isFetchingElements ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (

        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={()=>navigate("/dashboard/admin/masterSettings/formElement/create")} 
            >
              Add
            </button>
          </div>
          <ReusableTable
            data={elements||[]}
            // totalData={10}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
            // onStatusChange={handleStatusChange}
        />
        </div>

         
      )}
    </div>
  );


  
};

export default ElementsPage;
