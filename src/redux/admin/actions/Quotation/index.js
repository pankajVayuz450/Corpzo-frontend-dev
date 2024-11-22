import FaqApis from '@/constants/APIList/faqAPIs';
import StepsAPIs from '@/constants/APIList/StepsAPIs';
import axios from 'axios';
import {  getStepById, deleteStepBId } from '../../slices/Steps';
import { toast } from 'react-toastify';
import { getQuotation, updateLoading,updateStatusLoading, updateActiveInactiveLoading, updateActiveInactiveStatus, getSingleQuotationReducer,updateStatusState, updateAdding, getUsers, updateUserLoading, updateBusinessLoading, getBusiness } from '../../slices/Quotation';
import quotationAPIs from '@/constants/APIList/QuotationManagementAPIs';
const authToken = localStorage.getItem('authToken');

export const getAllQuotation = (limit = 10, page = 1, search = "") => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true))
            console.log(quotationAPIs.getAllQuotation, "quotationAPIs.getAllQuotation")
            let api = `${quotationAPIs.getAllQuotation}?limit=${limit}&page=${page}`

            if (search !== "") {
                api += `&query=${search}`
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            console.log(response, "quotation response")
            if (response.status === 200) {
                dispatch(getQuotation({
                    quotationList: response.data.data || [],
                    totalCount: response.data.total || 0,
                }));
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log("error", error)
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }

            dispatch(updateLoading(false))
        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const getAllUsers = () => {

    return async (dispatch) => {
        try {
            dispatch(updateUserLoading(true))
            const response = await axios.get(`${quotationAPIs.getAllUsers}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });


            if (response.status === 200) {
                console.log(response.data, "user List")
                dispatch(getUsers({
                    userList: response.data.data || [],
                    // totalCount: response.data.data.totalCount || 0,
                }));
                dispatch(updateUserLoading(false))
            }
        } catch (error) {
            console.log("error", error)
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }
            dispatch(updateUserLoading(false))
        } finally {

            dispatch(updateUserLoading(false))

        }
    };
};
export const getAllBusiness = (userId) => {

    return async (dispatch) => {
        try {
            dispatch(updateBusinessLoading(true))
            const response = await axios.get(`${quotationAPIs.getAllBusinesses}?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (response.status === 200) {
                console.log(response.data, "user List")
                dispatch(getBusiness({
                    businessList: response.data.data || [],
                    // totalCount: response.data.data.totalCount || 0,
                }));
                dispatch(updateBusinessLoading(false))
            }
        } catch (error) {
            console.log("error", error)
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }
            dispatch(updateBusinessLoading(false));
        } finally {

            dispatch(updateBusinessLoading(false))

        }
    };
};

export const createQuotation = (quotatioinData, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.post(quotationAPIs.createQuotation, quotatioinData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            if (response.status === 200) {
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/quotation`)
            }
        } catch (error) {
            console.log(error, "add faq error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const getSingleQuotation = (quotationId) => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));

            const response = await axios.get(`${quotationAPIs.getSingleQuotation}?quotationId=${quotationId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                console.log(response)
                dispatch(getSingleQuotationReducer(response.data.data[0]))
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(updateLoading(false))
            // toast.error(error.response.data.error)

        }
    }
}

export const updateQuotation = (quotationData, editPage, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.put(`${quotationAPIs.updateQuotation}`, quotationData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit quotation response")
            if (response.status == 200) {
                toast.success(response.data.message);
                // dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/quotation?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        } catch (error) {
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const updateStatus = (data) => {
    return async (dispatch) => {
        try {
            // dispatch(updateStatusLoading(true))
            const response = await axios.put(`${quotationAPIs.updateStatus}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
               
                dispatch(updateStatusState(data))
               toast.success("Status updated")
            }
        } catch (error) {
            console.log(error, "error")
            toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))

        }
    }
}

export const updateQuotationStatus = (quotationData) => {
    return async (dispatch) => {
        try {
            dispatch(updateActiveInactiveLoading(true))
            const response = await axios.put(`${quotationAPIs.updateQuotation}`, quotationData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit status response")
            if (response.status == 200) {
                toast.success(response.data.message);
                dispatch(updateActiveInactiveStatus(quotationData))
                // navigate(`/dashboard/admin/quotation?page=${editPage}`)
                dispatch(updateActiveInactiveLoading(false))
            }
        } catch (error) {
            dispatch(updateActiveInactiveLoading(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}