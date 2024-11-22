import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Switch
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '@/redux/admin/actions/MasterSettings/Category';
import { getAllQuotation, updateQuotationStatus, updateStatus } from '@/redux/admin/actions/Quotation';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TitleComponent from '@/components/common/TitleComponent';
import TableShimmer from '@/components/common/TableShimmer';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { CiSearch } from "react-icons/ci";
import { MdClear, MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import { throttle } from '@/Helpers/globalfunctions';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import Pagination from '@/components/common/Pagination';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import HeaderTitle from '@/components/common/HeaderTitle';
import { getAllUsers } from '@/redux/admin/actions/Quotation';
import { updateEditPage } from '@/redux/admin/slices/Quotation'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { FaAngleLeft } from 'react-icons/fa';
const Quotation = () => {

  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((state) => state.category.categoryList);
  const isStatusLoading = useSelector((state) => state.category.isStatusLoading)

  const { quotationList, isFetching, totalCount, ativeInactiveStatus } = useSelector((state) => state.quotation)
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null);

  const navigate = useNavigate();
  const handleEdit = id => {
    navigate(`/dashboard/admin/update-quotation/${id}`);
    dispatch(updateEditPage(searchParams.get("page") || 1));
  };

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);

    dispatch(getAllQuotation(limit, page, query));

  }, [searchParams, dispatch]);

  const handleStatusChange = (status, quotationId, currentStatus) => {
    setSelectedStatus(status);
    setOriginalStatus(currentStatus);
    setSelectedQuotationId(quotationId);

    setIsModalOpen(true);
  };
  const confirmStatusChange = () => {
    if (selectedQuotationId && selectedStatus) {
      // dispatch(updateQuotationStatus(selectedQuotationId, selectedStatus));
      console.log(selectedQuotationId, selectedStatus, "selectedQuotationId, selectedStatus")
      dispatch(updateStatus({ status: selectedStatus, quotationId: selectedQuotationId }))
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStatus(null);
    setSelectedStatus(originalStatus);
    console.log(originalStatus, "original status")
    setSelectedQuotationId(null);
  };
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      quotationId : form._id,
      active: newStatus,
    }
    console.log(form, "data")
    dispatch(updateQuotationStatus(data));
  };
  const breadcrumbData = [
    {
      name: 'Quotation Management',
    }
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={"CORPZO | Quotation Management"} />
      <HeaderTitle title="Quotation Management" totalCount={totalCount} />
      <div className='w-full mt-4'>
        <div className='flex gap-4 justify-end items-center w-full mb-4'>
          <SearchBoxNew queryParam='search' />
        </div>
        <>
          {
            isFetching ? (
              <TableShimmer />
            ) : (
              <>
                {quotationList && quotationList.length > 0 ? (
                  <div className=" overflow-x-scroll overflow-y-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sr. No
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quotation Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quotation For
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Quotation Status
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
                        {quotationList && quotationList.map((form, index) => {
                          const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{idx}</div>
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{form.quotationTitle ? form.quotationTitle : "N/A"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{form.user_data[0].name ? form.user_data[0].name : "N/A"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{form.service_data[0].name ? form.service_data[0].name : "N/A"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                              </td> */}

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {form.quotationTitle ? (form.quotationTitle.length >= 15 ? `${form.quotationTitle.slice(0, 10)}...` : form.quotationTitle) : "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {form.user_data[0]?.name ? (form.user_data[0].name.length >= 15 ? `${form.user_data[0].name.slice(0, 10)}...` : `${form.user_data[0].name} (${form.user_data[0].email})`) : "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {form.service_data[0]?.name ? (form.service_data[0].name.length >= 15 ? `${form.service_data[0].name.slice(0, 10)}...` : form.service_data[0].name) : "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                {/* <Switch disabled={ativeInactiveStatus}  checked={form.active} onChange={() => handleStatus(form)} /> */}
                                  {form?.status}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {form.createdAt ? formatReadableDate(form.createdAt) : "N/A"}
                                </div>
                              </td>


                              <td className="px-6 py-4">
                                {/* {renderActionColumn(form)} */}

                                <Menu placement="bottom-end" >
                                  <MenuHandler>
                                    <Button className="p-0 shadow-none bg-white text-black hover:text-gray-700">
                                      <BsThreeDotsVertical size={20} />
                                    </Button>
                                  </MenuHandler>
                                  <MenuList className="max-h-72 overflow-visible">
                                    <MenuItem className='flex gap-4' onClick={() => handleEdit(form._id)}>

                                      <MdEdit />
                                      Edit
                                    </MenuItem>

                                    <MenuItem>
                                      <div onClick={(e) => e.stopPropagation()}>

                                        <Select
                                          label="Select Status"
                                          value={form.status}
                                          onChange={(value) => handleStatusChange(value, form._id, form.status)}
                                          className="z-[1000]"
                                          size='sm'
                                        >

                                          <Option value="closed">Closed</Option>
                                          <Option value="pending">Pending Approval</Option>
                                          <Option value="approved">Approved</Option>
                                          <Option value="rejected">Rejected</Option>

                                          <Option value="negotiation">In Negotiation</Option>
                                          <Option value="CAPTURED">Captured</Option>
                                        </Select>
                                      </div>
                                    </MenuItem>
                                  </MenuList>

                                </Menu>

                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                ) : (
                  <>
                    <div className="flex justify-center items-center h-screen">
                      <img src="/img/nodata_svg.svg" className="w-[50%]" alt="No data found" />
                    </div>
                  </>
                )}
                {!isFetching && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
              </>
            )
          }

        </>
        <Dialog open={isModalOpen} handler={setIsModalOpen}>
          <DialogHeader>Confirm Status Change</DialogHeader>
          <DialogBody>
            Are you sure you want to change the status to "{selectedStatus}"?
          </DialogBody>
          <DialogFooter className='flex gap-4'>
            <Button color="red" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="green" onClick={confirmStatusChange}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
        {!isFetching && quotationList.length > 10 && <Pagination totalItems={totalCount} itemsPerPage={10}></Pagination>}
      </div>
    </>
  );
}

export default Quotation;
