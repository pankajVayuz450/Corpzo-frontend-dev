import React, { useState } from 'react'
import { Input, Typography } from '@material-tailwind/react'
import { Select as MaterialSelect, Option } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import TitleComponent from '@/components/common/TitleComponent';
import { useParams } from 'react-router-dom';
import ImageCropper from './Cropper';
import { useFormik } from 'formik';

const initialValues ={
  
}
const CreateBanner = () => {
  const [file, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedimage] = useState(null)

  const { id } = useParams();
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
    setTouched,
    setErrors,
    setFieldTouched,
    dirty,
    isValid
  } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values) => {
      console.log(values, "faq values");
      setTouched({}, false);

    },
  });
  return (
    <div className='w-1/2'>
      <TitleComponent title={id ? `CORPZO | Update Banner` : `CORPZO | Create Banner `}></TitleComponent>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">{id ? "Edit Banner" : "Add Banner"}</h1>
      <form action="" className='flex flex-col gap-2'>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Banner Title
          </Typography>
          <Input
            size="sm"
            placeholder="Enter Offer Detail"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="w-100">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Select platform
          </Typography>
          <MaterialSelect size="lg" label="Select Platform">
            <Option>Corpzo</Option>
            <Option>Corpzo X</Option>
          </MaterialSelect>
        </div>
        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
         Choose Banner Image
        </Typography>
      </form>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        {croppedImage && <img className='bg-red-300 w-full h-32' src={croppedImage} alt="uploaded"></img>}
        {file && <ImageCropper imageToCrop={URL.createObjectURL(file)} croppedImage={(value) => setCroppedimage(value)} />}
      </div>
    </div>
  )
}

export default CreateBanner