import React from 'react';
import {
  Input,
} from "@material-tailwind/react";
import ReusableTable from "@/components/common/Tables";
import { NavLink } from 'react-router-dom';
const dyummydata = [
  {
    id : 1, 
    Page_Name : 123456, 
    Added_On : "2/9/2024",
    Status : "Active"
  }, 
  {
    id : 2, 
    Page_Name : 123457, 
    Added_On : "25/8/2024",
    Status : "In-Active"
  }, 
  {
    id : 3, 
    Page_Name : 123458, 
    Added_On : "22/8/2024",
    Status : "In-Active"
  }, 
  {
    id : 4, 
    Page_Name : 123459, 
    Added_On : "20/8/2024",
    Status : "Active"
  }, 
]
const Cms = () => {
  return (
    <div className='w-full'> 
      <div className='flex gap-4 justify-between items-center w-full mb-4'>
       
        <div className="w-[50%]">
          <Input
            size="sm"
            placeholder="Search..."
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </div>
      <ReusableTable data={dyummydata}/>
    </div>
  );
}

export default Cms;
