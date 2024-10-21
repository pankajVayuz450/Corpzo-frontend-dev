import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios for API requests
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { fetchAllAttributes } from "@/redux/admin/actions/MasterSettings/Attributes"; // Assuming this action fetches attributes based on the elementId
import formInputFields from "@/constants/APIList/formInputFields";
import reusableFunctions from "@/utils/reusableFunctions";
import { useNavigate } from "react-router-dom";

const AttributesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attributes, isFetchingAttributes, error } = useSelector((state) => state.attributes);

  const [selectedElementId, setselectedElementId] = useState("");
  const [inputFields, setInputFields] = useState([]);

  console.log("dropdown list: ", inputFields);
  console.log("selectedElementId", selectedElementId);

  console.log("table list:", attributes);




  // Fetch dropdown options when the component mounts
  useEffect(() => {
    axios.get(formInputFields.getAllInputs, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        // console.log("response.data",response.data?.data);

        setInputFields(response.data?.data); // Assuming response.data contains the list of elements
      })
      .catch((error) => {
        console.error("Error fetching input fields:", error);
      });
  }, []);

  // Fetch attributes based on selected element
  useEffect(() => {
    if (selectedElementId) {
      dispatch(fetchAllAttributes(selectedElementId)); // Fetch attributes for the selected element
    }
  }, [selectedElementId, dispatch]);

  const handleElementChange = (e) => {
    setselectedElementId(e.target.value); // Update selected element on dropdown change
  };

  // Define table columns dynamically based on fetched attributes
  const columns = [
    {
      Header: 'Atrribute',
      accessor: 'attribute',
      Cell: ({ row }) => (row?.original?.attribute),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => reusableFunctions.formatDate(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => reusableFunctions.formatDate(value),
    },

  ];

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Attributes Page</h1>

      <div className="flex justify-between p-3 bg-gray-300 rounded-md">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          onClick={() => navigate("/dashboard/admin/masterSettings/attributes/create")}
        >
          Add
        </button>

        {/* Dropdown for selecting element */}
        <div className="">
          <select
            value={selectedElementId}
            onChange={handleElementChange}
            className="p-2 border rounded"
          >
            <option value="">Select Element</option>
            {inputFields.map((field) => (
              <option key={field._id} value={field._id}>
                {field.typeName}
              </option>
            ))}
          </select>
        </div>
      </div>



      {/* Show spinner while fetching data */}
      {isFetchingAttributes ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : attributes && attributes.length > 0 ? (
        // Render table with attributes data
        <ReusableTable data={attributes} editPath={"/dashboard/admin/masterSettings/attributes/edit"} columns={columns} />
      ) : (
        // Initially show "No Data" if no attributes are fetched
        <p>No Data</p>
      )}
    </div>
  );
};

export default AttributesPage;
