import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from '@material-tailwind/react';
import { getAllVideos, saveVideoDetails, uploadVideo } from '@/redux/admin/actions/VideoIntro';
import TitleComponent from '@/components/common/TitleComponent';
import { ShimmerButton, ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';
import { validationSchema } from './validationSchema';
import { useFormik } from 'formik';
import { updateNext } from '@/redux/admin/slices/VIdeoIntroSlice';
const initialValues = {
  moduleId: "",
  title: "CORPZO",
  url: ""
}
const VideoIntro = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [error, setError] = useState(null); // State for validation error
  const { videoList, isFetching, uploadVideoLoading, url, nextPage, isAdding } = useSelector((state) => state.video);

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
        moduleId: videoList?._id,
        title: values.title,
        url: url
      }
      dispatch(saveVideoDetails(data))
      setErrors({});
    },
  });

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(!open);
    setVideoPreviewUrl(null)
    setSelectedVideo(null);
    dispatch(updateNext(false))
    setError(null);
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [])
  // Handle video file selection and validation
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 1 * 1024 * 1024;
    // Check if the file exists and is a valid MP4 file
    if (file) {
      const fileName = file.name;
      const idxDot = fileName.lastIndexOf(".") + 1;
      const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (extFile !== "mp4") {
        event.target.value = '';
        setError("Please select a MP4 video file.");
        return;
      } else if (file.size > maxFileSize) {
        event.target.value = '';
        setError("File size cannot be greater that 1 Mb.");
        return;
      }

      // Create a new object URL for the selected video and update the state
      const newVideoPreviewUrl = URL.createObjectURL(file);
      setSelectedVideo(file);
      setVideoPreviewUrl(newVideoPreviewUrl);
      setError(null);
    } else {
      setError("Please select a valid MP4 file.");
      setSelectedVideo(null);
      setVideoPreviewUrl(null);
    }
  };

  // Function to reset the video
  const handleResetVideo = () => {
    dispatch(updateNext(false))
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setError(null);
  };

  useEffect(() => {
    // Clean up URL object when component unmounts or new video is loaded
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);
  useEffect(() => {
    // Close the modal when isAdding changes to false
    if (!isAdding) {
      setOpen(false);
    }
  }, [isAdding]);
  const handleSave = () => {
    if (!selectedVideo) {
      setError("Please select a video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedVideo);
    dispatch(uploadVideo(formData))
    if (url && nextPage) {
      console.log("inside the codition")
      setFieldValue("url", url)
    }
  };
  return (
    <>
      <div>
        <TitleComponent title={"CORPZO | Video Intro"} />
        {isFetching ? (
          <div className="mt-2 w-[60%]">
            <ShimmerTitle mode="light" line={1} />
            <ShimmerDiv mode="light" className="mt-2 w-[60%]" rounded={1} height={350} width={550} />
            <div className="flex justify-end mt-2 p-0">
              <ShimmerButton className='' size="sm" mode="light" rounded={0.4} />
            </div>
          </div>
        ) : (
          <div className=''>
            <Card className="mt-2 w-[60%]">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {videoList?.title}
                </Typography>
                <video key={url} className="w-full h-auto" controls>
                  <source src={url} type="video/mp4" />
                </video>
                <p className="text-gray-600 text-sm mt-2">
    * Please select a video file smaller than 1 MB.
</p>

              </CardBody>
              <CardFooter className="flex justify-end gap-2">
                <Button onClick={handleOpen}>
                  Update Video
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

      </div>
      <Dialog size='xs' open={open} handler={handleOpen}>



        <Dialog size='xs' open={open} handler={handleOpen}>
          <DialogHeader className='flex flex-col gap-1 items-start'>
            {nextPage
              ? "Upload Successful!"
              : selectedVideo
                ? "Preview Video"
                : "Upload Video"
            }
          </DialogHeader>
          <DialogBody>
            {nextPage ? (
              <div className="flex flex-col items-center">
                {/* <form onSubmit={handleSubmit} id="saveVideoDetails" className="w-full mt-4">
                  <label htmlFor="videoOption" className="block text-sm font-medium text-gray-700">
                    Select Type
                  </label>
                  <select
                    id="videoOption"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option disabled value="">Select Video Type</option>
                    <option value="CORPZO">CORPZO</option>
                    <option value="CORPZOX">CORPZOX</option>
                  </select>
                  {errors.title && touched.title ? (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  ) : <p className="mt-2"></p>}
                </form> */}
                <Button onClick={handleSubmit} form="saveVideoDetails" type="submit" className="mt-4 bg-green-50" variant="gradient" color="green">
                  {isAdding ?
                    <div className='flex justify-center items-center gap-3'>
                      <Spinner color='white' className="h-4 w-4" />
                      {"Saving Changes"}
                    </div>
                    : "Save Chnages"}
                </Button>
              </div>
            ) : (
              <>
                {selectedVideo ? (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <video controls>
                      <source src={videoPreviewUrl} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={handleVideoChange}
                      className="mb-2"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex flex-col items-center mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="mt-2 text-gray-600">No video selected</p>
                    </div>
                  </>
                )}

              </>
            )}
          </DialogBody>
          <DialogFooter className="flex justify-end items-center">
            <div className="flex gap-2">
              {!nextPage && (
                <>
                  {!uploadVideoLoading && <Button
                    onClick={handleResetVideo}
                    className={`${selectedVideo ? "block" : "hidden"}`}
                    variant='outlined'
                    color="red"
                  >
                    Choose Another Video
                  </Button>}
                  <Button
                    disabled={!selectedVideo || uploadVideoLoading}
                    onClick={handleSave}
                    className={`${!selectedVideo || uploadVideoLoading
                      ? "cursor-not-allowed bg-gray-300"
                      : "cursor-pointer bg-green-50"
                      }`}
                    variant="gradient"
                    color="green"
                  >
                    <span>{uploadVideoLoading ? "Uploading..." : "Confirm"}</span>
                  </Button>

                </>
              )}
            </div>
            
          </DialogFooter>
        </Dialog>
                
        <DialogFooter className="flex justify-end items-center">
          <div className="flex gap-2">
            <Button
              onClick={handleResetVideo}
              className={`${selectedVideo ? "block" : "hidden"}`}
              variant='outlined'
              color="red"
            >
              Choose Another Video
            </Button>
            <Button
              disabled={!selectedVideo || uploadVideoLoading}
              onClick={handleSave}
              className={`${selectedVideo && !uploadVideoLoading ? "cursor-pointer" : "cursor-not-allowed"} bg-green-50`}
              variant="gradient"
              color="green"
            >
              {uploadVideoLoading ? (
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {"Saving Changes"}
                </div>
              ) : (
                <span>Confirm</span>
              )}
            </Button>

          </div>
        </DialogFooter>
      </Dialog>

    </>
  );
};

export default VideoIntro;