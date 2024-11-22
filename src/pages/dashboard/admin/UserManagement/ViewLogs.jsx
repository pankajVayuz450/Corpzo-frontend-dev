import HeaderTitle from '@/components/common/HeaderTitle'
import Pagination from '@/components/common/Pagination'
import TitleComponent from '@/components/common/TitleComponent'
import ViewLogsData from "@/components/common/ViewLogs"
import { viewLogs } from '@/redux/admin/actions/Logs'
import Breadcrumb from '@/widgets/layout/TopNavigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const ViewLogs = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const { logs, totalCount, isFetching } = useSelector((state) => state.logs)

    const breadcrumbData = [
        {
            name: 'User Management',
            children: [
                {
                    name: "logs"
                }
            ]
        }
    ];

    useEffect(() => {
        const query = searchParams.get('search') || '';
        const page = searchParams.get('page') || 1;

        dispatch(viewLogs(page, query, "moduleName=users"))
    }, [searchParams])

    return (
        <div className='mt-4'>
            <TitleComponent title={"CORPZO | View Logs"} />
            <HeaderTitle title="Logs" totalCount={totalCount} />
            <Breadcrumb items={breadcrumbData}/>
            <ViewLogsData breadcrumbData={breadcrumbData} logsData={logs} isLoading={isFetching}/>
            {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
        </div>
    )
}

export default ViewLogs