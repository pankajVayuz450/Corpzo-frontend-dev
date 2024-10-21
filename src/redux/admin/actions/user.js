// Purpose: Contains the async functions for fetching and deleting a user.
// The fetchUserById action fetches a user by their ID from the server.
// The deleteUser action deletes a user by their ID from the server.
// The BASE_URL constant is the base URL of the server API.
// The fetchUserById action uses axios to make a GET request to the server API to fetch a user by their ID.
// The deleteUser action uses axios to make a DELETE request to the server API to delete a user by their ID.
// The createAsyncThunk function from the Redux Toolkit is used to create async actions.
// The actions are exported to be used in the Redux reducers and components.
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'https://formbuilder-backend-pg4i.onrender.com/api'

export const loginAdmin = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${BASE_URL}/user/login`, userData);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('role', response.data.data.role);
        return response.data.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${BASE_URL}/user/signup`, userData);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );
    