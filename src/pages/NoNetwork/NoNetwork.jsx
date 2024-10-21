import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const NoNetwork = () => {
    const [online, setOnline] = useState(navigator.onLine)
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const handleOnline = () => {
            setOnline(true)
        }
        const handleOffline = () => {
            setOnline(false)
        }


        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        if (!online) {
            navigate("/no-network")
        } else {
           console.log(pathname, "pathname")
           if(pathname == '/no-network' ){
                navigate('/dashboard/admin/home')
                return
           }
            navigate(pathname)
        }
        return (() => {
            window.addEventListener('online', handleOnline)
            window.addEventListener('offline', handleOffline)
        })

    }, [online])
      
  function refreshPage() {
    window.location.reload(false);
  }
  
    return (

        <>

            {window.location.pathname === "/no-network"
                &&
                <div className="flex justify-center items-center h-screen overflow-y-hidden">
                    <div className='flex flex-col  justify-center items-center gap-4'>

                    <img src="/img/noInternet.svg" className="w-[50%]" alt="No Internet connected" />

                    <h4 className='text-lg text-orange-600'>No internet connection!</h4>
                    <h6 className="text-base text-gray-700">Please check your internet connection and try again.</h6>
                    <Button onClick={refreshPage}>Reload</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default NoNetwork