import userAPIs from "@/constants/APIList/userAPIs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { updateStatusState,getLogs,updateLogsLoading, updateUserPormotionRole, serviceProgress, getUserIdReucer, updateVerifyUserLoading, transactionDocumentLoading, updateProgressLoading, transactionDocumentUrl, updateBusinessFetching, downloadUsers, updateDownlaodUserFetching, updateServiceFetching, updateStatusLoading, getUserServicesReducer, getBusinessDetails, getTransactions, updateTransactionFetching, updateUserPromotionLoading, deleteUserById } from "../../slices/UserManagement";

const BASE_URL = process.env.VITE_BASE_URL;

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async ({ page = 1, limit = 10, search = "", isDeleted = false }, { rejectWithValue }) => {
        try {
            console.log(page, limit, search, "search from ")
            let api = `${userAPIs.getAllUsers}?page=${page}&limit=${limit}`

            if (search !== "") {
                api += `&search=${search}`;
            }
            if (isDeleted) {
                api += `&isDeleted=${isDeleted}`;
            }
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData, { dispatch, rejectWithValue }) => {
        console.log(userData, "from action")
        try {
            const response = await axios.post(userAPIs.createUser, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log(response.data.data, "create user thunk")
            if (userData.isTemporaryUser) {
                dispatch(verifyUser({ userId: response?.data?.data?._id }))
            }
            return response.data.data;
        } catch (error) {
            console.log(error, "user creation error")
            return rejectWithValue(error.response.data);
        }
    }
);


export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${userAPIs.deleteUserById}?id=${userData}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, userData, editPage, navigate }, { rejectWithValue }) => {
        console.log(id, userData);
        try {
            const response = await axios.put(`${userAPIs.updateUserById}/${id}`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log(response, "edit user");
            if(response.status== 202){

                navigate(`/dashboard/admin/usermanagement?page=${editPage}`)
                toast.success(response.data.message)
            }
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${userAPIs.getUserById}/${userData}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log(response.data.data, "user from api")
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateStatus = (userId, data) => {
    console.log(data, "data")
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${userAPIs.updateUserById}/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response)
            if (response.status == 202) {

                console.log(response, "update status")
                dispatch(updateStatusState({userId, active : data.active}))
                toast.success(`Status updated`)
                dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            console.log(error)
            toast.error(`Could'nt update record`)
            dispatch(updateStatusLoading(false))
        }
    }
}

export const getAllBusiness = (limit = 10, page = 1, search = "", userId) => {
    console.log(userId, "useriddddd")
    return async (dispatch) => {
        try {
            dispatch(updateBusinessFetching(true));
            let api = `${userAPIs.getBusinessDetails}?limit=${limit}&page=${page}&userId=${userId}`

            if (search !== "") {
                api += `&query=${search}`
            }

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(response, "Business details")
            if (response.status == 200) {
                dispatch(getBusinessDetails({
                    businessDetails: response.data.data,
                }))
                dispatch(updateBusinessFetching(false));
            }
        } catch (error) {
            dispatch(updateBusinessFetching(false));

        }
    }
}
export const getUserServices = (userId) => {
    // console.log(userId, "useriddddd")
    return async (dispatch) => {
        try {
            dispatch(updateServiceFetching(true));
            let api = `${userAPIs.getAllUserServices}?serviceId=${userId}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(response, "service details details")
            if (response.status == 200) {
                dispatch(getUserServicesReducer({
                    userSteps: response.data.data,
                }))
                dispatch(updateServiceFetching(false));
            }
        } catch (error) {
            dispatch(updateServiceFetching(false));

        }
    }
}
export const getAllTransactions = (id) => {
    return async (dispatch) => {
        try {
            dispatch(updateTransactionFetching(true));
            let api = `${userAPIs.getAllTransactions}?userId=${id}`
            
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(response, "service details details")
            if (response.status == 200) {
                dispatch(getTransactions({
                    transactionDetails: response.data.data,
                }))
                dispatch(updateTransactionFetching(false));
            }
        } catch (error) {
            dispatch(updateTransactionFetching(false));
        }
    }
}

export const getAllProgress = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(updateProgressLoading(true));
            let api = `${userAPIs.getAllProgress}?userId=${userId}&page=1`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(response, "serviceails")
            if (response.status == 200) {
                dispatch(updateProgressLoading(true));
                dispatch(serviceProgress({
                    servivceProgress: response.data.data,
                }))
            }
        } catch (error) {
            dispatch(updateProgressLoading(false));
        }
    }
}

export const downloadUser = () => {
    return async (dispatch) => {
        try {
            dispatch(updateDownlaodUserFetching(true));
            let api = `${userAPIs.downloadUsers}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
                dispatch(downloadUsers({
                    downloadUsers: response.data.data,
                }))
                dispatch(updateDownlaodUserFetching(false));
            }
        } catch (error) {
            dispatch(updateDownlaodUserFetching(false));
            console.log(error)
        }
    }
}
export const viewInvoice = (transactionId) => {
    return async (dispatch) => {
        try {
            dispatch(transactionDocumentLoading(true));

            const response = await axios.get(`${userAPIs.viewInvoice}?transactionId=${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
                dispatch(transactionDocumentUrl(response?.data?.data))

                dispatch(transactionDocumentLoading(false));
            }
        } catch (error) {
            dispatch(transactionDocumentLoading(false));
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}

const getProgress = () => {
    return async (dispatch) => {
        try {
            dispatch(updateDownlaodUserFetching(true));
            let api = `${userAPIs.downloadUsers}`

            const response = await axios.get(`${BASE_URL}/admin/all-service-progress?userId=66da879e8ea314c944ea2db4&page=1`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
                // dispatch(downloadUsers({
                //     downloadUsers: response.data.data,
                // }))
                console.log(response.data, "progressAPI")
                dispatch(updateDownlaodUserFetching(false));
            }
        } catch (error) {
            dispatch(updateDownlaodUserFetching(false));
            console.log(error)
        }
    }
}

export const verifyUserFormTable = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(updateVerifyUserLoading({ userId: userId, loading: true }))
            const response = await axios.put(`${userAPIs.verifyUserFormTable}`, userId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response, "verify user response")
            if (response.status == 202) {

                console.log(response, "update status")
                // dispatch(updateStatusState(response.data.data))
                // toast.success(`Status updated`)
                dispatch(updateVerifyUserLoading({ userId: userId, loading: false }))

                // dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            console.log(error)
            toast.error(`Could'nt update record`)
            dispatch(updateVerifyUserLoading({ userId: userId, loading: false }))

        }
    }
}
export const verifyUser = (userId) => {
    console.log(userId, "data")
    return async (dispatch) => {
        try {

            const response = await axios.put(`${userAPIs.verifyTemporaryUser}`, userId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response, "verify user response")
            if (response.status == 202) {

                console.log(response, "update status")
                // dispatch(updateStatusState(response.data.data))
                // toast.success(`Status updated`)


                // dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            console.log(error)
            toast.error(`Could'nt update record`)


        }
    }
}

export const getUserId = () => {
    return async (dispatch) => {
        try {
            // dispatch(transactionDocumentLoading(true));

            const response = await axios.get(`${userAPIs.getUserId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
                console.log(response, "userId response")
                dispatch(getUserIdReucer(response?.data?.data.userIdNumber));
                // dispatch(transactionDocumentLoading(false));
            }
        } catch (error) {
            // dispatch(transactionDocumentLoading(false));
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}

export const promoteDemoteUser = (data) => {
    return async (dispatch) => {
        try {
            // dispatch(updateUserPromotionLoading(true))
            const response = await axios.put(`${userAPIs.promoteDemoteUser}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response, "rwepsonse form actions")
            if (response.status == 202) {

                console.log(response, "update status")
                // dispatch(updateStatusState(response.data.data))
                dispatch(updateUserPormotionRole(data))
                toast.success(response?.data.message)
                dispatch(updateUserPromotionLoading(false))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            dispatch(updateUserPromotionLoading(false))
        }
    }
}

export const archiveUser = (data) => {
    return async (dispatch) => {
        try {
            // dispatch(updateUserPromotionLoading(true))
            const response = await axios.put(`${userAPIs.archiveUser}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response, "response from actions")
            if (response.status == 202) {
                dispatch(deleteUserById(data))
                console.log(response, "update status")
                toast.success("User Archived")
                // dispatch(updateStatusState(response.data.data))


            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            dispatch(updateUserPromotionLoading(false))
        }
    }
}

export const viewLogs = (page, search) => {
    return async (dispatch) => {
        try {
            dispatch(updateLogsLoading(true));
            let api = `${userAPIs.viewLogs}?page=${page}&moduleName=users`

            if(search!== ""){
                api += `&query=${search}`
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
                // dispatch((getLogs?.data?.data))
                dispatch(getLogs({
                    logs : response?.data?.data, 
                    totalCount : response.data.total
                }))
                console.log(response, "response logs")
                dispatch(updateLogsLoading(false));
            }
        } catch (error) {
            dispatch(updateLogsLoading(false));
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}