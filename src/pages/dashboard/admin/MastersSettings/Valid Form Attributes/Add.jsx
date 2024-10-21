import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { createValidFormElementAttributes, updateValidFormElementAttributes } from '@/redux/admin/actions/MasterSettings/Valid Form Attributes';
import { toast } from 'react-toastify';
// import { addElement } from './actions'; // Adjust the import based on your file structure

const validationSchema = Yup.object({
    elementName: Yup.string()
        .required('Element name is required')
        .min(2, 'Element name must be at least 2 characters long')
        .max(20, 'Element name must not exceed 20 characters')
        .matches(/^[a-zA-Z0-9 ]*$/, 'Element name must only contain letters and numbers'),
});

function Add({ isEdit }) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.validFormElementAttributes);
    const { isCreatingValidFormAttribute, isUpdatingValidFormAttribute } = store;
    const navigate = useNavigate();
    const params = useParams();
    //   console.log("attribut id:",params.id);


    // console.log("store", store);
    // console.log("isCreatingValidFormAttribute", isCreatingValidFormAttribute);



    const formik = useFormik({
        initialValues: {
            elementName: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {

            if (isEdit) {

            } else {
                dispatch(createValidFormElementAttributes({ attribute: values.elementName }))
                    .unwrap() // This makes the thunk return a Promise you can handle directly
                    .then(() => {
                        resetForm(); // Reset the form fields
                        navigate(-1); // Go back to the previous page if successful
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        console.log('Error submitting the form:', error); // Handle the error case if needed
                    });

            }





        },
    });


    useEffect(() => {
        if (isEdit) {
            // dispatch(updateValidFormElementAttributes(params.id,data))
        }
    }, []);

    //   const handleSubmit = ()=>{
    //         dispatch(addElement({ name: values.elementName })); // Dispatch the action to add the element
    //   }

    return (
        <div>
            <h1 className="text-xl font-semibold">{isEdit ? "Edit attribute" : "Add New Attribute"}</h1>
            <form onSubmit={formik.handleSubmit} className="mt-4">
                <div>
                    <label htmlFor="elementName" className="block text-sm font-medium text-gray-700">
                        Attribute Name
                    </label>
                    <input
                        type="text"
                        name="elementName"
                        id="elementName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.elementName}
                        required
                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {formik.touched.elementName && formik.errors.elementName ? (
                        <div className="mt-1 text-red-600 text-sm">{formik.errors.elementName}</div>
                    ) : null}
                </div>

                <div className="mt-6">

                    {isEdit ? <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:${isUpdatingValidFormAttribute ? "bg-gray-600" : "bg-blue-600"} transition`}
                        disabled={isUpdatingValidFormAttribute}
                    >
                        {isUpdatingValidFormAttribute ? "Updating..." : "Update"}
                    </button> :

                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:${isCreatingValidFormAttribute ? "bg-gray-600" : "bg-blue-600"} transition`}
                            disabled={isCreatingValidFormAttribute}
                        >
                            {isCreatingValidFormAttribute ? "Adding..." : "Add Attribute"}
                        </button>
                    }
                </div>
            </form>
        </div>
    );
}

export default Add;
