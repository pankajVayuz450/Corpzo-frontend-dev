import categoryAPIs from '@/constants/APIList/categoryAPIs';
import FaqApis from '@/constants/APIList/faqAPIs';
import StepsAPIs from '@/constants/APIList/StepsAPIs';
import SubscriptionsApis from '@/constants/APIList/suscriptions';
import axios from 'axios';
// import {getFaqs,addFaqs,updateStatusState,updateStatusLoading,getFaqById, updateLoading, updateAdding} from '@/redux/admin/slices/FAQ/index'
import { getSubscriptions, updateAdding, updateLoading, updateStatusState, updateStatusLoading, getSUbscriptionsById } from '../../slices/Subscriptions';
import { toast } from 'react-toastify';
const authToken = localStorage.getItem('authToken');

export const getAllSubscriptions = (limit = 10, page = 1, search = "", id) => {

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${SubscriptionsApis.getSubscriptions}?page=${page}&limit=${limit}&serviceId=${id}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get subscriptions")
            if (response.status == 200) {
                if (id) {
                    dispatch(getSUbscriptionsById(response.data.data[0]))
                }
                console.log(response, "subscription data")
                dispatch(getSubscriptions({
                    subscriptionList: response.data.data || [],
                    totalCount: response.data.totalCount || 0,
                }))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            console.log(error)

        }
    }
}
export const addSubscriptions = (subscriptions, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.post(SubscriptionsApis.addSubscriptions, subscriptions, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "add sunscription")
            if (response.data.code === 404) {
                toast.warn(response.data.message)
                dispatch(updateAdding(false))
                navigate(`/dashboard/admin/subscriptions/${subscriptions.serviceId}`)
                return
            }
            else if (response.status === 200) {
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/subscriptions/${subscriptions.serviceId}`)
            }
        } catch (error) {
            console.log(error, "add subscription error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const editSubscriptions = (stepId, subscriptions, navigate, serviceId) => {
    console.log(serviceId, "serviceId")
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.put(`${SubscriptionsApis.editSubscriptions}/${stepId}`, subscriptions, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if (response.status == 200) {
                toast.success(response.data.message);
                // dispatch(getSingleCategoryById(response.data.data))
                navigate(`/dashboard/admin/subscriptions/${serviceId}`)
                dispatch(updateAdding(false))
            }
        } catch (error) {
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const updateStatus = (subCategoryId, data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${SubscriptionsApis.editSubscriptions}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                // toast.success(response.data.message)
                dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            console.log(error, "error updating status")
            toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))

        }
    }
}