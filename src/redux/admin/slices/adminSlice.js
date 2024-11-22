import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import adminAPIs from '@/constants/APIList/adminAuthAPIs';
import axios from 'axios';

export const adminLogin = createAsyncThunk(
  'user/adminLogin',
  async ({data, navigate}, { rejectWithValue, dispatch }) => {

    console.log("check data .........",data )
    try {
      const response = await axios.post(adminAPIs.login, data);
      console.log(response, "login response")
      if (response.data.code === 200) {
        // toast.success(response.data.data.message);
        navigate("/auth/otp-verification")
        return response.data.data[0];
      } else {
        toast.warn(response.data.message)
        return rejectWithValue(response.data.data);
      }
    } catch (error) {
     
      toast.warn(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async ({ id, otp, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(adminAPIs.verifyOTP, { id, otp });
      console.log(response, "verify login")
      if(response.data.code === 200){
        console.log( response.data.data[0], "response.data.data[0].token")
        localStorage.setItem("authToken", response.data.data[0].token)
        localStorage.setItem("role", response.data.data[0].role)
        toast.success(response.data.message)
        navigate("/dashboard/admin/home")
      }else{
        toast.warn(response.data.message)
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
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(adminAPIs.resendOTP, { id });
      console.log(response, "resend otp ")
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
  id:''
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
        console.log(action.payload, "payloa from slice")
        if(!action.payload) return;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isOtp = true;
        state.id = action.payload.id
        localStorage.setItem('userId', action.payload.id)
      })
      .addCase(adminLogin.rejected, (state, action) => {
        console.log(action.payload, "payloa from rejected")
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
