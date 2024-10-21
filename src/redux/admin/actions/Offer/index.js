import OfferApis from '@/constants/APIList/offerAPIs';
import SubscriptionsApis from '@/constants/APIList/suscriptions';
import axios from 'axios';
import { updateStatusState, updateStatusLoading, getOfferById} from "../../slices/Offer"
import { toast } from 'react-toastify';
import { getOffers,updateLoading,getServices, updateAdding } from '../../slices/Offer';
const authToken  = localStorage.getItem('authToken');

export const getAllOffers =(limit = 10, page = 1, search="")=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${OfferApis.getOffers}?limit=${limit}&page=${page}`
          
            
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
                dispatch(getOffers({
                    offerList : response.data.data.offers || [],
                    totalCount : response.data.data.totalCount || 0,
                }))
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
export const addOffer=(offer, navigate)=>{
    
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(OfferApis.addOffers, offer, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log("offer response",response)
            if(response.status === 201){
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/offer`)
            }
        }catch(error){
            console.log(error, "add offer error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
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

export const editOffer=(offerId, offer,editPage, navigate)=>{
    console.log(offer, "from action")
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.put(`${OfferApis.editOffer}/${offerId}`,offer, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if(response.status == 200){
                toast.success(response.data.message);
                
                navigate(`/dashboard/admin/offer?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        }catch(error){
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

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