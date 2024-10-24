import HeaderTitle from '@/components/common/HeaderTitle';
import { getUserServices } from '@/redux/admin/actions/UserManagement';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
const ViewService = () => {
    const { serviceId } = useParams();
    const { userSteps } = useSelector((state) => state.userMgmt)
    const dispatch = useDispatch();

    console.log(userSteps, "userStepsuserStepsuserSteps")
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
    return (
        <>
            <Breadcrumb items={breadcrumbData} />
            <HeaderTitle title={"View Service"} />
            <div className='mt-4'>
                <div className='flex gap-4'>
                    <h2 className='font-bold text-lg'>{userSteps[0].name}</h2>
                    <span class="bg-gray-300 text-gray-800 text-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">Business</span>
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

                <div className='mt-4'>
                    <h2 className='font-bold text-lg'>Active Offers/Coupons</h2>

                    <div className='flex'>
                        {/* First Div - Coupon Percentage (20%) */}
                        <div className='w-1/12 bg-gray-200 flex items-center justify-center p-4 rounded-lg'>
                            <span className='text-xl font-semibold'>20% OFF</span>
                        </div>

                        {/* Second Div - Text (60%) */}
                        <div className='w-3/5 bg-gray-100 flex items-center justify-center p-4 rounded-lg'>
                            <p className='text-lg'>Limited time offer! Grab your discount now.</p>
                        </div>

                        {/* Third Div - Button (20%) */}
                        <div className='w-1/5 flex items-center justify-center p-4'>
                            <button className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                                Claim Offer
                            </button>
                        </div>
                    </div>
                </div>

                {/* documents */}

                {/* servcice avail buttomnn then delivverable video */}

                {/* service step video*/}

                {/* service dcuents video */}

                {/* about service */}

                {/* service details  */}

                {/* faqs */}
            </div>
        </>
    )
}

export default ViewService