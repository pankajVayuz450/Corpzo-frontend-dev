import TitleComponent from '@/components/common/TitleComponent';
import { getSingleInvestor } from '@/redux/admin/actions/InvestorManagement';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { ShimmerSectionHeader } from 'shimmer-effects-react';
const ViewInvestor = () => {
    const dispatch = useDispatch()
    const {id} = useParams(); 
    const {investor, isFetching} = useSelector((state)=> state.investors); 
    console.log(investor, "investor")
    useEffect(()=>{
        dispatch(getSingleInvestor(id));
    }, [])
  return (
    <div>
         <TitleComponent title={"CORPZO | View Investor"}/>
        {
            isFetching ? (
                <div className='w-1/2'>
                    <ShimmerSectionHeader center={false} titleLine={1} subtitleLine={6} mode="light" />
                </div>
            ) : (
                <div className='relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-1/2 text-xs'>
              <div className='flex flex-row gap-1'>
                  <div className='w-2/3'>
                    <h3 className='font-semibold text-lg'>Investor Details  </h3>
                  </div>
              </div>
              <hr />
              <div className='relative flex flex-col  gap-2 text-gray-700 bg-white p-2 '>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold text-sm'> Name : </span>
              <p className='text-sm'>{investor.name}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold text-sm'> Email : </span>
              <p className='text-sm'>{investor.email}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold text-sm'> Status : </span>
              <p className='text-sm'>Active</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold text-sm'> Phone No. : </span>
              <p className='text-sm'>{investor.phoneNo}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold text-sm'> Type : </span>
              <p className='text-sm'>{investor.type}</p>
            </div>
          </div>
          
          {/* <div className='flex justify-around'>
            <span>Critical</span>
            <span>2 Active services</span>
            <span>Service</span>
          </div> */}
           </div>
            )
        }
        
    </div>
  )
}

export default ViewInvestor