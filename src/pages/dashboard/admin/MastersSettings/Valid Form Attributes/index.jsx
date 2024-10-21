import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { fetchValidFormAttributes } from "@/redux/admin/actions/MasterSettings/Valid Form Attributes";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";

const ValidFormElementAttributesPage = () => {
  const dispatch = useDispatch();
  const { validFormAttributes, isFetchingValidFormAttributes, error } = useSelector((state) => state.validFormElementAttributes);
  const navigate = useNavigate(); 

  console.log("validFormAttributes",validFormAttributes);

    //handling pagination here..
    const [searchParams] = useSearchParams();
    // const [limit, setLimit]= useState(searchParams.get('limit') || 10);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const search = searchParams.get('search');

    console.log(page, limit, search);
    
  
  useEffect(() => {
    dispatch(fetchValidFormAttributes({ page, limit, search }));
  }, [page, limit, search]);


  const handleStatusChange = (id, currStatus) => {
    console.log("Change status of element with id , status:", id, currStatus);
    //Now dispatch for change status from here...

  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };


  console.log(window.location.pathname+"id");
  

  //This Column is requred for the Table 
  const columns = [
    {
      Header: 'Attribute',
      accessor: 'attribute',
      Cell: ({ row }) => (row?.original?.attribute),
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
      <h1 className="text-xl md:text-3xl font-semibold">Valid Form Element Attributes</h1>
      {isFetchingValidFormAttributes ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (

        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={()=>navigate("/dashboard/admin/masterSettings/ValidAttributes/create")} 
            >
              Add
            </button>
            <SearchBox />
          </div>
          <ReusableTable
            data={validFormAttributes?.data||[]}
            totalData={validFormAttributes?.total}
            editPath={`${window.location.pathname}/edit`}
            columns={columns}   //Must define table columns according to your data
            onStatusChange={handleStatusChange}
        />
          <Pagination totalItems={validFormAttributes?.total} itemsPerPage = {10}/>
        </div>

         
      )}
    </div>
  );
};

export default ValidFormElementAttributesPage;
