import userAPIs from "@/constants/APIList/userAPIs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { updateStatusState, updateStatusLoading } from "../../slices/UserManagement";

const BASE_URL = process.env.VITE_BASE_URL;

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
        try {
            console.log(page, limit, search, "search from ")
            let api = `${userAPIs.getAllUsers}?page=${page}&limit=${limit}`

            if (search !== "") {
                api += `&search=${search}`;
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
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(userAPIs.createUser, userData, {
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
            console.log(editPage, "edit page");
            navigate(`/dashboard/admin/usermanagement?page=${editPage}`)
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
export const updateStatus = (subCategoryId, data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${userAPIs.updateUserById}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            console.log(response)
            if (response.status == 202) {
                
                console.log(response, "update status")
                dispatch(updateStatusState(response.data.data))
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

