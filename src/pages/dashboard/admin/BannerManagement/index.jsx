import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllDepartments, updateStatus } from '@/redux/admin/actions/MasterSettings/Department';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { getBanners, updateBanner } from '@/redux/admin/actions/banner';
import { toast } from 'react-toastify';
import { removeFetchingBannersError, resetBanner, setBannerId } from '@/redux/admin/slices/bannerSlice';
import Pagination from '@/components/common/Pagination';
import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const BannerManagement = () => {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (!open) {
      setImgSrc("");
      setSelectedId("");
    }
  }, [open])

  const handleOpenImage = (row) => {
    setImgSrc(row?.bannerURL);
    setSelectedId(row?._id);
    handleOpen();
  }

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const navigate = useNavigate();

  const { banners,
    isFetchingBanners,
    fetchingBannersError, totalCount, isUpdatingBanner ,bannerIdState} = useSelector(state => state.banner)

  useEffect(() => {
    dispatch(getBanners({ page, limit }));
  }, [page, limit])

  useEffect(() => {
    if (fetchingBannersError) {
      toast.error("Error occur in fetching banners data")
    }
    dispatch(removeFetchingBannersError())
  }, [fetchingBannersError])

  const handleEdit = id => {
    navigate(`/dashboard/admin/edit-banner/${id}`);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const handleStatus = (data) => {

    const { _id, active } = data;
    const formData = new FormData();
    formData.append("active", !active);
    // formData.append("_id", _id);




    dispatch(updateBanner({ id: _id, formData }));
    dispatch(setBannerId(data.bannerId));
  }
 


  const columns = [
    {
      Header: 'Banner Title',
      accessor: 'bannerTitle',
      Cell: ({ row }) => (row?.original?.bannerTitle),
    },
    {
      Header: 'Banner Url',
      accessor: 'bannerURL',
      Cell: ({ row }) => (
        <button className='text-blue-400 hover:text-blue-600 transition-all' onClick={() => handleOpenImage(row?.original)}>View Banner</button>
      ),
    },
    {
      Header: 'User Type',
      accessor: 'userType',
      Cell: ({ row }) => (row?.original?.userType),
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
    {
      Header: 'Status ',
      accessor: 'active',
      Cell: ({ row }) => (
        <>
       
         {isUpdatingBanner && row.original.bannerId == bannerIdState?<TailSpin height={20} width={20} color="blue" /> :<Switch disabled={isUpdatingBanner} checked={row.original.active} onChange={() => { handleStatus(row.original) }} />}
         
        </>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleEdit(row.original?._id)}
            className="transition-all p-2 rounded"
          >
            <FaEdit className="" />
          </button>
        </div>
      ),
    }
  ];

  const breadcrumbData = [
    {
      name: 'Banners',
    }
  ];

  return (
    <div className='w-full'>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Banner Management"}></TitleComponent>
      <HeaderTitle title="Banner Management" totalCount={totalCount} />
      <Breadcrumb items={breadcrumbData} />
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
        <NavLink to="/dashboard/admin/add-banner" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Banner
        </NavLink>
      </div>
      {
        isFetchingBanners ? (
          <TableShimmer />
        ) : (
          <>
            <ReusableTable
              data={banners || []}
              editPath={`${window.location.pathname}/edit`}
              columns={columns}   //Must define table columns according to your data
              key={isUpdatingBanner}
            /> 
            
            {totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10} />}
          </>
        )
      }
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Banner Image</DialogHeader>
        <DialogBody className='flex items-center justify-center'>
          <img className='w-4/5 rounded-lg' src={imgSrc} alt="Banner Image" />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={() => handleEdit(selectedId)} variant="danger" color="green" >
            <span>Edit Banner</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default BannerManagement;
