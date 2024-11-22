import { getSingleFaq } from '@/redux/admin/actions/FAQ';
import React, { Children, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { convert } from 'html-to-text';
import DOMPurify from 'dompurify';
import HeaderTitle from '@/components/common/HeaderTitle';
import TitleComponent from '@/components/common/TitleComponent';
import Breadcrumb from '@/widgets/layout/TopNavigation';
const ViewFaq = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { faq, isFetching } = useSelector((state) => state.faq);
    console.log(faq, "from view page");
    useEffect(() => {
        dispatch(getSingleFaq(id));
    }, [])
    const sanitizedHTML = DOMPurify.sanitize(faq.answer);
    console.log("faq.answer", faq.answer)
    const breadcrumbData=[
        {
            name : "FAQ Management", 
            url : "/dashboard/admin/faq", 
            children : [
                {
                    name : "View Document"
                }
            ]
        }
    ]
    return (
        <div>
            {
                isFetching ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <TailSpin height={50} width={50} color="blue" />
                    </div>
                ) : (
                    <>
                        <HeaderTitle title="View FAQ" />
                        <TitleComponent title="Corpzo | View FAQ"/>
                        <Breadcrumb items={breadcrumbData}/>
                        <div className='relative flex flex-col mt-6 gap-4 text-gray-700 bg-white shadow-md bg-clip-border p-4 rounded-xl w-full'>
                            <div className=''>
                                <span><strong>Question</strong> </span>
                                <h3 className="break-words text-lg">{faq.question} ?</h3> {/* Ensures question wraps */}
                            </div>

                            <div className=''>
                                <span><strong>Answer</strong> </span>
                                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                            </div>

                        </div>
                    </>

                )
            }
        </div>
    )
}

export default ViewFaq