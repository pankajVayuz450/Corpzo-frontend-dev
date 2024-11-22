import HeaderTitle from '@/components/common/HeaderTitle';
import ReusableTable from '@/components/common/Tables';
import TableShimmer from '@/components/common/TableShimmer';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDateTime } from '@/Helpers/globalfunctions';
import { viewLogs } from '@/redux/admin/actions/Logs';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ReusableModal from '@/components/common/ReusableModal';

const ApplicationLogs = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { logs, isFetching } = useSelector((state) => state.logs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [content, setContent] = useState(null);
    
    const breadcrumbData = [
        {
            name: "Application Logs"
        }
    ];

    const toggleModal = (id) => {
        setIsModalOpen(!isModalOpen);

        if (id) {
            setSelectedLogId(id);
            const foundContent = logs.find((item) => item._id === id); // Use the id parameter directly here
            setContent(foundContent); 
        } else {
            setSelectedLogId(null);
            setContent(null);  
        }
    };

    useEffect(()=>{
        const foundContent = logs.find((item) => item._id === selectedLogId); // Use the id parameter directly here
        setContent(foundContent); 
        console.log(foundContent)
    }, [selectedLogId])

    useEffect(() => {
        const query = searchParams.get('search') || '';
        const page = searchParams.get('page') || 1;
        logs.length === 0 && dispatch(viewLogs(page, query, "moduleId=6710a6e8d9c6a418cdd46cc5"));
    }, [searchParams]);

    const columns = [
        {
            Header: 'Action by',
            accessor: 'name',
            Cell: ({ row }) => (row?.original?.action_by[0].name),
        },
        {
            Header: 'Action Type',
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
            Header: 'Logs Time',
            accessor: 'createdAt',
            Cell: ({ row }) => (formatReadableDateTime(row?.original?.createdAt)),
        },
    ];

    return (
        <div>
            <TitleComponent title={"CORPZO | Application Logs"} />
            <Breadcrumb items={breadcrumbData} />
            <HeaderTitle title="Logs" />

            {isFetching ? <TableShimmer /> : (
                <ReusableTable
                    data={logs || []}
                    editPath={`${window.location.pathname}/edit`}
                    columns={columns}
                />
            )}

            {/* Reusable Modal to display selected log content */}
            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => toggleModal(null)} 
                title="Log Details"
                cancelText='close'
            >
                {content?.actionDetails}
            </ReusableModal>
        </div>
    );
};

export default ApplicationLogs;
