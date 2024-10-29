import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';

function ImageCropper({ imageToCrop, setCroppedImage, setCroppedImageFile }) {
    const [crop, setCrop] = useState({
        maxHeight: 800,
        maxWidth: 400
    });
    const [image, setImage] = useState(null);

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
    
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
    
        const ctx = canvas.getContext('2d');
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    return toast.error("Failed to generate image blob");
                }
    
                // Check the size of the blob (1MB = 1,048,576 bytes)
                if (blob.size > 1 * 1024 * 1024) { // 1MB limit
                    return toast.error("File size cannot exceed 1MB");
                }
    
                const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
    
                // Set both the base64 and file object as needed
                const reader = new FileReader();
                reader.onloadend = () => setCroppedImage(reader.result); // For preview (base64)
                reader.readAsDataURL(file);
    
                setCroppedImageFile(file); // Pass the File object
            },
            'image/jpeg',
            0.9 // Image quality (0 to 1)
        );
    };
    ;
    return (
        <>
            {imageToCrop && (
                <div>
                    <ReactCrop src={imageToCrop} onImageLoaded={setImage}
                        maxHeight={400}
                        maxWidth={400}
                        className='rounded-lg'
                        crop={crop} onChange={setCrop} />
                    <br />
                    <div className='flex items-center space-x-4'>
                        <button type='button' className='bg-blue-400 px-7 py-2 rounded text-gray-800 font-bold' onClick={cropImageNow}>Crop</button>
                    </div>
                    <br />
                    <br />
                </div>
            )}
        </>
    )
}

export default ImageCropper;