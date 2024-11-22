import HeaderTitle from '@/components/common/HeaderTitle';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import ReusableTable from '@/components/common/Tables';
import TableShimmer from '@/components/common/TableShimmer';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { getStateWiseServiceCharges } from '@/redux/admin/actions/Services';
import { updateServiceEditPage } from '@/redux/admin/slices/Service';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { Switch, useSelect } from '@material-tailwind/react';
import React, { useEffect } from 'react'
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ViewServiceCharges = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { serviceId } = useParams()
    const [searchParams] = useSearchParams()
    const { stateWiseChargesList, isStateWiseServiceLoading, stateWiseServiceChargesCount } = useSelector((state) => state.service);

    useEffect(() => {

        const query = searchParams.get('search') || '';
        console.log(query, "query")
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;

        dispatch(getStateWiseServiceCharges(serviceId, page, limit, query))
    }, [searchParams, dispatch])

    const handleEdit=(id)=>{
        navigate(`/dashboard/admin/services/update-charges/${serviceId}/${id}`)
        dispatch(updateServiceEditPage(searchParams.get('page') || 1))
    }
    const columns = [
        {
            Header: 'State',
            accessor: 'state',
            Cell: ({ row }) => (row?.original?.state),
        },
        {
            Header: 'DSC price',
            accessor: 'dscPrice',
            Cell: ({ row }) => (row?.original?.dscPrice),
        },
        {
            Header: 'RUN + PAN/TAN',
            accessor: 'runPanTan',
            Cell: ({ row }) => (row?.original?.runPanTan),
        },
        {
            Header: 'State filing fee',
            accessor: 'stateFilingFee',
            Cell: ({ row }) => (row?.original?.stateFilingFee),
        },
        {
            Header: 'Estimated total',
            accessor: 'estimatedTotal',
            Cell: ({ row }) => (row?.original?.estimatedTotal),
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            Cell: ({ value }) => formatReadableDate(value),
        },
        // {
        //   Header: 'Status ',
        //   accessor: 'active',
        //   Cell: ({ row }) => (
        //     <>
        //       <Switch  checked={row.original.active} onChange={() => handleStatus(row.original)} />
        //       {/* {childLoading[row.original.categoryId] ? <TailSpin height={20} width={20} color="blue" /> : <Switch disabled={isStatusLoading} checked={row.original.active} onChange={() => handleStatus(row.original)} />} */}

        //     </>
        //   ),
        // },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                    onClick={()=>handleEdit(row.original._id)}
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
            name: "Service",
            url: "",

            children: [
                {
                    name: "Service Charges"
                }
            ]
        }
    ]
    return (
        <>
            <HeaderTitle title={"Service charges"} />
            <TitleComponent title={"CORPZO | Service Charges"} />
            <Breadcrumb items={breadcrumbData} />

            <div className='flex justify-end'>
                <SearchBoxNew queryParam='search'/>
        
            </div>
            {
                isStateWiseServiceLoading ? <TableShimmer /> :
                    (<ReusableTable data={stateWiseChargesList || []} columns={columns} />)
            }


            {stateWiseServiceChargesCount > 10 && <Pagination totalItems={stateWiseServiceChargesCount} itemsPerPage={10} />}

        </>
    )
}

export default ViewServiceCharges