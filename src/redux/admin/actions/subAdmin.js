import subAdminAPIs from '@/constants/APIList/subAdminAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateStatusState, updateStatusLoading } from '../slices/subAdmin';
import { toast } from 'react-toastify';
export const fetchSubAdmins = createAsyncThunk('subAdmins/fetchSubAdmins', async ({limit, page, search}) => {

    let api = `${subAdminAPIs.getAllSubAdmins}?limit=${limit}&page=${page}`

    if (search !== "") {
        api += `&search=${search}`
    }
    const response = await axios.get(api, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    console.log(response.data.data);
    return response.data.data;
});

export const createSubAdmin = createAsyncThunk('subAdmins/createSubAdmin', async (subAdminData) => {
    const response = await axios.post(subAdminAPIs.createSubAdmin, subAdminData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data.data;
});

export const updateSubAdmin = createAsyncThunk('subAdmins/updateSubAdmin', async ({id, subAdminData}) => {
   
    const response = await axios.put(`${subAdminAPIs.updateSubAdminById}/${id}`, subAdminData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data.data;
});

export const updateStatus = createAsyncThunk('subAdmins/updateStatus', async ({id, active}) => {
   
    console.log(active, "data deom the stupid actions")
    const response = await axios.put(`${subAdminAPIs.updateSubAdminById}/${id}`, {active : active}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data.data;
});

export const updateStatusTHUNK =(SubAdminId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${subAdminAPIs.updateSubAdminById}/${SubAdminId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            });
            if(response.status == 200){
                console.log(response.data, "single status frommactions responsr")
                dispatch(updateStatusState(response.data.data))
                dispatch(updateStatusLoading(false))
            }
        }catch(error){
            console.log(error)
            // toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))
           
        }
    }
}

export const deleteSubAdmin = createAsyncThunk('subAdmins/deleteSubAdmin', async (subAdminId) => {
    const response = await axios.delete(`${subAdminAPIs.deleteSubAdminById}?id=${subAdminId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data.data;
});

export const fetchSubAdminById = createAsyncThunk('subAdmins/fetchSubAdminById', async (subAdminId) => {
    const response = await axios.get(`${subAdminAPIs.getSubAdminById}/${subAdminId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data.data;
});

