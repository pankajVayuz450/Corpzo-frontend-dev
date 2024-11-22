import HeaderTitle from '@/components/common/HeaderTitle';
import NoData from '@/components/common/NoData';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import ReusableTable from "@/components/common/Tables";
import TableShimmer from '@/components/common/TableShimmer';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { getAllCategories, updateStatus } from '@/redux/admin/actions/MasterSettings/Category';
import { updateEditPage } from '@/redux/admin/slices/MasterSettings/CategorySlice/categorySlice';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { Switch } from "@material-tailwind/react";
import { useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
const Category = () => {

  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();

  const { categoryList, totalCount, isFetching, isStatusLoading, childLoading } = useSelector((state) => state.category)

  const navigate = useNavigate();
  const handleEdit = id => {
    navigate(`/dashboard/admin/masterSettings/Category/edit-category/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    dispatch(getAllCategories(limit, page, query));

  }, [searchParams, dispatch]);

  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      categoryName: form.categoryName,
      active: newStatus,
    }
    dispatch(updateStatus(form.categoryId, data, navigate));
  };

  const columns = [
    {
      Header: 'Category',
      accessor: 'categoryName',
      Cell: ({ row }) => (row?.original?.categoryName),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatReadableDate(value),
    },
    {
      Header: 'Status ',
      accessor: 'active',
      Cell: ({ row }) => (
        <>
          {/* <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => { handleStatus(row.original) }} /> */}
          {childLoading[row.original.categoryId] ? <TailSpin height={20} width={20} color="blue" /> : <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => handleStatus(row.original)} />}

        </>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleEdit(row.original?.categoryId)}
            className="transition-all p-2 rounded"
          >
            <MdEdit />
          </button>
        </div>
      ),
    }
  ];
  const breadcrumbData = [
    {


      name: 'Master Settings',
      children: [
        {
          name: 'Category',
          url: '/dashboard/admin/masterSettings/Category',
        },
      ],
    }
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Category"} />
      <HeaderTitle title="Category Management" totalCount={totalCount} />
      <div className='w-full mt-4'>
        <div className='flex gap-4 justify-between items-center w-full mb-4'>
          <NavLink to="/dashboard/admin/masterSettings/Category/add-category" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create Category
          </NavLink>
          <SearchBoxNew queryParam='search' />
        </div>
        <>
          {
            isFetching ? (
              <TableShimmer />
            ) : (
              <>
                {categoryList && categoryList.length > 0 ? (
                  <ReusableTable data={categoryList || []} columns={columns} totalData={totalCount} key={isStatusLoading} />
                ) : (
                  <><NoData /></>
                )}
              </>
            )
          }

        </>
        {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
      </div>
    </>
  );
}

export default Category;