import React from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addDocuments } from '@/redux/admin/actions/Document';
import { useParams } from 'react-router-dom';

const folderInitalValues = {
    folderName: ""
}
const fileValidations = {

}
const DocumentForm = ({ open, handleOpen, modalType, id, updateData }) => {
    const folderValidationSchema = Yup.object().shape({
        folderName: Yup.string()
            .required('Folder Name is required.')
            .max(30, 'Folder Name can be at most 30 characters long')
            .min(3, "Folder Name must be atleast 3 characters long")
            .matches(/^[a-zA-Z0-9\-]+$/, 'Folder Name can only contain alphabets, numbers, and hyphens'),
    });
console.log(id, "Id from the dform");

    const fileValidationSchema = Yup.object().shape({
        folderName: Yup.mixed().required('File is required')
    });

    const dispatch = useDispatch()
    const { isAdding } = useSelector((state) => state.document)
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
        initialValues: folderInitalValues,
        validationSchema: modalType === "folder" ? folderValidationSchema : fileValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, action) => {
            setTouched({}, false);
            dispatch(addDocuments(values))
            setErrors({});
        },
    });
    return (
        <div>
            <Dialog size='xs' open={open} handler={handleOpen}>
                {id ? <DialogHeader>{modalType === 'folder' ? 'Update Folder' : 'Update File'}</DialogHeader> : <DialogHeader>{modalType === 'folder' ? 'Create Folder' : 'Add File'}</DialogHeader>}
                <DialogBody>
                    <form onSubmit={handleSubmit} id='document-form'>
                        {modalType === 'folder' ? (
                            <>
                                <Typography>
                                    Select folder
                                </Typography>
                                <input
                                    size="sm"
                                    type='text'
                                    placeholder="Enter Folder Name..."
                                    value={values.folderName}
                                    name='folderName'
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {errors.folderName && touched.folderName && <p className='text-sm text-red-500'>{errors.folderName}</p>}
                            </>
                        ) : (
                            <input
                                size="sm"
                                type='file'
                                placeholder="Add File..."
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                            />
                        )}
                    </form>
                </DialogBody>
                <DialogFooter className='flex gap-2'>
                    <button
                        disabled={isAdding || !(dirty && isValid)}
                        onClick={handleSubmit}
                        className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
                    >
                        {isAdding ?
                            <div className='flex justify-center items-center gap-3'>
                                <Spinner color='white' className="h-4 w-4" />
                                {id ? "Updating Document" : "Adding Document"}
                            </div>
                            : id ? "Update Document" : "Add Document"}
                    </button>

                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default DocumentForm;
