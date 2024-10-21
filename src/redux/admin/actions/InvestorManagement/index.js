import InvestorAPIs from '@/constants/APIList/InvestorManagement';
import axios from 'axios';
import { getInvestors,updateLoading,updateAdding, getSingleInvestorById } from '../../slices/InvestorManagement/Index';
import { toast } from 'react-toastify';
const token  = localStorage.getItem('authToken');
export const getAllInvestors =(limit = 10, page = 1, search="")=>{
    console.log(limit, search,page)
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${InvestorAPIs.getInvestor}?limit=${limit}&page=${page}`
            
            if(search !== ""){
                api += `&search=${search}`
            }
         
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.data, "Investors")
            if(response.status == 200){
                dispatch(getInvestors({
                    investorList : response.data.data.investors || [],
                    totalPages : response.data.data.totalCount || 0,
                }))
                dispatch(updateLoading(false))
                
            }
        }catch(error){
            dispatch(updateLoading(false));
            toast.error(error)
        }
    }
}

export const addInvestor=(category, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateAdding(true))
            const response = await axios.post(InvestorAPIs.addInvestor, category, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.status === 201){
                toast.success(`Investor added successfully`)
                dispatch(updateAdding(false))
                navigate(`/dashboard/admin/investor-management`)
            }
        }catch(error){
            toast.error(error.response.data.message)
            dispatch(updateAdding(false))
        }
    }
}
export const deleteCategory=(categoryId)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`${InvestorAPIs.deleteCategory}/${categoryId}`);
            if(response.status == 200){
                dispatch(deleteCategoryById(categoryId));
            }
            console.log(response, "delete response");
        }catch(error){
            console.log(error)
        }
    }
}
export const getSingleInvestor=(investorId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const token  = localStorage.getItem('token');
            const response = await axios.get(`${InvestorAPIs.getInvestorById}/${investorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                dispatch(getSingleInvestorById(response.data.data))
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}

export const editCategory=(categoryId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            console.log(data, "data edit")
            const response = await axios.put(`${InvestorAPIs.editCategory}/${categoryId}`, {active : data.active, categoryName : data.categoryName}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/masterSettings/Category`)
                toast.success(`Category updated successfully`)
            }
        }catch(error){
            console.log(error)
            toast.error(`Could'nt update category`)
        }
    }
}

export const updateStatus =(subCategoryId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            console.log(data, "data edit")
            const response = await axios.put(`${InvestorAPIs.editCategory}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                navigate(`/dashboard/admin/masterSettings/Category`)
                toast.success(`Status updated successfully`)
            }
        }catch(error){
            console.log(error)
            toast.error(`Could'nt update status`)
        }
    }
}