import { getAllBusiness, getAllProgress, getAllTransactions, getUserById, getUserServices } from '@/redux/admin/actions/UserManagement';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { MdBusinessCenter } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { TbTransactionRupee } from "react-icons/tb";

import { TailSpin } from 'react-loader-spinner';
import BusinessDetails from './BusinessDetails';
import ServiceDetails from './ServiceDetails';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import HeaderTitle from '@/components/common/HeaderTitle';
import TransactionDetails from './TransactionDetails';
import Breadcrumb from '@/widgets/layout/TopNavigation';
const ViewUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const data = [
    {
      label: "Basic Detail",
      value: "basic_detail",
      icon: Square3Stack3DIcon,
      desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Business Detail",
      value: "business_detail",
      icon: MdBusinessCenter,
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    // {
    //   label: "Service Detail",
    //   value: "service_details",
    //   icon: FaWrench,
    //   desc: `Because it's about motivating the doers. Because I'm here
    //       to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
    {
      label: "Transaction Detail",
      value: "transaction_details",
      icon: TbTransactionRupee,
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];
  const { id } = useParams();
  const { user, isUserFetching,transactionFetching,  isBusinessFetching, isServiceFetching } = useSelector((state) => state.userMgmt);
  console.log(user, "user")
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id))
    }
    // dispatch(getAllBusiness(10, 1, '','66da879e8ea314c944ea2db4'))
    dispatch(getUserServices())
    dispatch(getAllProgress())
   
   dispatch(getAllTransactions())
   
  }, [id])
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    setSearchQuery(query);
    dispatch(getAllBusiness(limit, page, query,'66da879e8ea314c944ea2db4'))
  }, [searchParams, dispatch]);
  const breadcrumbData = [
    {
          name: 'User Management',
         url: "/dashboard/admin/usermanagement", 
         children: [
          {
            name:  'View User Details',
            url:'',
          },
        ],
    }
  ];
  return (
    <div>
      <HeaderTitle title="View User"/>
      <Breadcrumb items={breadcrumbData}/>
      <Tabs value="basic_detail" >
        <TabsHeader className="w-full">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {isUserFetching ||isBusinessFetching || isServiceFetching || transactionFetching ? (
            <div className="flex justify-center items-center min-h-screen">
              <TailSpin height={50} width={50} color="blue" />
            </div>
          ) : (
            <TabPanel value={'basic_detail'}>
              <div className='relative flex flex-col mt-6 gap-4 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-1/2'>
                <div className=' flex flex-row'>
                  <span className='w-1/3 font-semibold'> Name : </span>
                  <p>{user.name}</p>
                </div>
                <div className=' flex flex-row'>
                  <span className='font-semibold w-1/3'> Email : </span>
                  <p>{user.email}</p>
                </div>
                <div className=' flex flex-row'>
                  <span className='w-1/3 font-semibold'> Phone Number : </span>
                  <p>{user.phone}</p>
                </div>
                {user.active && <div className=' flex flex-row'>
                  <span className='w-1/3 font-semibold'> Status : </span>
                  <p>{user.active ? "Active" : "In Active"}</p>
                </div>}
                <div className=' flex flex-row'>
                  <span className='w-1/3 font-semibold'> Gender : </span>
                  <p>{user.gender}</p>
                </div>
              </div>
            </TabPanel>
          )}
          <TabPanel value={'business_detail'}>
            <span className='mr-auto'>
            <SearchBoxNew placeholder='Search businesses' queryParam='search'/>
            </span>
            <BusinessDetails />
          </TabPanel>
          <TabPanel value={'service_details'}>
            {/* <ServiceDetails /> */}
          </TabPanel>
          <TabPanel value={'transaction_details'}>
            <TransactionDetails />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default ViewUser