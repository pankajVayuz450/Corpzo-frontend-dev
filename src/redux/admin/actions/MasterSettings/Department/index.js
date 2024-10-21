import departmentApis from '@/constants/APIList/departmentApi';
import axios from 'axios';
import { updateLoading, getdepartmentList, updateStatusLoading, updateAdding, getSingleDepartmentById, updateStatusState } from '@/redux/admin/slices/MasterSettings/DepartmentSlice/departmentSlice';
import { toast } from 'react-toastify';
export const getAllDepartments = (page = 1, limit = 10, search = "") => {
    return async (dispatch) => {
        try {
            if (page === undefined) {
                page = 1
            }
            dispatch(updateLoading(true));
            let api = `${departmentApis.getDepartment}?page=${page}&limit=${limit}`

            if (search !== "") {
                api += `&search=${search}`;
            }
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                dispatch(getdepartmentList({
                    departmentList: response.data.data.departments || [],
                    totalPages: response.data.data.totalPages || 0,
                    totalCount: response.data.data.totalCount || 0,
                    currentPage: response.data.data.currentPage || 1
                }))
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log(error)
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
            
        }
    }
}

export const addDepartment = (department, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(departmentApis.addDepartment, department, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "add response");
            if (response.status === 201) {
                console.log(navigate)
                dispatch(updateAdding(false))
                navigate(`/dashboard/admin/masterSettings/Department`)
                toast.success(`Department added successfully`)
                // dispatch(addDepartment(response.data.data))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(updateAdding(false))
        }
    }
}
export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${departmentApis.deleteCategory}/${categoryId}`);
            if (response.status == 200) {
                dispatch(deleteCategoryById(categoryId));
            }
            console.log(response, "delete response");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }
}
export const getSingleDepartment = (departmentId) => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true))
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get(`${departmentApis.getDepartmentById}/${departmentId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                // dispatch(deleteCategoryById(categoryId));
                console.log(response.data, "single department")
                dispatch(getSingleDepartmentById(response.data.data))
                dispatch(updateLoading(false))
            }
        } catch (error) {

            dispatch(updateLoading(false))
            toast.error(error.response.data.error)
        }
    }
}

export const editDepartment = (departmentId, data, navigate, editPage) => {
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const authToken = localStorage.getItem('authToken');
            const response = await axios.put(`${departmentApis.editDepartment}/${departmentId}`, { name: data.name, description: data.description, active: data.active }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                // dispatch(deleteCategoryById(categoryId));
                console.log(response.data, "single category")
                navigate(`/dashboard/admin/masterSettings/Department?page=${editPage}`);
                dispatch(updateAdding(false))
            }
        } catch (error) {
            toast.error(error.response.data.data.error)
            dispatch(updateAdding(false))
        }
    }
}

export const updateStatus = (departmentId, data) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${departmentApis.editDepartment}/${departmentId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            if (response.status == 200) {
                dispatch(updateStatusState(response.data.data))
                toast.success("Department status updated")
                dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(updateStatusLoading(false))
        }
    }
}
