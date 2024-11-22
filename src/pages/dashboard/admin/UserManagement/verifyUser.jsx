import { verifyUser, verifyUserFormTable } from '@/redux/admin/actions/UserManagement';
import { Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const VerifyUser = () => {

    const dispatch = useDispatch()
    const {userId} = useParams(); 
    
    const verifyUser = () => {
       
        dispatch(verifyUserFormTable({ userId: userId }))
      }

      useEffect(()=>{
        verifyUser()
      }, [])
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
        <Typography className='text-lg font-bold'>Verifying your account, please wait...</Typography>
    </div>
  );
};

export default VerifyUser;
