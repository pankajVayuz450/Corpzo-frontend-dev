import { getUserById } from '@/redux/admin/actions/UserManagement';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
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
import { TailSpin } from 'react-loader-spinner';
const ViewUser = () => {
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
          icon: UserCircleIcon,
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
      ];
    const {id} = useParams(); 
    const { user,isUserFetching } = useSelector((state) => state.userMgmt);
      console.log(user, "user")
    const dispatch = useDispatch()

    useEffect(()=>{
        if(id){
            dispatch(getUserById(id))
        }
    }, [id])
  return ( 
    <div>
         <Tabs value="basic_detail" >
      <TabsHeader className="w-1/2">
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
        {isUserFetching ? (
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
          </div>
        </TabPanel>
        )}
        <TabPanel  value={'business_detail'}>
        <span className='mr-auto'>
          <NavLink to="/dashboard/admin/usermanagement/view-all-business">
          View Al
          </NavLink>
          </span>
           <div className='flex flex-row gap-2'>
            
           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-[15rem] text-xs'>
              <div className='flex flex-row gap-1'>
                  <div className='w-1/3'>
                    image
                  </div>
                  <div className='w-2/3'>
                    <p className='font-semibold'>Business name </p>
                    <span>Business #1</span>
                  </div>
              </div>
              <div className='relative flex flex-col  gap-2 text-gray-700 bg-white p-2 '>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Type: </span>
              <p>{user.name}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='font-semibold w-1/3'> Registered Office: </span>
              <p>{user.email}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Status: </span>
              <p>Active</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Age: </span>
              <p>{user.phone}</p>
            </div>
          </div>
          <hr />
          <div className='flex justify-around'>
            <span>Critical</span>
            <span>2 Active services</span>
            <span>Service</span>
          </div>
           </div>
           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-[15rem] text-xs'>
              <div className='flex flex-row gap-1'>
                  <div className='w-1/3'>
                    image
                  </div>
                  <div className='w-2/3'>
                    <p className='font-semibold'>Business name </p>
                    <span>Business #1</span>
                  </div>
              </div>
              <div className='relative flex flex-col  gap-2 text-gray-700 bg-white p-2 '>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Type: </span>
              <p>{user.name}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='font-semibold w-1/3'> Registered Office: </span>
              <p>{user.email}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Status: </span>
              <p>Active</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Age: </span>
              <p>{user.phone}</p>
            </div>
          </div>
          <hr />
          <div className='flex justify-around'>
            <span>Critical</span>
            <span>2 Active services</span>
            <span>Service</span>
          </div>
           </div>
           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-[15rem] text-xs'>
              <div className='flex flex-row gap-1'>
                  <div className='w-1/3'>
                    image
                  </div>
                  <div className='w-2/3'>
                    <p className='font-semibold'>Business name </p>
                    <span>Business #1</span>
                  </div>
              </div>
              <div className='relative flex flex-col  gap-2 text-gray-700 bg-white p-2 '>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Type: </span>
              <p>{user.name}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='font-semibold w-1/3'> Registered Office: </span>
              <p>{user.email}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Status: </span>
              <p>Active</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Age: </span>
              <p>{user.phone}</p>
            </div>
          </div>
          <hr />
          <div className='flex justify-around'>
            <span>Critical</span>
            <span>2 Active services</span>
            <span>Service</span>
          </div>
           </div>
           
           </div>

           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-100 '>
              <div className='flex flex-row justify-between align-center font-bold'>
                <h2>Service : Private Limited Registration</h2>
                <span>
                  <ChevronDownIcon className='fill-black' height={20} width={20}/>
                </span>
              </div>
              <p>Business: Corpzo Ventures private limnited | Step: Aplication submission in progresss</p>
           </div>
           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-100 '>
              <div className='flex flex-row justify-between align-center font-bold'>
                <h2>Service : Private Limited Registration</h2>
                <span>
                  <ChevronDownIcon className='fill-black' height={20} width={20}/>
                </span>
              </div>
              <p>Business: Corpzo Ventures private limnited | Step: Aplication submission in progresss</p>
           </div>
           <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-100 '>
              <div className='flex flex-row justify-between align-center font-bold'>
                <h2>Service : Private Limited Registration</h2>
                <span>
                  <ChevronDownIcon className='fill-black' height={20} width={20}/>
                </span>
              </div>
              <p>Business: Corpzo Ventures private limnited | Step: Aplication submission in progresss</p>
           </div>

          </TabPanel>
      </TabsBody>
    </Tabs>
    </div>
  )
}

export default ViewUser