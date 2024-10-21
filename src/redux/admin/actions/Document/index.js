import OfferApis from '@/constants/APIList/offerAPIs';
import DocumentApis from '@/constants/APIList/document';
import axios from 'axios';
import { updateStatusState, updateStatusLoading, getOfferById} from "../../slices/Offer"
import { toast } from 'react-toastify';
import {  getServices } from '../../slices/Offer';
import {updateAdding,updateLoading, getDocuments, addDocument, updateDocumentReducer} from "../../slices/Document"
const authToken  = localStorage.getItem('authToken');

export const getAllDocuments =(limit = 10, page = 1, search="")=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${DocumentApis.getDocument}?limit=${limit}&page=${page}`
            
            if(search !== ""){
                api += `&search=${search}`
            }
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
            if(response.status == 200){
                dispatch(getDocuments({
                    documentList : response.data.data,
                }))
                // dispatch(getOffers({
                //     offerList : response.data.data.offers || [],
                //     totalCount : response.data.data.totalCount || 0,
                // }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error)
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
        }
    }
}

export const getFolderDocuments=(folderId)=>{  
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${DocumentApis.getFolderDocuments}?folderId=${folderId}`
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
            if(response.status == 200){
                dispatch(getDocuments({
                    documentList : response.data.data,
                }))
                // dispatch(getOffers({
                //     offerList : response.data.data.offers || [],
                //     totalCount : response.data.data.totalCount || 0,
                // }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error)
        }
    }
}
export const getActiveServices =()=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            console.log(OfferApis.getServices, "api end point")
            let api = `${OfferApis.getServices}?active=true`
          
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
            if(response.status == 200){
                dispatch(getServices({
                    serviceList : response.data.data || [],
                    
                }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error)
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }
        }
    }
}
export const addDocuments=(documentData, navigate)=>{
    
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(DocumentApis.addDocument, documentData, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log("document response",response)
            if(response.status === 200){
                dispatch(updateAdding(false))
                dispatch(addDocument(response.data.data))
                toast.success(response.data.message);

                navigate(`/dashboard/admin/offer`)
            }
        }catch(error){
            console.log(error, "add offer error");
            dispatch(updateAdding(false))
            // toast.error(error.response.data.message)
        }
    }
}

export const getSingleOffer=(offerId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${OfferApis.getOfferById}/${offerId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response, "........single offer")
                dispatch(getOfferById(response.data.data[0]))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
            // toast.error(error.response.data.error)

        }
    }
}

export const updateDocument=(folderId, folder)=>{
    console.log(folder, "from action")
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.put(`${DocumentApis.updateDocument}`,{folderId : folderId, folderName : folder}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if(response.status == 200){
                toast.success(response.data.message);
                dispatch(updateAdding(false))
                dispatch(updateDocumentReducer({folderId, folderName : folder}))
            }
        }catch(error){
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const uploadDocument = (formData) => {
    
    return async (dispatch) => {
        try {
            // dispatch(updateUploadLoading(true))
            dispatch(updateAdding(true))
            // dispatch(updateContent("Uploading Video"))
            
            let api = `${DocumentApis.uploadDocument}`

            const response = await axios.put(`${api}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                console.log(response, "response from upload document")
                dispatch(updateAdding(false))
                // dispatch(updateVideoUrl({
                //     fieldName: fieldName,
                //     url: response.data.data.url
                // }))
                // dispatch(updateUploadLoading(false))
                // dispatch(updateContent("Video Uploaded!"))
                // dispatch(updateHeader("Video Uploaded"))

            }
        } catch (error) {
            dispatch(updateAdding(false))
            console.error('Error uploading video:', error);
            // toast.error(error.response.data.error)
        }
    };
};

export const updateStatus =(offerId, data)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${OfferApis.editOffer}/${offerId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                
                dispatch(updateStatusState(response.data.data))
                // toast.success(response.data.message)
                dispatch(updateStatusLoading(false))
            }else{
                dispatch(updateStatusState(data))
            }
        }catch(error){
            console.log(error, "error from update status")
            // toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))
           
        }
    }
}

export const deleteStep = (stepId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${StepsAPIs.deleteSteps}/${stepId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                dispatch(deleteStepBId(stepId));
                toast.success(response.data.message)
            }
            console.log(response, "delete response");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}