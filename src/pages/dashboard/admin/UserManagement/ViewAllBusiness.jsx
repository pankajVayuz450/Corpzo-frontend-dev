import React from 'react'

const ViewAllBusiness = () => {
  return (
    <div>
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
              <p>{}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='font-semibold w-1/3'> Registered Office: </span>
              <p>{}</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Status: </span>
              <p>Active</p>
            </div>
            <div className=' flex flex-row gap-2'>
              <span className='w-1/3 font-semibold'> Company Age: </span>
              <p>{}</p>
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
  )
}

export default ViewAllBusiness