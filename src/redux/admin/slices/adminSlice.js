import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import adminAPIs from '@/constants/APIList/adminAuthAPIs';
import axios from 'axios';

export const adminLogin = createAsyncThunk(
  'user/adminLogin',
  async (data, { rejectWithValue, dispatch }) => {

    console.log("check data .........",data )
    try {
      const response = await axios.post(adminAPIs.login, data);
      if (response.data.statusCode === 200) {
        toast.success(response.data.data.message);
        
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
        
      toast.warn(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async ({ email, otp, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(adminAPIs.verifyOTP, { email, otp });
      console.log(response, "verify login")
      if(response.status === 200){
        localStorage.setItem("authToken", response.data.data.token)
        localStorage.setItem("role", response.data.data.role)
        navigate("/dashboard/admin/home")
      }
      return response.data.data;
    } catch (error) {
      
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  'user/resendOtp',
  async ({ email }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(adminAPIs.resendOTP, { email });
      toast.success(response.data.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: {},
  role: 'user',
  error: null,
  token: null,
  isLoading: false,
  isError: false,
  isOtp : false ,
};

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    handleError: (state, action) => {
      state.isError = action.payload;
    },
    handleOtp: (state, action) => {
        state.isOtp = action.payload;
      },
      handleLoading : (state, action)=>{
        state.isLoading = action.payload;
      },
      handleSignOut:(state, action)=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("role")
      }, 
      resenOtp : (state, action)=>{
        state.isOtp = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isOtp = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isOtp = false;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isOtp = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error before loading
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error before loading
      });
  },
});

export const { setUser, clearUser,resenOtp,  handleError, handleOtp, handleLoading, handleSignOut } = adminSlice.actions;

export default adminSlice.reducer;
