
import ApplicationAPIs from '@/constants/APIList/ApplicationManagement';
import axios from 'axios';
// import { getCategoryList, updateLoading, addCategory, deleteCategoryById, getSingleCategoryById, updateStatusState } from '@/redux/admin/slices/MasterSettings/CategorySlice/categorySlice';
// import { toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import { commentLoading, getAgentList, getApplications, getApplicationsFormData, getCaseHistoryList, getNoteList, manageUpdateCommentState, manageUpdateStatusState, setSubmitLoading, updateApplicationStatusLoading, updateLoading, updateStatusState } from '../../slices/AppliationManagement/Index';
import { FaTruckPlane } from 'react-icons/fa6';
const token = localStorage.getItem('authToken');

console.log("check token ", token)
export const getAllApplications = (page = 1, search = "",escalate=false) => {
    console.log("check valu for query",page,search,escalate)

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${ApplicationAPIs.getApplication}?&page=${page}&sort_by=date_asc`

            if (search !== "") {
                api = `${ApplicationAPIs.getApplication}?&page=${page}&query=${search}`
            }
            if (escalate !== false) {
                api = `${ApplicationAPIs.getApplication}?&page=${page}&isEscalated=${escalate}`
            }

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                console.log(response.data, response.status, "categories")
                dispatch(getApplications({
                    applicationsList: response.data.data || [],
                    totalCount: response.data.total,

                }))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            toast.error(error)
        }
    }
}
export const getApplicationForm = (applicationId, userId, formId) => {

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${ApplicationAPIs.getFormJson}?applicationId=${applicationId}&userId=${userId}&formId=${formId}`


            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                console.log(response.data, response.status, "categories")
                dispatch(getApplicationsFormData(response.data.data))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            toast.error(error)
        }
    }
}

export const addNoteAndField = (noteData, navigate) => {

    return async (dispatch) => {

        dispatch(updateLoading(true))
        try {
            const response = await axios.post(ApplicationAPIs.addNote, noteData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                // dispatch(addCategory(response.data.data))
                dispatch(updateLoading(false))
                if (noteData?.cloneFormFieldId != "") {
                    navigate(`/dashboard/admin/field-history`)
                    toast.success(` Field Note added successfully`)


                } else {

                    navigate(`/dashboard/admin/team-history`)
                    toast.success(` Team Note added successfully`)

                }
            }
        } catch (error) {
            dispatch(updateLoading(false))

            toast.error(error.response.data.error)
        }
    }
}
export const addNoteComment = (data) => {
    return async (dispatch) => {
        dispatch(commentLoading(true))
        try {
            const response = await axios.post(ApplicationAPIs.addNoteComment, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                dispatch(commentLoading(false))
                dispatch(manageUpdateCommentState(data))

                toast.success(`Comment  added successfully`)
                // navigate(`/dashboard/admin/masterSettings/Category`)
            }
        } catch (error) {
            dispatch(commentLoading(false))

            toast.error(error.response.data.error)
        }
    }
}

export const getNoteAndComment = (noteId) => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));

            const response = await axios.get(`${ApplicationAPIs.getNoteAndComment}/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(getNoteList(response.data.data))
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}
export const getActiveAgent = (agent) => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));

            const response = await axios.get(`${ApplicationAPIs.getAgent}?role=${agent}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(getAgentList(response.data.data))
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}
export const addCaseHistory = (data) => {
    return async (dispatch) => {
        dispatch(commentLoading(true))
        try {
            const response = await axios.post(ApplicationAPIs.getCaseHistory, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                dispatch(commentLoading(false))
                // dispatch(manageUpdateCommentState(data))
                // dispatch(addCategory(response.data.data))
                // toast.success(`Case added successfully`)
                // navigate(`/dashboard/admin/masterSettings/Category`)
            }
        } catch (error) {
            dispatch(commentLoading(false))

            toast.error(error.response.data.error)
        }
    }
}
export const getCaseHistory = (applicationId) => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));

            const response = await axios.get(`${ApplicationAPIs.getCaseHistory}/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(getCaseHistoryList(response.data.data))
                dispatch(updateLoading(false))
            }
        } catch (error) {
            console.log(error)
            dispatch(updateLoading(false))
        }
    }
}
export const updateApplicationStatus = (data) => {
    return async (dispatch) => {
        dispatch(setSubmitLoading(true))

        try {
            const response = await axios.put(`${ApplicationAPIs.editApplication}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(setSubmitLoading(false))

                dispatch(updateStatusState(response.data.data))
                toast.success(`Status updated successfully`)
            }
        } catch (error) {
            dispatch(setSubmitLoading(false))
            toast.error(error.response.data.error)
        }
    }
}
export const manageApplicationFormStatus = (data) => {
    return async (dispatch) => {
        dispatch(updateApplicationStatusLoading(true))
        try {
            const response = await axios.put(`${ApplicationAPIs.manageApplication}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(updateApplicationStatusLoading(false))
                dispatch(manageUpdateStatusState(data))
                console.log(response.data, "single category")
                // dispatch(updateStatusState(response.data.data))
                toast.success(`Status updated successfully`)
            }
        } catch (error) {
            dispatch(updateApplicationStatusLoading(false))
            toast.error(error.response.data.error)
        }
    }
}

export const manageApplicationEscalateStatus = (data) => {
    return async (dispatch) => {
        dispatch(updateApplicationStatusLoading(true))
        try {
            const response = await axios.put(`${ApplicationAPIs.escalate}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {
                dispatch(updateApplicationStatusLoading(false))
                
                toast.success(`Update Status `)
            }
        } catch (error) {
            dispatch(updateApplicationStatusLoading(false))
            toast.error(error.response.data.error)
        }
    }
}