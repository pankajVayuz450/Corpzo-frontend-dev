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
import { getAllVideos, uploadVideo } from '@/redux/admin/actions/VideoIntro';
import TitleComponent from '@/components/common/TitleComponent';
import { ShimmerButton, ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';
import { updateNext } from '@/redux/admin/slices/VIdeoIntroSlice';
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';

const VideoIntro = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const { videoList, isFetching, uploadVideoLoading, url } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(!open);
    setVideoPreviewUrl(null);
    setSelectedVideo(null);
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
  }, []);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 1 * 1024 * 1024;
    if (file) {
      const fileName = file.name;
      const idxDot = fileName.lastIndexOf(".") + 1;
      const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (extFile !== "mp4") {
        event.target.value = '';
        setError("Please select an MP4 video file.");
        return;
      } else if (file.size > maxFileSize) {
        event.target.value = '';
        setError("File size cannot be greater than 1 MB.");
        return;
      }

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

  const handleResetVideo = () => {
    dispatch(updateNext(false));
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  useEffect(() => {
    if (!uploadVideoLoading) {
      setOpen(false);
      setError(null); // Reset error state
    }
  }, [uploadVideoLoading]);

  const handleSave = () => {
    if (!selectedVideo) {
      setError("Please select a video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedVideo);
    const saveData = {
      moduleId: videoList?._id,
      title: "CORPZO",
    }
    dispatch(uploadVideo(formData, saveData));
  };
  const breadcrumbData = [
    {
      
        
          name: 'Video Intro',
          
    }
  ];

  return (
    <>
      <div>
        <Breadcrumb items={breadcrumbData}></Breadcrumb>
        <TitleComponent title={"CORPZO | Video Intro"} />
        <HeaderTitle title={'Video Intro'}/>
        {isFetching ? (
          <div className="mt-2 w-[60%]">
            <ShimmerTitle mode="light" line={1} />
            <ShimmerDiv mode="light" className="mt-2 w-[60%]" rounded={1} height={350} width={550} />
            <div className="flex justify-end mt-2 p-0">
              <ShimmerButton className='' size="sm" mode="light" rounded={0.4} />
            </div>
          </div>
        ) : (
          <div>
            <Card className="mt-2 w-[60%]">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {videoList?.title}
                </Typography>
                <video key={url} className="w-full h-64" controls>
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
        <DialogHeader className='flex flex-col gap-1 items-start'>
          {selectedVideo ? "Preview Video" : "Upload Video"}
        </DialogHeader>
        <DialogBody>
          {selectedVideo ? (
            <div className="mt-4 flex flex-col items-center justify-center">
              <video controls className='w-full h-64' height="200" width="400">
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
        </DialogBody>
        <DialogFooter className="flex justify-end items-center">
          <div className="flex gap-2">
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
              className={`${selectedVideo && !uploadVideoLoading ? "cursor-pointer" : "cursor-not-allowed"} bg-green-50`}
              variant="gradient"
              color="green"
            >
              {uploadVideoLoading ? (
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {"Uploading..."}
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
