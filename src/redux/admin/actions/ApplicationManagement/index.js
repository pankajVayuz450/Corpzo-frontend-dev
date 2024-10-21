
import ApplicationAPIs from '@/constants/APIList/ApplicationManagement';
import axios from 'axios';
// import { getCategoryList, updateLoading, addCategory, deleteCategoryById, getSingleCategoryById, updateStatusState } from '@/redux/admin/slices/MasterSettings/CategorySlice/categorySlice';
// import { toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import { getApplications, getApplicationsFormData, getCaseHistoryList, getNoteList, updateLoading, updateStatusState } from '../../slices/AppliationManagement/Index';
const token  = localStorage.getItem('authToken');
export const getAllApplications =(page = 1, search="")=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${ApplicationAPIs.getApplication}?&page=${page}&sort_by=date_asc`
            
            if(search !== ""){
                api = `${ApplicationAPIs.getApplication}?&page=${page}&query=${search}`
            }
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                console.log(response.data,response.status, "categories")
                dispatch(getApplications({
                    applicationsList : response.data.data || [],
                    totalCount : response.data.total,

                }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            toast.error(error)
        }
    }
}
export const getApplicationForm =(applicationId, userId,formId)=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${ApplicationAPIs.getApplication}?applicationId=${applicationId}&userId=${userId}&formId=${formId}`
          
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                console.log(response.data,response.status, "categories")
                dispatch(getApplicationsFormData(response.data.data ))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            toast.error(error)
        }
    }
}

export const addNoteAndField=(data)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(ApplicationAPIs.addNote, data, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.status === 201){
                // dispatch(addCategory(response.data.data))
                toast.success(`Note added successfully`)
                // navigate(`/dashboard/admin/masterSettings/Category`)
            }
        }catch(error){
           
            toast.error(error.response.data.error)
        }
    }
}
export const addNoteComment=(data)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(ApplicationAPIs.addNoteComment, data, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.status === 201){
                // dispatch(addCategory(response.data.data))
                toast.success(`Comment  added successfully`)
                // navigate(`/dashboard/admin/masterSettings/Category`)
            }
        }catch(error){
           
            toast.error(error.response.data.error)
        }
    }
}

export const getNoteAndComment=(noteId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${ApplicationAPIs.getNoteAndComment}/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                dispatch(getNoteList(response.data.data))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}
export const getCaseHistory=(applicationId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${ApplicationAPIs.getCaseHistory}/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                dispatch(getCaseHistoryList(response.data.data))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}






export const updateApplicationStatus =( data)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`${ApplicationAPIs.editApplication}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                // dispatch(updateStatusState(response.data.data))
                toast.success(`Status updated successfully`)
            }
        }catch(error){
            toast.error(error.response.data.error)
        }
    }
}
export const manageApplicationFormStatus =( data)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`${ApplicationAPIs.manageApplication}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                // dispatch(updateStatusState(response.data.data))
                toast.success(`Status updated successfully`)
            }
        }catch(error){
            toast.error(error.response.data.error)
        }
    }
}