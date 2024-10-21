import { useEffect, useState, useCallback } from "react";
import {
  Input,
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

    dispatch(getAllFaqs(limit, page, query));
  }, [searchParams, dispatch]);

  // Clear filter
  const handleClearFilter = () => {
    setSearchQuery('');
    setSearchParams({});
  };


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

  return (
    <div className='w-full h-full'>
      <TitleComponent title={"CORPZO | FAQ Management"}></TitleComponent>
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
                        <div className="text-sm text-gray-500">{form.question.slice(0, 10)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                      </td>
                      <td>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {form.active === true ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(form.faqId)} className="text-blue-500 hover:text-blue-700">
                            Edit
                          </button>
                          <NavLink to={`/dashboard/admin/FAQ/view-faq/${form.faqId}`} className="text-blue-500 hover:text-blue-700">
                            View
                          </NavLink>
                          <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} />
                        </div>
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
  );
};

export default Faq;
