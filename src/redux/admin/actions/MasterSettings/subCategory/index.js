import SubCategoryAPIs from '@/constants/APIList/SubCategoryApis';
import axios from 'axios';
import { getSubCategoryList, updateLoading,updateStatusLoading, getSingleSubCategoryById, updateStatusState, getActiveCategoryList } from '@/redux/admin/slices/MasterSettings/subCategorySlice/aubCategorySlice';
import { updateAdding } from '@/redux/admin/slices/MasterSettings/subCategorySlice/aubCategorySlice';
import { toast } from 'react-toastify';
const token = localStorage.getItem('authToken')

export const getAllSubCategories = (limit = 10, page = 1, search = "") => {
    return async (dispatch) => {
        try {

            dispatch(updateLoading(true));
            let api = `${SubCategoryAPIs.getSubCategory}?limit=${limit}&page=${page}`

            if (search !== "") {
                api += `&search=${search}`
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log(response.data.data)
                dispatch(getSubCategoryList({
                    subCategoryList: response.data.data.subSections || [],
                    totalCount: response.data.data.totalCount || 0,
                }));
            }
        } catch (error) {
            
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
            dispatch(updateLoading(true));
        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const getAllActiveCategories = (active) => {
    return async (dispatch) => {
        try {

            dispatch(updateLoading(true));
            let api = `${SubCategoryAPIs.getActiveCategories}?active=${active}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log(response, "active categories")
                dispatch(getActiveCategoryList({
                    activeCategories: response.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            toast.error(error.response.data.error)

            dispatch(updateLoading(true));
        } finally {

            dispatch(updateLoading(false));

        }
    };
};



export const addSubCategory = (subCategory, navigate) => {
    console.log(subCategory, "from actions");
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.post(SubCategoryAPIs.addSubCategory, subCategory, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {  
                dispatch(updateAdding(false))
                navigate(`/dashboard/admin/masterSettings/Sub-Category`)
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(updateAdding(false))
        }
    }
}
export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${categoryAPIs.deleteCategory}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(deleteCategoryById(categoryId));
            }
            console.log(response, "delete response");
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
}
export const getSingleSubCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${SubCategoryAPIs.getSubCategoryById}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                // dispatch(deleteCategoryById(categoryId));
                dispatch(getSingleSubCategoryById(response.data.data))
            }
        } catch (error) {
            console.log(error)
            
        }
    }
}

export const editSubCategory = (subCategoryId, data, navigate, editPage) => {
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            console.log(data, "data edit")
            const response = await axios.put(`${SubCategoryAPIs.editSubCategory}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                // dispatch(deleteCategoryById(categoryId));
                console.log(response.data, "single category")
                dispatch(getSingleSubCategoryById(response.data.data))
                toast.success(`Sub category updated`)
                navigate(`/dashboard/admin/masterSettings/Sub-Category?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(updateAdding(false))
            toast.error(error.response.data.data.error)
        }
    }
}

export const updateStatus = (subCategoryId, data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${SubCategoryAPIs.editSubCategory}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(getSingleSubCategoryById(response.data.data))
                dispatch(updateStatusState(response.data.data))
                toast.success(`Status updated`)
                dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(updateStatusLoading(false))
        }
    }
}