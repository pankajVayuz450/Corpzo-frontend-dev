import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, toggleModal }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            toggleModal();
        }
    };

    const navigateToCreateForm = () => {
        toggleModal(); // Close the modal before navigating
        navigate('/create-form'); // Navigate to the form creation page
    };

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                toggleModal();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [toggleModal]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
        >
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                <h2 id="modalTitle" className="text-xl font-semibold mb-4">Create a New Form</h2>
                <div className="flex justify-end">
                    <button
                        onClick={navigateToCreateForm}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-150"
                    >
                        Create Form
                    </button>
                    <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-150"
                        aria-label="Close modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;