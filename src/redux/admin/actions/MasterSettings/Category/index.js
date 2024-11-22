import categoryAPIs from '@/constants/APIList/categoryAPIs';
import axios from 'axios';
import { getCategoryList, updateLoading, childLoading, updateAdding, updateStatusLoading, deleteCategoryById, getSingleCategoryById, updateStatusState, toggleSwitchSuccess, toggleSwitchFailure } from '@/redux/admin/slices/MasterSettings/CategorySlice/categorySlice';
// import { toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
const authToken  = localStorage.getItem('authToken');
console.log(authToken)
export const getAllCategories =(limit = 10, page = 1, search="")=>{
   
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${categoryAPIs.getCategory}?limit=${limit}&page=${page}`
            
            if(search !== ""){
                api = `${categoryAPIs.getCategory}?limit=${limit}&page=${page}&search=${search}`
            }
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            if(response.status == 200){
                console.log(response.data.data.totalCount, "categories")
                dispatch(getCategoryList({
                    categoryList : response.data.data.sections || [],
                    totalCount : response.data.data.totalCount || 0,
                    currentPage : response.data.data.currentPage || 1
                }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
        }
    }
}

export const addCatgeory=(category, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(categoryAPIs.addCategory, category, {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            })
            if(response.status === 201){
                dispatch(updateAdding(false))
                toast.success(`Category added successfully`)
                navigate(`/dashboard/admin/masterSettings/Category`)
                
            }
        }catch(error){
            dispatch(updateAdding(false))
            toast.error(error.response.data.error)
        }
    }
}
export const deleteCategory=(categoryId)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`${categoryAPIs.deleteCategory}/${categoryId}`);
            if(response.status == 200){
                dispatch(deleteCategoryById(categoryId));
            }
            console.log(response, "delete response");
        }catch(error){
            console.log(error)
        }
    }
}
export const getSingleCategory=(categoryId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${categoryAPIs.getCategoryById}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                dispatch(getSingleCategoryById(response.data.data))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
            toast.error(error.response.data.error)

        }
    }
}

export const editCategory=(categoryId, data, navigate, editPage)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.put(`${categoryAPIs.editCategory}/${categoryId}`, {active : data.active, categoryName : data.categoryName}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/masterSettings/Category?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        }catch(error){
            dispatch(updateAdding(false))
            toast.error(error.response.data.data.error)

        }
    }
}

export const updateStatus =(CategoryId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            dispatch(childLoading({CategoryId, loading : true}))
            const response = await axios.put(`${categoryAPIs.editCategory}/${CategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                // toast.success(`Status updated successfully`)
                dispatch(updateStatusLoading(false))
                dispatch(childLoading({CategoryId, loading : false}))
            }
        }catch(error){
            toast.error(error.response.data.error)
            dispatch(updateStatusLoading(false))
            dispatch(childLoading({CategoryId, loading : false}))
           
        }
    }
}