import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <FiLoader className="animate-spin text-blue-500 text-6xl mb-4" />
            </div>
        </div>
    );
};

export default LoadingPage;
