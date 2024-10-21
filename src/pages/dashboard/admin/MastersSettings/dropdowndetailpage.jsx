import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../redux/admin/actions/data";
import Table from '../../../../components/admin/Table';
import { TailSpin } from 'react-loader-spinner';
import Modal from 'react-modal';
import ContentByTitle from "@/components/admin/CreateForm";
import { toast } from "react-toastify";
import ReusableTable from "@/components/common/Tables";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'inline-block',
    maxWidth: '90%',
    maxHeight: '90%',
  },
};

export function DropdownDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const { data, columns, isFetchingData, error } = useSelector(state => state.data);


  const handleCreateButtonClick = () => { 
    navigate('/dashboard/admin/masterSettings/dropdowndetailPage/createItem', { state: { title: title } });
  };

  useEffect(() => {
    let url;
    switch (title) {
      case "Elements":
        navigate('/dashboard/admin/masterSettings/dropdowndetailpage/elements');
        break;
      case "SubTypes":
        url = `${process.env.VITE_BASE_URL}/getAllFieldSubTypes`;
        break;
      case "Attributes":
        navigate('/dashboard/admin/masterSettings/dropdowndetailpage/attributes');
        break;
      case "Valid Form Element":
       navigate('/dashboard/admin/masterSettings/dropdowndetailpage/validFormElement');
        break;
      case "Valid Form Element Types":
        url = `${process.env.VITE_BASE_URL}/getValidFormElementTypes`;
        break;
      case "Valid Form Element Attributes":
        navigate('/dashboard/admin/masterSettings/dropdowndetailpage/validFormElementAttributes');
        break;
      case "Regex":
        navigate('/dashboard/admin/masterSettings/dropdowndetailpage/regex');
        break;
      default:
        navigate('/dashboard/admin/masterSettings');
    }
  }, [title, dispatch,navigate]);


  return (
    <div>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold">Create {title}</h1>
        <button 
          onClick={handleCreateButtonClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Create
        </button>
      </div>
      {isFetchingData ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>

        <ReusableTable data={data} />
        </>
      )}
    </div>
  );
}

export default DropdownDetailPage;