import { useEffect, useState } from "react";
import {
    Checkbox,
    Spinner,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { addServiceFaq, getServiceFaqs } from "@/redux/admin/actions/FAQ";
import HeaderTitle from "@/components/common/HeaderTitle";
import Breadcrumb from "@/widgets/layout/TopNavigation";
const ServiceFaqs = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const { serviceId } = useParams()
    const [selectAll, setSelectAll] = useState(false); // Add state for "Select All"
    const { serviceFaqs, isFetching, isAdding } = useSelector((state) => state.faq)


    // Fetch service faqs based on service Id
    useEffect(() => {
        dispatch(getServiceFaqs(serviceId));
    }, [dispatch]);


    useEffect(() => {
        if (serviceFaqs && serviceFaqs.length > 0) {
            const selected = serviceFaqs
                .filter(faq => faq.is_faq_added)
                .map(faq => faq._id);
            setSelectedIds(selected);
        }
    }, [serviceFaqs]);


    const handleCheckboxChange = (faqId) => {
        if (selectedIds.includes(faqId)) {
            // Remove the ID from selectedIds
            setSelectedIds(selectedIds.filter(id => id !== faqId));
        } else {
            // Add the ID to selectedIds
            setSelectedIds([...selectedIds, faqId]);
        }
    };


    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]); // Deselect all
        } else {
            const allIds = serviceFaqs.map(faq => faq._id); // Select all
            setSelectedIds(allIds);
        }
        setSelectAll(!selectAll); // Toggle "Select All" state
    };


    // const handleSelectAll = () => {
    //     if (selectAll) {
    //         const previouslySelected = serviceFaqs
    //             .filter(faq => faq.is_faq_added)
    //             .map(faq => faq._id);
    //         setSelectedIds(previouslySelected);
    //     } else {
    //         const allIds = serviceFaqs.map(faq => faq._id);
    //         setSelectedIds([...new Set([...selectedIds, ...allIds])]);
    //     }
    //     setSelectAll(!selectAll);
    // };


    useEffect(() => {
        if (serviceFaqs.length > 0 && selectedIds.length === serviceFaqs.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedIds, serviceFaqs]);

    const onSubmitChecked = () => {
        const faqData = {
            serviceId: serviceId,
            faqIdArray: selectedIds
        }
        dispatch(addServiceFaq(faqData, navigate));
        console.log(faqData, "selected faqs ka data")
    }
    const breadcrumbData = [
        {

            name: 'Service FAQs',
        }
    ];
    return (
        <>
            <TitleComponent title={"CORPZO | Service FAQs"}></TitleComponent>
            <HeaderTitle title="Service FAQs" />
            <Breadcrumb items={breadcrumbData} />
            <div className='w-full h-full mt-4'>
                <div className='flex gap-4 justify-between items-center w-full'>
                </div>


                {isFetching ? (
                    <TableShimmer />
                ) : (
                    <div>
                        {serviceFaqs && serviceFaqs.length > 0 ? (
                            <div className="w-full">
                                <div className="mb-1 flex items-center">
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                    <label className="ml-2">Select All</label>
                                </div>
                                <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-1">
                                    {serviceFaqs && serviceFaqs.map((serviceFaq) => (
                                        <div className="shadow-md rounded-md px-2 py-1 flex justify-between items-center">
                                            <NavLink className="w-[80%]" to={`/dashboard/admin/FAQ/view-faq/${serviceFaq.faqId}`}>{serviceFaq.question.slice(0, 15)}...</NavLink>
                                            <Checkbox
                                                checked={selectedIds.includes(serviceFaq._id)}
                                                onChange={() => handleCheckboxChange(serviceFaq._id)}
                                            />
                                        </div>


                                    ))}
                                </div>
                                <div className="w-full flex justify-end mb-4">
                                    <button
                                        onClick={onSubmitChecked}
                                        disabled={isAdding}
                                        className={`bg-blue-500 text-white font-bold mt-2 py-2 px-4 rounded-md
    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                                        {isAdding ? (
                                            <div className='flex justify-center items-center gap-3'>
                                                <Spinner color='white' className="h-4 w-4" />
                                                {"Adding FAQs"}
                                            </div>
                                        ) : (
                                            "Add FAQs"
                                        )}
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
            </div>
        </>
    );


};


export default ServiceFaqs;



