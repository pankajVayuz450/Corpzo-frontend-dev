import React, { useEffect, useRef, useState } from 'react';
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
import { getAllLogos, uploadImage } from '@/redux/admin/actions/logo';
import { MdCancel } from 'react-icons/md';
const Logo = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const { logo, url, isFetching, uploadImageLoading } = useSelector((state) => state.logo);

  const fileInputRef = useRef(null);

  useEffect(() => {
    !url && dispatch(getAllLogos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(!open);
    setImagePreviewUrl(null);
    setSelectedImage(null);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 1 * 1024 * 1024;
    if (file) {
      const fileName = file.name;
      const idxDot = fileName.lastIndexOf(".") + 1;
      const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (!["jpg", "jpeg", "png"].includes(extFile)) {
        event.target.value = '';
        setError("Please select a JPG, JPEG, or PNG image file.");
        return;
      } else if (file.size > maxFileSize) {
        event.target.value = '';
        setError("File size cannot be greater than 1 MB.");
        return;
      }

      const newImagePreviewUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImagePreviewUrl(newImagePreviewUrl);
      setError(null);
    } else {
      setError("Please select a valid image file.");
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const handleResetImage = () => {
    dispatch(updateNext(false));
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (!uploadImageLoading) {
      setOpen(false);
      setError(null); // Reset error state
    }
  }, [uploadImageLoading]);

  const handleSave = () => {
    if (!selectedImage) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedImage);
    const saveData = {
      moduleId: logo?._id,
      title: "CORPZO_LOGO",
    }
    dispatch(uploadImage(formData, saveData));
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const breadcrumbData = [
    {
      name: 'Logo Management',
    }
  ];

  return (
    <>
      <div>
        <Breadcrumb items={breadcrumbData}></Breadcrumb>
        <TitleComponent title={"CORPZO | Logo Management"} />
        <HeaderTitle title={'Logo Management'} />
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
                  {logo?.title}
                </Typography>
                <img src={url} alt="Logo" className="w-full h-64 object-contain" />
                <p className="text-gray-600 text-sm mt-2">
                  * Please select an image file smaller than 1 MB.
                </p>
              </CardBody>
              <CardFooter className="flex justify-end gap-2">
                <Button onClick={handleOpen}>
                  Update Image
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <Dialog size='xs' open={open} handler={handleOpen}>
        <div>
          <MdCancel onClick={handleOpen} className='absolute cursor-pointer right-0 text-xl text-red-500' size={'2.5rem'} />
        </div>
        <DialogHeader className='flex flex-col gap-1 items-start'>
          {selectedImage ? "Preview Logo" : "Upload Logo"}
        </DialogHeader>
        <DialogBody>
          {selectedImage ? (
            <div className="mt-4 flex flex-col items-center justify-center w-full h-72">
              <img src={imagePreviewUrl} alt="Preview" className='w-full h-64 object-contain' />
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2 hidden"
                ref={fileInputRef}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col items-center mt-4 cursor-pointer" onClick={handleSvgClick} >
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
                <p className="mt-2 text-gray-600">Click to choose image!</p>
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-end items-center">
          <div className="flex gap-2">
            {!uploadImageLoading && <Button
              onClick={handleResetImage}
              className={`${selectedImage ? "block" : "hidden"}`}
              variant='outlined'
              color="red"
            >
              Choose Another Image
            </Button>}
            <Button
              disabled={!selectedImage || uploadImageLoading}
              onClick={handleSave}
              className={`${selectedImage && !uploadImageLoading ? "cursor-pointer" : "cursor-not-allowed"} bg-green-50`}
              variant="gradient"
              color="green"
            >
              {uploadImageLoading ? (
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

export default Logo;