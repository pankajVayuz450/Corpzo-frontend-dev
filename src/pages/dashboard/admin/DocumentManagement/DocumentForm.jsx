import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addDocuments, updateDocument, uploadDocument } from '@/redux/admin/actions/Document';
import { useParams } from 'react-router-dom';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import { MdCancel } from 'react-icons/md';

const folderInitalValues = {
    folderName: ""
}
const fileInitalValues = {
    files: null,
    folderId: '',
    userId: ''
}
const DocumentForm = ({ open, handleOpen, modalType, id, folderId }) => {
    const folderValidationSchema = Yup.object().shape({
        folderName: Yup.string()
            .required('Folder Name is required.')
            .max(30, 'Folder Name can be at most 30 characters long')
            .min(3, "Folder Name must be at least 3 characters long")
            .matches(/^[a-zA-Z0-9\- ]+$/, 'Folder Name can only contain alphabets, numbers, hyphens, and spaces'),
    });

    const fileValidationSchema = Yup.object().shape({
        folderName: Yup.mixed().required('File is required')
    });

    const dispatch = useDispatch();
    const { isAdding, documentList } = useSelector((state) => state.document);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const handleClose=()=>{
        handleOpen()
        setFileError(null)
    }
    const {
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        setTouched,
        isValid,
        setErrors,
        dirty,
        setFieldTouched
    } = useFormik({
        initialValues: modalType === 'folder' ? folderInitalValues : fileInitalValues,
        validationSchema: modalType === "folder" ? folderValidationSchema : null,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, action) => {
            setTouched({}, false);
            console.log(values, "folder valuies")
            if (modalType === 'folder') {
                if (id) {
                    console.log(values, "folder valuies")
                    const data = documentList.find((document) => document.folderId === id);
                    dispatch(updateDocument(data._id, values.folderName));
                } else {
                    console.log(values, "folder valuiesasdasd")
                    const folderData = {
                        folderName: handleExtraSpaces(values.folderName)
                    }
                    dispatch(addDocuments(folderData));
                }
            } else {
                if (!file) {
                    setFileError("Please select a file before proceeding.");
                    return;
                }
                // File upload handling 
                const formData = new FormData();
                formData.append('files', file)
                if (folderId) {
                    formData.append('folderId', folderId);
                }
                console.log(file, "file mil gyi ")
                dispatch(uploadDocument(formData))
            }
            setErrors({});
            setFileError("");
        },
    });
    const allowedExtensions = [
        "pdf", "doc", "docx", "dot", "dotx", 
        "xls", "xlsx", "xlsm", "xltx", 
        "ppt", "pptx", "pps", "ppsx",
        "odt", "ods", "odp",
        "rtf", "txt", "csv",
        "md", "xml", "html", "htm",
        "epub", "mobi", "tex"
      ];
      
    // Function to handle file change
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0]; // Get the first file from the input
    //     setFile(file); // Set the file in state
    //     console.log(file, "Selected file"); // Log the file to verify
    //     setFileError(selectedFile ? "" : "Please select a file before proceeding.");
    // };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the first file from the input
    
        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension and normalize case
    
            // Check if the file extension is allowed
            if (allowedExtensions.includes(fileExtension)) {
                setFile(selectedFile); // Set the file in state
                setFileError(''); // Clear any previous errors
                console.log(selectedFile, 'Selected file'); // Log the file to verify
            } else {
                setFile(null); // Clear the file in state
                setFileError(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`); // Set an error message
                e.target.value = '';
            }
        } else {
            setFile(null); // Reset file state if no file is selected
            if (fileError) {
                setFileError(''); // Clear the error if no file is selected
            }
        }
    };
    

    useEffect(() => {
        if (id && modalType === 'folder') {
            const data = documentList.find((document) => document.folderId === id);
            setFieldValue('folderName', data.folderName);
        } else {
            setFieldValue('folderName', '');
            setErrors({});
        }
    }, [modalType, id]);

    return (
        <div>
            <Dialog size='xs' open={open} handler={handleOpen} className='relative'>
                <div>
                    <MdCancel onClick={handleClose} className='absolute cursor-pointer right-0 text-xl text-red-500'  size={'2.5rem'} />
                </div>

                {id ? <DialogHeader>{modalType === 'folder' ? 'Update Folder' : 'Update File'}</DialogHeader> : <DialogHeader>{modalType === 'folder' ? 'Create Folder' : 'Add File'}</DialogHeader>}
                <DialogBody>
                    <form onSubmit={handleSubmit} id='docform'>
                        {modalType === 'folder' ? (
                            <>
                                <Typography>
                                    Enter folder name
                                </Typography>
                                <input
                                    size="sm"
                                    type='text'
                                    placeholder="Enter Folder Name..."
                                    value={values.folderName}
                                    name='folderName'
                                    className="border border-gray-400 p-2 focus:!border-t-gray-900 rounded-md w-full"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {errors.folderName && touched.folderName && <p className='text-sm text-red-500'>{errors.folderName}</p>}
                            </>
                        ) : (
                            <>
                            <input
                                size="sm"
                                type='file'
                                name='file'
                                placeholder="Add File..."
                                onChange={handleFileChange}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            />
                           {fileError &&  <p className='text-red-500'>{fileError}</p>}
                            </>
                            
                        )}
                    </form>
                </DialogBody>
                <DialogFooter className='flex gap-2'>
                    <button
                        disabled={isAdding || !(dirty && isValid) || (!file && modalType !== 'folder')}
                        form='docform'
                        type='submit'
                        className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) || (!file && modalType !== 'folder') ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
                    >
                        {isAdding ?
                            <div className='flex justify-center items-center gap-3'>
                                <Spinner color='white' className="h-4 w-4" />
                                {modalType === 'folder' ? (id ? "Updating Folder" : "Creating Folder") : (id ? "Updating Document" : "Adding Document")}
                            </div>
                            : modalType === 'folder' ? (id ? "Update Folder" : "Create Folder") : (id ? "Update Document" : "Add Document")}
                    </button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default DocumentForm;
