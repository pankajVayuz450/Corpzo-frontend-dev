import React from 'react';
import { Link } from 'react-router-dom';

// Define the BreadcrumbItem component
const BreadcrumbItem = ({ item, isLast }) => {
  return (
    <li className='font-medium text-gray-600 flex gap-2'>
      <Link to={item.url}>{item.name}</Link>
      {item.children && item.children.length > 0 && (
        <ul className='flex gap-2'>
          {item.children.map((child) => (
            <>{<span>/</span>} {/* Add slash between items */}
                <BreadcrumbItem key={child.name} item={child} />            
            </>
          ))}
        </ul>
      )}
    </li>
  );
};

// Define the Breadcrumb component
const Breadcrumb = ({ items }) => {
  return (
    <nav className='ml-3 absolute top-4'>
      <ul className='flex'>
        {items?.map((item, index) => (
          <>
          
            <BreadcrumbItem key={item.name} item={item} isLast={index === items.length - 1} />
            
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
