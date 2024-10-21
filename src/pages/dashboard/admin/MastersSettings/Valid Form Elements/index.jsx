import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteValidFormElement, fetchData } from "@/redux/admin/actions/data";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { fetchValidFormElements } from "@/redux/admin/actions/MasterSettings/Valid Form Elements";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import SearchBox from "@/components/common/SearchBox";
import { useNavigate } from 'react-router-dom';
import Pagination from "@/components/common/Pagination";

const ValidFormElementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { validFormElements, isFetchingValidFormElements, error } = useSelector((state) => state.validFormElements);
  console.log("validFormElements page: ", validFormElements);
  console.log("validFormElements loader: ", isFetchingValidFormElements);

  //handling pagination here..
  const [searchParams] = useSearchParams();
  // const [limit, setLimit]= useState(searchParams.get('limit') || 10);
  const page = searchParams.get('page') || 0;
  const limit = searchParams.get('limit') || 10;
  const search = searchParams.get('search');

  //  console.log("page:",page) ;

  //to get list of data from store
  useEffect(() => {
    console.log("page:", page);
    // validFormElements.length === 0 &&
    dispatch(fetchValidFormElements({ page, limit, search }));
  }, [page, limit, search]);

  const handleDelete = (id) => {
    console.log("delete id", id);

    dispatch(deleteValidFormElement(id));
  }

  const handleStatusChange = (id, currStatus) => {
    console.log("Change status of element with id , status:", id, currStatus);
    //Now dispatch for change status from here...

  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  //This Column is requred for the Table 
  const columns = [
    {
      Header: 'Element',
      accessor: 'element',
      Cell: ({ row }) => (row?.original?.element),
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

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Valid Form Elements</h1>
      {isFetchingValidFormElements ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={()=>navigate("/dashboard/admin/masterSettings/validFormElement/create")} 
            >
              Add
            </button>
            <SearchBox />
          </div>
          <ReusableTable
            data={validFormElements?.data||[]}
            totalData={validFormElements?.total}
            editPath={"test/path"}
            columns={columns}   //Must define table columns according to your data
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
          <Pagination totalItems={validFormElements?.total} />
        </div>
      )}
    </div>
  );
};

export default ValidFormElementPage;
