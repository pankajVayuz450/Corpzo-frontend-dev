
import TableShimmer from '@/components/common/TableShimmer';
import TitleComponent from '@/components/common/TitleComponent';
import { formatReadableDate } from '@/Helpers/globalfunctions';
import { deleteStep, getAllSteps, updateStatus } from '@/redux/admin/actions/Steps'
import { Switch } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { MdEdit } from 'react-icons/md';
const ServiceSteps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [stepToDelete, setStepToDelete] = useState(false)
  const handleOpen = () => setOpen(!open);
  const { serviceId } = useParams();
  console.log(serviceId, "service Id")
  const { stepsList, isFetching, isStatusLoading, totalCount } = useSelector((state) => state.steps)
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/steps/edit-step/${serviceId}/${id}`)
  }
  const handleStatus = (form) => {
    const newStatus = !form.active;
    const data = {
      active: newStatus,
      serviceId: form.serviceId,
      details: form.details
    };
    dispatch(updateStatus(form._id, data));
  }
  console.log(stepsList, "steps list")
  useEffect(() => {
    dispatch(getAllSteps(serviceId, undefined));
  }, [])

  const handleDelete = (id) => {
    setOpen(true)
    setStepToDelete(id);
  }

  const confirmDelete = (id) => {
    dispatch(deleteStep(stepToDelete));
    setOpen(false);
    setStepToDelete(null);
  }
  const breadcrumbData = [
    {
      name: 'Step Management',
    }
  ];
  return (
    <div>
      <TitleComponent title={"CORPZO | Steps"}></TitleComponent>
      <HeaderTitle title="Step Management" totalCount={totalCount}/>
      <Breadcrumb items={breadcrumbData} />
      <div className='flex gap-4 justify-between items-center w-full mt-4'>
        <NavLink to={`/dashboard/admin/steps/create-steps/${serviceId}`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Create Steps
        </NavLink>
      </div>

      {isFetching ? (
        <TableShimmer />
      ) : (
        <div className=''>
          {stepsList && stepsList.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr. No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Steps
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
                {stepsList && stepsList.map((form, index) => {
                  //   const idx = ((parseInt(searchParams.get("page") || 1) - 1) * parseInt(searchParams.get("limit") || 10)) + (index + 1);
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{form.details}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-sm text-gray-500 truncate max-w-xs"
                        >
                          {form.steps}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatReadableDate(form.createdAt)}</div>
                      </td>
                      <td>
                        <Switch disabled={isStatusLoading} checked={form.active} onChange={() => handleStatus(form)} />

                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(form._id)} className="text-gray-500 hover:text-gray-700">
                            <MdEdit/>
                          </button>

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
      {/* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Step?</DialogHeader>

        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={confirmDelete} variant="text" color="green" >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </div>
  )
}

export default ServiceSteps