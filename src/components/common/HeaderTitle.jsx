import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Typography } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const HeaderTitle = ({ title, totalCount, path }) => {
  const navigate = useNavigate()
  const handleNavigate=()=>{
    if(path || path === ""){
      navigate(path);
    }else{
      navigate(-1);
    }
  }
  return (
    <div className='absolute top-10 mb-2'>
      <div className="flex flex-row gap-4 items-center">
        <ChevronLeftIcon className="ml-1 fill-black h-5 w-5 cursor-pointer"  onClick={handleNavigate}/>
        <Typography variant="h4" color="blue-gray">
          {`${title} ${totalCount > 0 ? `(${totalCount})` : ''}`}
        </Typography>
      </div>
    </div>
  )
}

export default HeaderTitle