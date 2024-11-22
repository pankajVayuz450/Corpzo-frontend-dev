import HeaderTitle from '@/components/common/HeaderTitle'
import Pagination from '@/components/common/Pagination'
import ReusableModal from '@/components/common/ReusableModal'
import SearchBoxNew from '@/components/common/SearchBoxNew'
import ReusableTable from '@/components/common/Tables'
import TableShimmer from '@/components/common/TableShimmer'
import TitleComponent from '@/components/common/TitleComponent'
import { formatReadableDate, formatReadableDateTime } from '@/Helpers/globalfunctions'
import { viewLogs } from '@/redux/admin/actions/Logs'
// import { viewLogs } from '@/redux/admin/actions/UserManagement'
import Breadcrumb from '@/widgets/layout/TopNavigation'
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const ViewLogs = ({breadcrumbData, logsData, isLoading, totalCount}) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const {logs, isFetching} = useSelector((state)=> state.logs)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [content, setContent] = useState(null);
    // const breadcrumbData = [
    //     {
    //         name: 'User Management',
    //         children: [
    //             {
    //                 name: "logs"
    //             }
    //         ]
    //     }
    // ];
    const toggleModal = (id) => {
        setIsModalOpen(!isModalOpen);

        if (id) {
            setSelectedLogId(id);
            const foundContent = logsData.find((item) => item._id === id); // Use the id parameter directly here
            setContent(foundContent); 
        } else {
            setSelectedLogId(null);
            setContent(null);  
        }
    };
    useEffect(()=>{
        const foundContent = logsData.find((item) => item._id === selectedLogId); // Use the id parameter directly here
        setContent(foundContent); 
        console.log(foundContent)
    }, [selectedLogId])
   

    const columns = [
        {
            Header: 'Action by',
            accessor: 'name',
            Cell: ({ row }) => (row?.original?.action_by[0].name),
        },
        {
            Header: 'action Type',
            accessor: 'actionType',
            Cell: ({ row }) => (row?.original?.actionType),
        },
        {
            Header: 'Value Before Action',
            accessor: 'valueBeforeAction',
            Cell: ({ row }) => (row?.original?.valueBeforeAction || "N/A"),
        },
        {
            Header: 'Value After Action',
            accessor: 'valueAfterAction',
            Cell: ({ row }) => (row?.original?.valueAfterAction || "N/A"),
        },
        {
            Header: 'View',
            accessor: '_id',
            Cell: ({ row }) => (
                <div className='text-gray-500 hover:text-gray-800' onClick={() => toggleModal(row.original._id)}>
                    <FaEye />
                </div>
            ),
        },
        {
            Header: 'Logs At',
            accessor: 'createdAt',
            Cell: ({ row }) => (formatReadableDateTime(row?.original?.createdAt)),
        },

    ];
    return (
        <div className='mt-4'>
        <div className='w-full flex justify-end'>
            <SearchBoxNew queryParam='search'/>
        </div>
            {
                isLoading ? <TableShimmer /> : <ReusableTable
                    data={logsData || []}
                    editPath={`${window.location.pathname}/edit`}
                    columns={columns}   //Must define table columns according to your data
                />
            }
            {!isLoading && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
            <ReusableModal
                isOpen={isModalOpen}
                cancelText='close'
                onClose={() => toggleModal(null)}  
                title="Log Details"
            >
                {content?.actionDetails}
            </ReusableModal>
        </div>
        
    )
}

export default ViewLogs