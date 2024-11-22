import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Switch,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdClear } from "react-icons/md";
import { throttle } from '@/Helpers/globalfunctions';
import { convert } from "html-to-text";
import { getAllFaqs, updateStatus } from "@/redux/admin/actions/FAQ";
import { updateEditPage } from "@/redux/admin/slices/FAQ";
import SearchBoxNew from "@/components/common/SearchBoxNew";
import Pagination from "@/components/common/Pagination";
import HeaderTitle from "@/components/common/HeaderTitle";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const Faq = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { faqList, isFetching, totalCount, totalPages, isStatusLoading } = useSelector((state) => state.faq)
  const navigate = useNavigate();

  // Handle edit FAQ action
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/FAQ/edit-faq/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
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
  // Automatically fetch FAQ based on searchParams
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    dispatch(getAllFaqs(limit, page, query));
  }, [searchParams, dispatch]);


  const breadcrumbData = [
    {

      name: 'FAQ Management',
      url: '/dashboard/admin/faq',
    }
  ];
  return (
    <>
      <TitleComponent title={"CORPZO | FAQ Management"}></TitleComponent>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={"FAQ"} totalCount={totalCount} />

      <div className='w-full h-full mt-2'>
        <div className='flex gap-4 justify-between items-center w-full mb-4'>
          <NavLink to="/dashboard/admin/FAQ/create-faq" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create FAQ
          </NavLink>
          <SearchBoxNew searchParams='search' />
        </div>

        {isFetching ? (
          <TableShimmer />
        ) : (
          <div className=''>
            {faqList && faqList.length > 0 ? (
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
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faqList && faqList.map((form, index) => {
                    const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{idx}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500"> {form.question && form.question.length > 10 ? `${form.question.slice(0, 10)}...` : form.question}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                        </td>
                        <td>

                          <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} />

                        </td>
                        {/* <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => handleEdit(form.faqId)} className="text-blue-500 hover:text-blue-700">
                              Edit
                            </button>
                            <NavLink to={`/dashboard/admin/FAQ/view-faq/${form.faqId}`} className="text-blue-500 hover:text-blue-700">
                              View
                            </NavLink>
                          </div>
                        </td> */}
                         <td className="px-6 py-4">

                        <Menu placement="bottom-end">
                          <MenuHandler>
                            <Button className="p-0 shadow-none bg-white text-black hover:text-gray-700">
                              <BsThreeDotsVertical size={20} />
                            </Button>
                          </MenuHandler>
                          <MenuList >
                            <MenuItem className="flex gap-4" onClick={() => handleEdit(form.faqId)}>
                            <MdEdit/>
                              Update FAQ
                            </MenuItem>
                            <NavLink  to={`/dashboard/admin/FAQ/view-faq/${form.faqId}`}>
                              
                              <MenuItem className="flex gap-4">
                              <FaEye/>
                                View FAQ
                              </MenuItem>
                            </NavLink>
                          </MenuList>
                        </Menu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center h-screen">
                <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
              </div>
            )}
          </div>
        )}

        {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}

      </div>
    </>
  );
};

export default Faq;
