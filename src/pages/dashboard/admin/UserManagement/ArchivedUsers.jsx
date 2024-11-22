import HeaderTitle from '@/components/common/HeaderTitle'
import Pagination from '@/components/common/Pagination'
import SearchBoxNew from '@/components/common/SearchBoxNew'
import ReusableTable from '@/components/common/Tables'
import TableShimmer from '@/components/common/TableShimmer'
import TitleComponent from '@/components/common/TitleComponent'
import { formatDate, formatReadableDate } from '@/Helpers/globalfunctions'
import { getAllUsers } from '@/redux/admin/actions/UserManagement'
import Breadcrumb from '@/widgets/layout/TopNavigation'
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const ArchivedUsers = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { users, isUsersFetching,totalRecords } = useSelector((state) => state.userMgmt)
    console.log(users, "users")
    useEffect(() => {
        const query = searchParams.get('search') || '';
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;

        dispatch(getAllUsers({ page: page, limit: limit, search: query, isDeleted: true }));

    }, [searchParams, dispatch]);

    const breadcrumbData = [
        {
            name: 'Archived Users',
        }
    ];

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }) => (row?.original?.name),
        },
        {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ row }) => (row?.original?.email),
        },

        {
            Header: 'Gender',
            accessor: 'gender',
            Cell: ({ row }) => (row?.original?.gender ? row?.original?.gender : "N/A"),
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            Cell: ({ row }) => (row?.original?.phone),
        },

    ];
    return (
        <div>
            <TitleComponent title={"CORPZO | Archived Users"} />
            <Breadcrumb items={breadcrumbData} />
            <HeaderTitle title="Archived Users" />
            <div className="flex gap-4 justify-between items-center w-full mb-4">
                <div className="flex gap-4 ">
                </div>
                <SearchBoxNew queryParam="search" />
            </div>
            {
                isUsersFetching ? <TableShimmer /> : <ReusableTable
                    data={users || []}
                    editPath={`${window.location.pathname}/edit`}
                    columns={columns}   //Must define table columns according to your data
                />
            }
            {!isUsersFetching && totalRecords > 10 && <Pagination totalItems={totalRecords} itemsPerPage={10}></Pagination>}
        </div>
    )
}

export default ArchivedUsers