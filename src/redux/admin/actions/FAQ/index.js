import categoryAPIs from '@/constants/APIList/categoryAPIs';
import FaqApis from '@/constants/APIList/faqAPIs';
import axios from 'axios';
import {getFaqs,getAllServiceFaqs,addFaqs,updateStatusState,updateStatusLoading,getFaqById, updateLoading, updateAdding} from '@/redux/admin/slices/FAQ/index'
import { toast } from 'react-toastify';
const authToken  = localStorage.getItem('authToken');

export const getAllFaqs =(limit = 10, page = 1, search="")=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${FaqApis.getFaqs}?limit=${limit}&page=${page}`
            
            if(search !== ""){
                api += `&search=${search}`
            }
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get faq")
            if(response.status == 200){
                dispatch(getFaqs({
                    faqList : response.data.data.faqs || [],
                    totalCount : response.data.data.totalCount || 0,
                    totalPages : response.data.data.totalPages || 1,
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
export const getServiceFaqs =(serviceId)=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${FaqApis.getAllServiceFaqs}?serviceId=${serviceId}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get all service faqs")
            if(response.status == 200){
                dispatch(getAllServiceFaqs({
                    serviceFaqs : response.data.data || []
                    
                }))
                // dispatch(getFaqs({
                //     faqList : response.data.data.faqs || [],
                //     totalCount : response.data.data.totalCount || 0,
                //     totalPages : response.data.data.totalPages || 1,
                // }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error)
        }
    }
}

export const addServiceFaq =(serviceFaqs, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(FaqApis.addsServiceFaqs, serviceFaqs, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log(response, " ")
            if(response.status === 200){
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/service`)
            }
        }catch(error){
            console.log(error, "add faq error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}
export const addFaq=(faq, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(FaqApis.addFaqs, faq, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            console.log(response, "add faq response")
            if(response.status === 200){
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/faq`)
            }
        }catch(error){
            console.log(error, "add faq error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const getSingleFaq=(faqId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${FaqApis.getFaqById}/${faqId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response)
                dispatch(getFaqById(response.data.data))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
            // toast.error(error.response.data.error)

        }
    }
}

export const editFaq=(categoryId, data, navigate, editPage = 1)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.put(`${FaqApis.editFaq}/${categoryId}`, {active : data.active,answer : data.answer, question : data.question}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response)
                toast.success(response.data.message);
                // dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/faq?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        }catch(error){
            dispatch(updateAdding(false))
            console.log(error)
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
                dispatch(updateStatusLoading(false))
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))
           
        }
    }
}