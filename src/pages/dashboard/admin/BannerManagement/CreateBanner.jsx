import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Input, Spinner, Textarea, Typography } from '@material-tailwind/react'
import { Select as MaterialSelect, Option } from "@material-tailwind/react";
import TitleComponent from '@/components/common/TitleComponent';
import { useNavigate, useParams } from 'react-router-dom';
import ImageCropper from './Cropper';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addBanner } from '@/redux/admin/actions/banner';
import { removeUploadingBannerError } from '@/redux/admin/slices/bannerSlice';

const initialValues = {
  bannerTitle: "",
  userType: "",
  bannerDescription: ""
}

const CreateBanner = () => {
  const [file, setSelectedFile] = useState(null);
  const [initialFile, setInitialFile] = useState(null);
  const [croppedImage, setCroppedimage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { addedBanner, isAddingBanner, addingBannerError } = useSelector(state => state.banner);

  useEffect(() => {
    if (addedBanner) {
      toast.success("Banner uploaded")
      setCroppedimage(null);
      setSelectedFile(null);
      setInitialFile(null);
      navigate("/dashboard/admin/banner-management")
    }
    if (addingBannerError) {
      toast.error("Error in uploading banner")
    }
    dispatch(removeUploadingBannerError());
  }, [addedBanner, addingBannerError])

  const { id } = useParams();
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    dirty,
    isValid
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      bannerTitle: Yup.string().required("This is a required field"),
      userType: Yup.string().required("This is a required field"),
      bannerDescription: Yup.string().required("This is a required field")
    }),
    onSubmit: async (values) => {
      if (!file) {
        return toast.error("Banner image is required!");
      }
      const formData = new FormData();
      formData.append("bannerTitle", values?.bannerTitle);
      formData.append("userType", values?.userType);
      formData.append("bannerDescription", values?.bannerDescription);
      formData.append("files", file);
      dispatch(addBanner(formData));
    },
  });
  return (
    <div className='w-1/2'>
      <TitleComponent title={id ? `CORPZO | Update Banner` : `CORPZO | Create Banner `}></TitleComponent>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">{id ? "Edit Banner" : "Add Banner"}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Banner Title
          </Typography>
          <Input
            size="sm"
            value={values.bannerTitle}
            onBlur={handleBlur}
            placeholder="Enter Offer Detail"
            name='bannerTitle'
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
          />
          {(touched.bannerTitle && errors.bannerTitle) && <p className='text-sm text-red-600'>{errors.bannerTitle}</p>}
        </div>
        <div className="w-100">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Select platform
          </Typography>
          <MaterialSelect name='userType' onBlur={handleBlur} value={values.userType} onChange={(e) => setFieldValue('userType', e)} size="lg" label="Select Platform">
            <Option value='Corpzo'>Corpzo</Option>
            <Option value='Corpzo X'>Corpzo X</Option>
          </MaterialSelect>
          {(touched.userType && errors.userType) && <p className='text-sm text-red-600'>{errors.userType}</p>}
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Banner Description
          </Typography>
          <Textarea
            size="sm"
            onBlur={handleBlur}
            value={values.bannerDescription}
            name='bannerDescription'
            onChange={handleChange}
            placeholder="Enter Offer Detail"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {(touched.bannerDescription && errors.bannerDescription) && <p className='text-sm text-red-600'>{errors.bannerDescription}</p>}
        </div>
        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
          Choose Banner Image
        </Typography>
        <div>
          <input
            type="file"
            accept="image/*"
            className='my-5'
            onChange={(e) => {
              setInitialFile(e.target.files[0]);
              setSelectedFile(e.target.files[0]);
            }}
          />
          {initialFile && <ImageCropper imageToCrop={URL.createObjectURL(initialFile)} setCroppedImage={setCroppedimage} setCroppedImageFile={setSelectedFile} />}
          {(croppedImage) && <img className='bg-red-300 my-7 h-auto rounded-lg' src={croppedImage} alt="uploaded"></img>}
        </div>
        <button
          type='submit'
          disabled={isAddingBanner || !(dirty && isValid)}
          className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAddingBanner || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAddingBanner || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
        >
          {isAddingBanner ?
            <div className='flex justify-center items-center gap-3'>
              <Spinner color='white' className="h-4 w-4" />
              {id ? "Updating Banner" : "Adding Banner"}
            </div>
            : id ? "Update Banner" : "Add Banner"}
        </button>
      </form>
    </div>
  )
}

export default CreateBanner