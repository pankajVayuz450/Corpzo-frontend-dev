import HeaderTitle from '@/components/common/HeaderTitle';
import { getUserServices } from '@/redux/admin/actions/UserManagement';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa"; // Import icons
import {
    Button, Accordion,
    AccordionHeader,
    AccordionBody
} from '@material-tailwind/react';
import { FaHeart } from "react-icons/fa";

const ViewService = () => {
    const { serviceId } = useParams();
    const { userSteps } = useSelector((state) => state.userMgmt)
    const dispatch = useDispatch();

    console.log(userSteps[0], "userStepsuserStepsuserSteps")
    console.log(userSteps[0]?.delivrableVideoUrl, "userSteps[0]?.offerservices")
    const offersArray = userSteps[0]?.offerservices;

    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value); // Close if the same item is clicked, else open the new one
    };

    useEffect(() => {
        dispatch(getUserServices())
    }, [])
    const breadcrumbData = [
        {

            name: 'Service Management',
            url: '/dashboard/admin/service',
            children: [
                {
                    name: 'View Service',
                    url: '',
                },
            ],
        }
    ];
    console.log(userSteps[0]?.faqservices, "user detailssssssss")
    return (
        <>
            <Breadcrumb items={breadcrumbData} />
            <HeaderTitle title={"View Service"} />
            <div className='mt-4'>
                <div className='flex gap-4'>
                    <h2 className='font-bold text-lg'>{userSteps[0]?.name}</h2>
                    <span class="bg-gray-300 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300 flex justify-center items-center">
                        Business
                    </span>

                </div>

                <div>
                    {/* for text */}
                </div>

                {/* sertvicve key heighlights */}
                <div className="mt-4 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <div className="w-72 sm:w-auto bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex gap-3 items-center justify-center px-4 py-2 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <FaCheckCircle className="text-lg" /> {/* Increase icon size */}
                        <div className="text-left rtl:text-right">
                            <div className="-mt-1 font-sans text-base font-semibold">{userSteps[0]?.duration} days</div> {/* Increased font size */}
                            <div className="mb-1 text-sm">Duration</div> {/* Increased font size */}
                        </div>
                    </div>
                    <div className="w-72 sm:w-auto bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex gap-3 items-center justify-center px-4 py-2 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <FaCheckCircle className="text-lg" /> {/* Increase icon size */}
                        <div className="text-left rtl:text-right">
                            <div className="-mt-1 font-sans text-base font-semibold">Rs. {userSteps[0]?.cost}</div> {/* Increased font size */}
                            <div className="mb-1 text-sm">Cost</div> {/* Changed the label for clarity */}
                        </div>
                    </div>
                </div>
                {/* offers */}

                <div className='mt-4 '>
                    <h2 className='font-bold text-lg mb-4 '>Active Offers/Coupons</h2>
                    {
                        offersArray?.map((offer) => {
                            const data = offer.offers[0];
                            return (

                                <div className='flex  mb-4 shadow-lg'>
                                    {/* First Div - Coupon Percentage (20%) */}
                                    <div className=' w-1/12  bg-gray-200 flex items-center justify-center p-4 rounded-lg'>
                                        <span className='text-xl font-semibold'>{data.discountPercent.toFixed(2)}% Off</span>
                                    </div>

                                    {/* Second Div - Text (60%) */}
                                    <div className='w-3/4 bg-gray-100 flex flex-col  p-4 rounded-lg'>
                                        <h3 className='mb-4 text-lg font-semibold text-left'>{data?.offerTitle}</h3>
                                        <p className=''>{data?.offerDetail}</p>
                                    </div>

                                    {/* Third Div - Button (20%) */}
                                    <div className='w-1/3 flex items-center justify-center p-4'>
                                        <button className='bg-blue-gray-700 text-white rounded-lg px-4 py-2 hover:bg-blue-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-gra-300'>
                                            Claim Offer
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>



                {/* servcice avail buttomnn then delivverable video */}
                <div className='w-full mb-4'>
                    <p className='font-semibold text-gray-700'>A. Deliverable Video</p>

                    <video className='w-full h-60 md:h-80 lg:h-96' controls>
                        <source src={userSteps[0]?.delivrableVideoUrl} type="video/mp4" />
                        {/* <source src={`https://bridge-media-2021.s3.ap-south-1.amazonaws.com/2024-101729234018651_WIN_20241018_12_16_29_Pro.mp4`} type="video/mp4" /> */}
                    </video>
                </div>

                {/* service step video*/}
                <div className='w-full mb-4'>
                    <p className='font-semibold text-gray-700'>B. Service Step</p>

                    <video className='w-full h-60 md:h-80 lg:h-96' controls>
                        <source src={userSteps[0]?.stepsVideoUrl} type="video/mp4" />
                        {/* <source src={`https://bridge-media-2021.s3.ap-south-1.amazonaws.com/2024-101729234018651_WIN_20241018_12_16_29_Pro.mp4`} type="video/mp4" /> */}
                    </video>
                </div>
                {/* service dcuents video */}
                <div className='w-full mb-4'>
                    <p className='font-semibold text-gray-700'>C. Documents</p>

                    <video className='w-full h-60 md:h-80 lg:h-96' controls>
                        <source src={userSteps[0]?.documentVideoUrl} type="video/mp4" />
                        {/* <source src={`https://bridge-media-2021.s3.ap-south-1.amazonaws.com/2024-101729234018651_WIN_20241018_12_16_29_Pro.mp4`} type="video/mp4" /> */}
                    </video>
                </div>
                {/* about service */}
                <div className='mb-4'>
                    <h3 className='text-lg font-bold'>About Service.</h3>
                    <p>
                        {userSteps[0]?.about}
                    </p>
                </div>
                {/* service details  */}
                <div className='mb-4'>
                    <h3 className='text-lg font-bold'>Service Details.</h3>
                    <p>
                        {userSteps[0]?.details}
                    </p>
                </div>
                {/* faqs */}


                <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                    {userSteps[0]?.faqservices.map((faq, faqIndex) => (
                        faq.faq.map((item, index) => (
                            <Accordion key={`${faqIndex}-${index}`} open={open === `${faqIndex}-${index}`} className="w-full">
                                <AccordionHeader
                                    className="flex items-start gap-2"
                                    onClick={() => handleOpen(open === `${faqIndex}-${index}` ? 0 : `${faqIndex}-${index}`)}
                                >
                                    <span className="text-left break-words w-full"> {/* Ensure the span takes full width for wrapping */}
                                        <strong>{`${faqIndex * faq.faq.length + index + 1}. ${item.question}`}</strong> {/* Displaying the FAQ number */}
                                    </span>
                                    {open === `${faqIndex}-${index}` ? (
                                        // <FaChevronDown className="text-gray-600" />
                                        <FaChevronUp className="text-gray-600" />
                                    ) : (
                                        <FaChevronDown className="text-gray-600" />
                                    )}
                                </AccordionHeader>
                                <AccordionBody>
                                    <div dangerouslySetInnerHTML={{ __html: item.answer }} /> {/* Assuming 'answer' is the property containing the answer */}
                                </AccordionBody>
                            </Accordion>
                        ))
                    ))}
                </div>

            </div>
        </>
    )
}

export default ViewService