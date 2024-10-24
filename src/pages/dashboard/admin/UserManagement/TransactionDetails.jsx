import { getAllTransactions } from '@/redux/admin/actions/UserManagement'
import { Switch } from '@material-tailwind/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const TransactionDetails = () => {
    const dispatch = useDispatch();
    const { transactionDetails } = useSelector((state) => state.userMgmt)
    console.log(transactionDetails, "akldjnbladnlkafn")
    useEffect(() => {
        dispatch(getAllTransactions())
    }, [])
    return (
        <>
            {transactionDetails && transactionDetails.length > 0 ?
                (
                    <div className=" overflow-x-scroll overflow-y-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        payment Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactionDetails && transactionDetails.map((form, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{form.user_data[0].name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{form.user_data[0].email}</div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${form.paymentStatus === 'pending' ? 'text-blue-500' :
                                                form.paymentStatus === 'CAPTURED' ? 'text-green-500' :
                                                    'text-gray-500'
                                            }`}>
                                            <div className="text-sm">
                                                {form.paymentStatus.toUpperCase()}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{form.amount}</div>
                                        </td>
                                        <td >
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                                <Switch checked={form.active} onChange={() => { handleStatus(form) }} />
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {renderActionColumn(form)} */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleView(form._id)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    View Invoice
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                    </div>
                )}
        </>
    )
}

export default TransactionDetails