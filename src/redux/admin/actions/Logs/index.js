import { toast } from "react-toastify"
import { getLogs, updateLoading } from "../../slices/Logs"
import logsAPIs from "@/constants/APIList/logsAPIs"
import axios from "axios"
export const viewLogs = (page, search, parameter) => {
    return async (dispatch) => {
        console.log("called")
        try {
            dispatch(updateLoading(true));
            let api = `${logsAPIs.getLogs}?page=${page}&${parameter}`

            if(search!== ""){
                api += `&query=${search}`
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (response.status == 200) {
               
                dispatch(getLogs({
                    logs : response?.data?.data, 
                    totalCount : response.data.total
                }))
                console.log(response, "response logs")
                dispatch(updateLoading(false));
            }
        } catch (error) {
            dispatch(updateLoading(false));
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}