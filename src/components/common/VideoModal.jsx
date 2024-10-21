import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export function VideoModal({ open, handleOpen, title, handleConfirm, url, loading, buttonContent }) {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(url || "");
    const [error, setError] = useState("");
    const [cancelFileChange, setCancelFileChnage] = useState(false);
    
    const handleFileChange = (event) => {
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
                setError("File size cannot be greater that 1 Mb.");
                return;
            }

            const newUrl = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoUrl(newUrl);
            setError("");
        }
    };

    const handleChooseAnotherFile = () => {
        if (videoUrl && !url) {  // Only revoke the object URL if it's not the initial provided URL
            URL.revokeObjectURL(videoUrl);
        }
        setCancelFileChnage(true)
        setVideoUrl("");
        setVideoFile(null);
        setError("");
    };

    const handleCancelFileChange = () => {
        setVideoUrl(url);
        setCancelFileChnage(false)
    }

    const confirmUpload = () => {
        if (videoFile) {
            handleConfirm(videoFile);
        }
    };

    useEffect(() => {
        return () => {
            setError("");
        };
    }, [handleOpen]);

    return (
        <Dialog size="xs" open={open} handler={handleOpen}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                {videoUrl ? (
                    <>
                        <video className="mt-4 w-full" controls>
                            <source src={videoUrl} type={videoFile?.type || "video/mp4"} />
                        </video>
                    </>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
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
            <DialogFooter className="flex justify-end items-center gap-2">
                {(videoFile || url) && !loading && ( // Show this only if it's not the initial provided URL
                    <Button onClick={handleChooseAnotherFile} color="blue">
                        Choose Another File
                    </Button>
                )}
                {cancelFileChange && !loading && !videoFile && <Button variant="gradient" color="green" onClick={handleCancelFileChange}>
                    <span>Cancel</span>
                </Button>}
                {videoFile && ( 
                    <Button
                        disabled={loading}
                        variant="gradient"
                        color="green"
                        className={`flex gap-2 items-center ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 cursor-pointer"
                        }`}
                        onClick={confirmUpload}
                    >
                        {loading ? (
                            <>
                                <Spinner />  {buttonContent}
                            </>
                        ) : (
                            buttonContent
                        )}
                    </Button>
                )}
            </DialogFooter>
        </Dialog>
    );
}
