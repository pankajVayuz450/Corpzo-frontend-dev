import HeaderTitle from '@/components/common/HeaderTitle'
import TitleComponent from '@/components/common/TitleComponent'
import ViewLogsData from '@/components/common/ViewLogs'
import { viewLogs } from '@/redux/admin/actions/Logs'
import Breadcrumb from '@/widgets/layout/TopNavigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const ChangeRequestLogs = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const {logs, totalCount, isFetching} = useSelector((state)=> state.logs)
    const breadcrumbData = [
        {
            name: 'Change Request',
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
       
       dispatch(viewLogs(page, query, "moduleName=request_chnage_agent"))
    }, [searchParams])

    return (
        <div className='mt-4'>
            <TitleComponent title={"CORPZO | View Logs"} />
            <Breadcrumb items={breadcrumbData} />
            <HeaderTitle title="Logs" totalCount={totalCount} />
        
            <ViewLogsData logsData={logs} isLoading={isFetching}/>

        </div>
        
    )
}

export default ChangeRequestLogs