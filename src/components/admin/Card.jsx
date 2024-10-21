import React from 'react';

const Card = ({ title, children, onClick }) => {
  return (
    <div onClick={onClick} className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 md:max-w-xl lg:max-w-2xl" style={{ padding: '2vw' }}>
      {title && (
        <div style={{ margin: '1vw 0' }}>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white" style={{ fontSize: '1.5vw' }}>{title}</h1>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export default Card;