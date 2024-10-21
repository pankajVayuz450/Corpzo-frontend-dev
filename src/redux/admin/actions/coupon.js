import couponApis from '@/constants/APIList/couponAPIs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { couponLoadingCreate, couponLoadingFatch, couponLoadingUpdate, getAllCouponsList, updateCouponStatusState } from '../slices/coupon';
export const getAllCoupons = (urlData) => {
    return async (dispatch) => {
        try {
            if (urlData.page === undefined) {
                urlData.page = 1
            }

            console.log("check page in get all coupon",urlData.page)
            dispatch(couponLoadingFatch(true));
            let api = `${couponApis.getAllCoupons}?page=${urlData.page}&limit=${urlData.limit}`

            if (urlData.search !== "") {
                api += `&search=${urlData.search}`;
            }

            if (urlData.couponId) {
                api += `&couponId=${urlData.couponId}`;
            }

            const authToken = localStorage.getItem('authToken');
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                dispatch(couponLoadingFatch(false))
                dispatch(getAllCouponsList({
                    couponsList: response.data.data.response || [],
                    totalCount: response.data.data.totalCount || 0,
                    currentPage: response.data.data.page || 1
                }))
            }
        } catch (error) {
            dispatch(couponLoadingFatch(false))
            console.log(error)
            if(error.response.data.statusCode === 400){
                toast.warn(error.response.data.message)
            }
            
        }
    }
}

export const createCoupon = (coupon, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(couponLoadingCreate(true))
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(couponApis.createCoupon, coupon, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "add response");
            if (response.status === 201) {
                console.log(navigate)
                dispatch(couponLoadingCreate(false))
                navigate(`/dashboard/admin/coupounmanagement`)
                toast.success(`Coupon Added Successfully`)
                dispatch(createCoupon(response.data.data))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(couponLoadingCreate(false))
        }
    }
}

export const updateCoupon = (coupon, navigate) => {

   

    return async (dispatch) => {
        try {
            dispatch(couponLoadingCreate(true))
            const authToken = localStorage.getItem('authToken');
            const response = await axios.put(`${couponApis.updateCouponById}/${coupon.id}`, coupon.newCoupon, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
          
            if (response.status === 200) {
                console.log(navigate)
                dispatch(couponLoadingCreate(false))
                navigate(`/dashboard/admin/coupounmanagement`)
                toast.success(`Coupon Updated Successfully`)
                // dispatch(updateCoupon(response.data.data))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(couponLoadingCreate(false))
        }
    }
}
export const deleteCoupon = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${couponApis.deleteCategory}/${categoryId}`);
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
            const response = await axios.get(`${couponApis.getDepartmentById}/${departmentId}`, {
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
            const response = await axios.put(`${couponApis.editDepartment}/${departmentId}`, { name: data.name, description: data.description, active: data.active }, {
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

export const updateCouponStatus = (couponId, data) => {
    return async (dispatch) => {
        try {
            dispatch(couponLoadingUpdate(true))
            const response = await axios.put(`${couponApis.updateCouponById}/${couponId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            if (response.status == 200) {

                console.log("check response update status ",response.data.data)
                dispatch(updateCouponStatusState(response.data.data))
                toast.success("Coupon Status Updated")
                dispatch(couponLoadingUpdate(false))
            }
        } catch (error) {
            toast.error(error.response.data.error)
            dispatch(couponLoadingUpdate(false))
        }
    }
}
