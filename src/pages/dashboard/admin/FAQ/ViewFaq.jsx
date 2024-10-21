import { getSingleFaq } from '@/redux/admin/actions/FAQ';
import React, { useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { convert  } from 'html-to-text';
import DOMPurify from 'dompurify';
const ViewFaq = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { faq, isFetching } = useSelector((state) => state.faq);
    console.log(faq, "from view page");
    useEffect(() => {
        dispatch(getSingleFaq(id));
    }, [])
    const sanitizedHTML = DOMPurify.sanitize(faq.answer);
    console.log("faq.answer",faq.answer)
    return (
        <div>
            {
                isFetching ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <TailSpin height={50} width={50} color="blue" />
                    </div>
                ) : (
                    <>
                        <div className='relative flex flex-col mt-6 gap-4 text-gray-700 bg-white shadow-md bg-clip-border p-4 rounded-xl w-full'>
                            <div className=''>
                                <span><strong>Question</strong> </span>
                                <h3 className="break-words text-lg">{faq.question} ?</h3> {/* Ensures question wraps */}
                            </div>
                            
                            <div className=''>
                            <span><strong>Answer</strong> </span>
                            <span dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                            </div>
                            
                        </div>
                    </>

                )
            }
        </div>
    )
}

export default ViewFaq