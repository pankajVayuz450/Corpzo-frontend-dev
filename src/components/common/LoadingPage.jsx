import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <FiLoader className="animate-spin text-blue-500 text-6xl mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
                <p className="text-gray-500">Please wait while we fetch your data</p>
            </div>
        </div>
    );
};

export default LoadingPage;
