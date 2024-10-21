import FaqApis from '@/constants/APIList/faqAPIs';
import serviceAPIs from '@/constants/APIList/ServiceAPIs';
import VideoIntroApis from '@/constants/APIList/videoIntro';
import axios from 'axios';
import {getFaqs,getAllServiceFaqs,addFaqs,updateStatusState,updateStatusLoading,getFaqById} from '@/redux/admin/slices/FAQ/index'
import { getVideos, updateLoading, updateUploadLoading,updateVideoUrl, updateNext,updateAdding } from '../../slices/VIdeoIntroSlice';
import { toast } from 'react-toastify';
const authToken  = localStorage.getItem('authToken');

export const getAllVideos =()=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
         
            const response = await axios.get(`${VideoIntroApis.getVideos}?type=CORPZO`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get video api")
            if(response.status == 200){
                dispatch(getVideos({
                    videoList : response.data.data[0] || {},
                }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error, "error fetching videos")
        }
    }
}
export const updateVideo =(videoData)=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true));

            const response = await axios.put(`${VideoIntroApis.putVideo}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get all service Video upload")
            if(response.status == 200){
                // dispatch(getAllServiceFaqs({
                //     serviceFaqs : response.data.data || []
                    
                // }))
                // dispatch(getFaqs({
                //     faqList : response.data.data.faqs || [],
                //     totalCount : response.data.data.totalCount || 0,
                //     totalPages : response.data.data.totalPages || 1,
                // }))
                dispatch(updateAdding(false))
                
            }
        }catch(error){
            dispatch(updateAdding(false));
            console.log(error)
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
        }
    }
}

export const uploadVideo = (formData, saveData) => {
    console.log(saveData, "saveData")
    return async (dispatch) => {
        try {
            dispatch(updateUploadLoading(true))
            let api = `${VideoIntroApis.uploadVideo}`
           
            const response = await axios.put(`${api}`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
              console.log(response, "response from upload video")
              dispatch(updateVideoUrl(response.data.data.url));
              const updatedSaveData = {
                ...saveData,
                url: response.data.data.url, 
                
            };
              dispatch(saveVideoDetails(updatedSaveData))
           
            }   
        } catch (error) {
            console.error('Error uploading video:', error);
            // toast.error(error.response.data.error)
            dispatch(updateUploadLoading(false))
        } finally {

            dispatch(updateUploadLoading(false))
        }
    };
};

export const saveVideoDetails =(videoDetails)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateUploadLoading(true))
            const response = await axios.put(VideoIntroApis.saveVideoDetails, videoDetails, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log(response, "add Video details response")
            if(response.status === 200){
                dispatch(updateUploadLoading(false))
                toast.success(response.data.message);
                // navigate(`/dashboard/admin/faq`)
            }
        }catch(error){
            dispatch(updateUploadLoading(false))
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
}
export const updateStatus =(subCategoryId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${FaqApis.editFaq}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                // toast.success(response.data.message)
                dispatch(updateStatusLoading(false))
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))
           
        }
    }
}