import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";
import { fetchAllElements } from "@/redux/admin/actions/MasterSettings/Elements";
import { deleteRegex, fetchAllRegex } from "@/redux/admin/actions/MasterSettings/Regex";
import { useNavigate } from "react-router-dom";
const RegexElements = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regexes, isFetchingRegex, error } = useSelector((state) => state.validations);

  console.log("regexes", regexes);

  const handleCreateRegex = () => {
    navigate('/dashboard/admin/masterSettings/regex/create');
  };

  const handleDelete = (id) => {
    dispatch(deleteRegex(id));
  };
  useEffect(() => {
    dispatch(fetchAllRegex());
  }, []);

  const columns = [
    {
      Header: 'RegEx Name',
      accessor: 'regexName',
      Cell: ({ row }) => (row?.original?.regexName),
    },
    {
      Header: 'RegEx',
      accessor: 'regex',
      Cell: ({ row }) => (row?.original?.regex),
    },
  ]

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Regex</h1>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleCreateRegex}>Create Regex</button>
      {isFetchingRegex ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <ReusableTable data={regexes}
          columns={columns}
          onDelete={handleDelete}
          editPath='/dashboard/admin/masterSettings/regex/edit'
        />

      )}
    </div>
  );
};

export default RegexElements;
