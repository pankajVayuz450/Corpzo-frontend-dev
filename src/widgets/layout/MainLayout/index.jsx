import Pagination from '@/components/common/Pagination';
import React from 'react'
import Breadcrumb from '../TopNavigation';
import TitleComponent from '@/components/common/TitleComponent';
import HeaderTitle from '@/components/common/HeaderTitle';
import { NavLink } from 'react-router-dom';
import SearchBoxNew from '@/components/common/SearchBoxNew';
import TableShimmer from '@/components/common/TableShimmer';

const MainLayout = ({ link, children, loading, totalCount, itemsPerPage, breadcrumbData, linkTitle, headerComponenetData, titleComponentData, searchBoxVisible=true }) => {
    return (
        <div className='w-full mt-4'>
            <Breadcrumb items={breadcrumbData} />
            <TitleComponent title={titleComponentData}></TitleComponent>
            <HeaderTitle title={headerComponenetData} totalCount={totalCount} />
            <div className='flex gap-4 justify-between items-center w-full mb-4'>
                <NavLink to={link} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {linkTitle}
                </NavLink>
                {searchBoxVisible && <SearchBoxNew queryParam='search' />}
            </div>
            {loading ? (
                <TableShimmer />
            ) : (

                <>
                    {
                        children
                    }
                </>

            )}

            {/* {!loading && totalCount > 10 && <Pagination totalItems={totalCount} itemsPerPage={itemsPerPage}></Pagination>} */}


        </div>
    )
}

export default MainLayout