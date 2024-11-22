import React, { useEffect, useState } from "react";
import { Stepper, Step, Typography, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import VideoPlayer from "@/components/common/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { handleStepValue } from "@/redux/admin/slices/Service";
const StepperWithContent = ({
    open,
    handleOpen,
    handleConfirm,
}) => {
    const dispatch = useDispatch(); 
    const {stepValue, delivrableVideoUrl,stepsVideoUrl, documentVideoUrl, uploadVideoLoading}=useSelector((state)=> state.service);
    console.log(stepValue, "stepvalue")
    const [activeStep, setActiveStep] = useState(stepValue || 0);
    const [uploadedVideos, setUploadedVideos] = useState([null, null, null]); // State to store videos for each step
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const handleFileChange = (file) => {
        const newUploadedVideos = [...uploadedVideos];
        newUploadedVideos[activeStep] = file; // Save the video for the current step
        setUploadedVideos(newUploadedVideos);
    };

    const handleNext = () => {
        if (activeStep < 2) {
            setActiveStep((cur) => cur + 1);
        }
    };

    useEffect(() => {
        if (isInitialLoad) {
            // Set step to 0 only on initial load
            dispatch(handleStepValue(0));
            setIsInitialLoad(false);
        } else {
            // Follow Redux state on subsequent loads
            setActiveStep(stepValue);
        }
    }, [stepValue, isInitialLoad, dispatch]);
    return (
        <Dialog size="xs" open={open} handler={handleOpen}>
            <DialogHeader>Upload videos for the service.</DialogHeader>
            <DialogBody>
                <div className="w-full px-8 py-4">
                    <Stepper activeStep={activeStep}>
                        <Step onClick={() => setActiveStep(0)}>
                            <div className="absolute -bottom-[2rem] w-max text-center">
                                <Typography
                                    color={activeStep === 0 ? "blue-gray" : "gray"}
                                    className="text-sm"
                                >
                                    Deliverable Video
                                </Typography>
                            </div>
                        </Step>

                        <Step onClick={() => setActiveStep(1)}>
                            <div className="absolute -bottom-[2rem] w-max text-center">
                                <Typography
                                    color={activeStep === 1 ? "blue-gray" : "gray"}
                                    className="text-sm"
                                >
                                    Step Video
                                </Typography>
                            </div>
                        </Step>

                        <Step onClick={() => setActiveStep(2)}>
                            <div className="absolute -bottom-[2rem] w-max text-center">
                                <Typography
                                    color={activeStep === 2 ? "blue-gray" : "gray"}
                                    className="text-sm"
                                >
                                    Document Video
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>

                    {/* Conditionally render the VideoPlayer for each step */}
                    <div className="mt-12">
                        {activeStep === 0 && (
                            <VideoPlayer
                                url={uploadedVideos[0] ? URL.createObjectURL(uploadedVideos[0]) : delivrableVideoUrl}
                                handleConfirm={(file) => {
                                    handleConfirm(file, 'deliverable');
                                    handleFileChange(file); // Save the file for this step
                                }}
                                onFileChange={handleFileChange}
                                loading={uploadVideoLoading}
                            />
                        )}
                        {activeStep === 1 && (
                            <VideoPlayer
                                url={uploadedVideos[1] ? URL.createObjectURL(uploadedVideos[1]) : stepsVideoUrl}
                                handleConfirm={(file) => {
                                    handleConfirm(file, 'step');
                                    handleFileChange(file); // Save the file for this step
                                }}
                                onFileChange={handleFileChange}
                                loading={uploadVideoLoading}
                            />
                        )}
                        {activeStep === 2 && (
                            <VideoPlayer
                                url={uploadedVideos[2] ? URL.createObjectURL(uploadedVideos[2]) : documentVideoUrl}
                                handleConfirm={(file) => {
                                    handleConfirm(file, 'document');
                                    handleFileChange(file); // Save the file for this step
                                }}
                                onFileChange={handleFileChange}
                                loading={uploadVideoLoading}
                            />
                        )}
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default StepperWithContent;
