import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AllFormsTable from '../../../components/admin/AllFormsTable';
// import { fetchAllForms } from '@/redux/admin/actions/form';
import { TailSpin } from "react-loader-spinner";
// import { setDescription,setTitle,setUrl } from '@/redux/admin/slices/form';
import SearchBox from '@/components/common/SearchBox';
import ReusableTable from '@/components/common/Tables';
import Pagination from '@/components/common/Pagination';
import { changeFormStatus, fetchAllForms } from '@/redux/admin/slices/FormManagement/formSlice';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { Switch } from '@material-tailwind/react';
import Breadcrumb from '@/widgets/layout/TopNavigation';


 
const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const forms = useSelector((state) => state.forms.forms);
  const store = useSelector((state) => state.forms);
  const { forms, isFormLoading, isStatusChanging ,total } = store;


  //handling pagination here..
  const [searchParams] = useSearchParams();
  // const [limit, setLimit]= useState(searchParams.get('limit') || 10);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const search = searchParams.get('search');

  console.log(page, limit, search);

  console.log("form list", forms);
  console.log("total data:" ,total);
  


  const renderActionColumn = (form) => (

    <div className="flex space-x-4">
      <button type="button" onClick={() => navigateToPreviewForm(form)} className="text-green-500">Preview</button>
      <button type="button" onClick={() => navigateToAddFieldsForm(form)} className="text-blue-500">Add</button>
      <button type="button" onClick={() => navigateToEditForm(form)} className="text-blue-500">Edit</button>
      <button type="button" onClick={() => navigateToDeleteForm(form)} className="text-red-500">Delete</button>
    </div>
  );

  const navigateToPreviewForm = (form) => {
    navigate(`/dashboard/admin/preview-form/${form._id}`);
  };
  const navigateToAddFieldsForm = (form) => {
    navigate(`/dashboard/admin/formManagement/edit-fields/${form._id}`);
  };

  useEffect(() => {
    dispatch(fetchAllForms({ page, limit, search }));
  }, [ page, limit, search ]);

  const navigateToCreateForm = () => {
    navigate('/dashboard/admin/formManagement/create-form');
  };
  const navigateToDeleteForm = (form) => {
    navigate('/dashboard/admin/formManagement/delete-form', {
      state: {
        formId: form._id
      }
    })
  }

  const navigateToEditForm = (form) => {
    console.log(form);
    // dispatch(setUrl(form.url));
    // dispatch(setDescription(form.description));
    // dispatch(setTitle(form.title));
    navigate('/dashboard/admin/formManagement/edit-form', {
      state: {
        initialForm: {
          formId: form._id,
          title: form.title,
          description: form.description,
          url: form.url,
        },
      },
    });
  };

  // return <h1>Form</h1>

  const handleStatusChange = (e,id) => {
    // console.log("eeeeeeeeeee",);
    
    console.log("handle status change", id);
    //dispact for status change
    dispatch(changeFormStatus({ formId: id, isActive: e.target.checked.toString() }));
  }


  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      Cell: ({ row }) => (row?.original?.title),
    },
    {
      Header: 'Description',
      accessor: 'description',
      Cell: ({ row }) => (row?.original?.description),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ row }) => (formatReadableDate(row?.original?.createdAt)),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ row }) => (formatReadableDate(row?.original?.updatedAt)),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => (
        isStatusChanging ?<TailSpin height="20" width="20" color="#4fa94d" ariaLabel="loading" visible={true} />        :
          <Switch
            checked={row.original.isActive}
            onChange={(e) => handleStatusChange(e,row.original._id)}
            color="primary"  
            size="medium"   
            inputProps={{ 'aria-label': 'basic switch' }}  // Accessibility props
          />
      ),
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() =>navigate(`/dashboard/admin/formbuilder/create-form/${row.original._id}`)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Fields
          </button>
          <button
            onClick={() =>navigate(`/dashboard/admin/formbuilder/view-form/${row.original._id}`)}
            className="text-blue-500 hover:text-blue-700"
          >
            View
          </button>
        </div>
      ),
    },
  ]


  const breadcrumbData = [
    {
      name: 'Form Management',
      url: '/dashboard/admin/form',
    },
  ];

  return (
    <div>
            <Breadcrumb items={breadcrumbData} />
      <h1 className="text-xl md:text-3xl font-semibold">All Forms</h1>
      {isFormLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between p-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/dashboard/admin/form/create-form")}
            >
              Add form
            </button>
            <SearchBox />
          </div>
          <ReusableTable
            data={forms || []}
            editPath={"/dashboard/admin/form/edit-form"}
            columns={columns}   //Must define table columns according to your data
          // onDelete={handleDelete}
          // onStatusChange={handleStatusChange}
          />
          <Pagination totalItems={total} itemsPerPage={limit }/>
        </div>
      )}
    </div>
  );
};

export default Form;