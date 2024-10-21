import { useEffect, useState, useCallback } from "react";
import {
    Checkbox,
    Input,
    Spinner,
    Switch,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdClear } from "react-icons/md";
import { throttle } from '@/Helpers/globalfunctions';
import { getAllFaqs, addServiceFaq, getServiceFaqs, updateStatus } from "@/redux/admin/actions/FAQ";
import { updateEditPage } from "@/redux/admin/slices/FAQ";
const ServiceFaqs = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const { serviceId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const { serviceFaqs, isFetching, isAdding, totalPages, isStatusLoading } = useSelector((state) => state.faq)
    const navigate = useNavigate();

    // Handle edit FAQ action
    const handleEdit = (id) => {
        navigate(`/dashboard/admin/FAQ/edit-faq/${id}`);
        dispatch(updateEditPage(searchParams.get("page") || 1));
    };

    // Handle pagination
    const handlePageClick = (e) => {
        if (searchQuery !== "") {
            setSearchParams({ page: e.selected + 1, limit: 10, search: searchQuery });
        } else {

            setSearchParams({ page: e.selected + 1, limit: 10 });
        }
    };

    // Toggle FAQ status
    const handleStatus = (form) => {
        const newStatus = !form.active;
        const data = {
            question: form.question,
            answer: form.answer,
            active: newStatus,
        };
        dispatch(updateStatus(form.faqId, data));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    // Automatically fetch FAQ based on searchParams
    useEffect(() => {
        const query = searchParams.get('search') || '';
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;

        setSearchQuery(query);

        dispatch(getServiceFaqs(serviceId));
    }, [searchParams, dispatch]);

    // Clear filter
    const handleClearFilter = () => {
        setSearchQuery('');
        setSearchParams({});
    };

    useEffect(() => {
        if (serviceFaqs && serviceFaqs.length > 0) {
            const selected = serviceFaqs
                .filter(faq => faq.is_faq_added) // Adjust based on API response to mark selected FAQs
                .map(faq => faq._id); // Extract the selected FAQ IDs
            setSelectedIds(selected);
        }
    }, [serviceFaqs]);

    const throttledSearch = useCallback(throttle(() => {
        const regex = /^[a-zA-Z0-9 ]*$/;
        if (searchQuery === "") {
            toast.warn("Search cannot be empty");
            return;
        } else if (searchQuery.trim() === "") {
            toast.warn("Search cannot be just spaces");
            return;
        } else if (!regex.test(searchQuery)) {
            toast.warn("Special characters are not allowed");
            return;
        } else if (searchQuery !== "" && searchQuery.length > 50) {
            toast.warn("Search term cannot be more than 50 characters long")
            return
        } else if (searchQuery.length < 3) {
            toast.warn("Search cannot be less than 3 characters")
            return
        } else {
            setSearchParams({ search: searchQuery });
        }
    }, 500), [searchQuery, dispatch, setSearchParams]);

    const handleSearch = () => {
        throttledSearch();
    };

    const handleCheckboxChange = (faqId) => {
        if (selectedIds.includes(faqId)) {
            // Remove the ID from selectedIds
            setSelectedIds(selectedIds.filter(id => id !== faqId));
        } else {
            // Add the ID to selectedIds
            setSelectedIds([...selectedIds, faqId]);
        }
    };
    const onSubmitChecked = () => {
        const faqData = {
            serviceId: serviceId,
            faqIdArray: selectedIds
        }
        dispatch(addServiceFaq(faqData));
        console.log(faqData, "selected faqs ka data")
    }
    return (
        <div className='w-full h-full'>
            <TitleComponent title={"CORPZO | FAQ Management"}></TitleComponent>
            <div className='flex gap-4 justify-between items-center w-full mb-4'>
            </div>

            {isFetching ? (
                <TableShimmer />
            ) : (
                <div className='w-full'>
                    {serviceFaqs && serviceFaqs.length > 0 ? (
                        <div className="w-full">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sr. No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Question
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {serviceFaqs && serviceFaqs.map((form, index) => {
                                        const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                                        return (
                                            <tr className="px-4 py-2" key={index}>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{idx}</div>
                                                </td>
                                                <td className="px-2 py-1 whitespace-nowrap ">
                                                    <div className="text-sm text-gray-500"><NavLink to={`/dashboard/admin/FAQ/view-faq/${form._id}}`}>{form.question.slice(0, 25)}...</NavLink></div>
                                                </td>
                                                <td className="px-2 py-1 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                                                </td>
                                                <td className="px-2 py-1">
                                                    <Checkbox
                                                        checked={selectedIds.includes(form._id)}
                                                        onChange={() => handleCheckboxChange(form._id)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                            <div className="w-full flex justify-end mb-4">
                                <button
                                    onClick={onSubmitChecked}
                                    className="bg-blue-500 text-white font-bold mt-2 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    {isAdding ?
                                        <div className='flex justify-center items-center gap-3'>
                                            <Spinner color='white' className="h-4 w-4" />
                                            { "Adding FAQs"}
                                        </div>
                                        : "Add FAQs"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-screen">
                            <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                        </div>
                    )}
                </div>
            )}

            {/* {!isFetching && totalCount > 10 && (
                <ReactPaginate
                    className=""
                    previousLabel={
                        serviceFaqs.length > 0 ? (
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        ) : null
                    }
                    nextLabel={
                        totalCount > 0 ? (
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        ) : null
                    }
                    breakLabel={"..."}
                    pageCount={totalCount / 10}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={4}
                    onPageChange={handlePageClick}
                    forcePage={Number(searchParams.get("page")) ? Number(searchParams.get("page")) - 1 : 0}
                    containerClassName={"flex items-center justify-center mt-3 mb-4"}
                    pageClassName={
                        "block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md m-2"
                    }
                    pageLinkClassName={"page-link"}
                    previousClassName={
                        Number(searchParams.get("page")) === 1 || !searchParams.get("page")
                            ? "page-item opacity-50 pointer-events-none"
                            : "page-item"
                    }
                    previousLinkClassName={"page-link"}
                    nextClassName={
                        Number(searchParams.get("page")) === totalPages
                            ? "page-item opacity-50 pointer-events-none"
                            : "page-item"
                    }
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"bg-blue-500 text-white"}
                />
            )} */}
        </div>
    );

};

export default ServiceFaqs;
