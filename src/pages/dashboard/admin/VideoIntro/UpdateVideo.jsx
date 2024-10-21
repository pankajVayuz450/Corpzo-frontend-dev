import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  Input,
  Spinner,
  Typography
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import TitleComponent from '@/components/common/TitleComponent';
import { validationSchema } from './validationSchema';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import { addSteps, editStep } from '@/redux/admin/actions/Steps';
import { updateVideo } from '@/redux/admin/actions/VideoIntro';

const initialValues = {
  moduleId: "",
  title: "",
  url: ""
}

const UpdateVideo = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [fileError, setFileError] = useState("");
  const isFetching = useSelector((state) => state.steps.isFetching);
  const isAdding = useSelector((state) => state.steps.isAdding);
  const [videoUrl, setVideoUrl] = useState(null);

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
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);
      const data = {
        moduleId: "",
        title: handleExtraSpaces(values.details)
      }
      dispatch(updateVideo())
      setErrors({});
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "video/mp4") {
        const fileUrl = URL.createObjectURL(file);
        setVideoUrl(fileUrl);
        setFileError("");
      } else {
        setVideoUrl(null);
        setFileError("Only .mp4 video files are allowed.");
      }
    }
    handleChange(event);
  };

  return (
    <div className='relative'>
      <TitleComponent title={"CORPZO | Update Intro Video"} />
      {
        id !== undefined && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (
          <Card className='w-[70%] h-full'>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Update Intro Video
              </Typography>
              <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
                <Typography variant="small" color="blue-gray" className=" font-medium">
                  Select File
                </Typography>
                <Input
                  size="sm"
                  type='file'
                  placeholder="Update Intro Video"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={values.url}
                  onFocus={() => touched.name = true}
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  name='url'
                  accept="video/mp4"
                />
                {fileError && <p className='text-sm text-red-500'>{fileError}</p>}

                {videoUrl && (
                  <div className='mt-1'>
                    <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                      Preview Video
                    </Typography>
                    <div className='flex justify-center'>
                      <div className='w-[50%]'>
                        <video controls width="100%" src={videoUrl} />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  disabled={isAdding || !(videoUrl && values.title && dirty && isValid)}
                  onClick={handleSubmit}
                  className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(videoUrl && values.title && dirty && isValid)
                      ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white'
                      : 'bg-blue-500 hover:bg-blue-700 text-white'
                    } focus:ring-${isAdding || !(videoUrl && values.title && dirty && isValid)
                      ? 'gray-400'
                      : 'blue-500'
                    }`}
                >
                  {isAdding ? (
                    <div className='flex justify-center items-center gap-3'>
                      <Spinner color='white' className="h-4 w-4" />
                      {id ? "Updating Video" : "Adding Video"}
                    </div>
                  ) : id ? "Update Video" : "Add Video"}
                </button>

              </form>
            </CardBody>
          </Card>
        )
      }
    </div>
  );
}

export default UpdateVideo;
