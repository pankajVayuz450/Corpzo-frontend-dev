import FaqApis from '@/constants/APIList/faqAPIs';
import StepsAPIs from '@/constants/APIList/StepsAPIs';
import axios from 'axios';
import { getSteps,updateLoading,updateStatusState,updateAdding, getStepById ,updateStatusLoading, deleteStepBId } from '../../slices/Steps';
import { toast } from 'react-toastify';
const authToken  = localStorage.getItem('authToken');

export const getAllSteps =( serviceId, id)=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${StepsAPIs.getSteps}`
            if(id){
                api+= `?id=${id}`;
            }
            if(serviceId){
                api+= `?serviceId=${serviceId}`;
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
           console.log(response, "checkl repsonse") 
            if(response.status == 200){
                if(id){
                    dispatch(getStepById(response.data.data[0]))
                }else{
                    dispatch(getSteps({
                        stepsList : response.data.data || [],
                    }))
                }
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

export const addSteps=(steps, navigate)=>{
    console.log(steps, "from add actions")
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(StepsAPIs.addSteps, steps, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log(response, "add faq response")
            if(response.status === 200){
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/steps/64f5b3a9d82e9b0012c8b9e3`)
            }
        }catch(error){
            console.log(error, "add faq error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const getSingleStep=(stepId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${StepsAPIs.getStepsById}/${stepId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response)
                
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
            // toast.error(error.response.data.error)

        }
    }
}

export const editStep=(stepId, step, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.put(`${StepsAPIs.editSteps}/${stepId}`,step, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if(response.status == 200){
                toast.success(response.data.message);
                // dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/steps/64f5b3a9d82e9b0012c8b9e3`)
                dispatch(updateAdding(false))
            }
        }catch(error){
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const updateStatus =(stepId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${StepsAPIs.editSteps}/${stepId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                dispatch(updateStatusLoading(false))
            }
        }catch(error){
            console.log(error, "error")
            
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