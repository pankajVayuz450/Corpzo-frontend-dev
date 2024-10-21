import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, signupUser } from '../actions/user';
import { toast } from 'react-toastify';

const initialState = {
  user: {},
  role:'user',
  error: null,
  token: null,
  isLoggedLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginAdmin.fulfilled, (state, action) => {
            state.user = {
                email: action.payload.email,
                name: action.payload.name,
            }
            state.error = null;
            state.isLoggedLoading = false; 
            state.role=action.payload.role;
            state.token = action.payload.token;
            toast.success('Login successful');
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload;
            state.isLoggedLoading = false;
            toast.error('Login failed');

        })
        .addCase(loginAdmin.pending, (state) => {
            state.user = null;
            state.isAdmin = false;
            state.error = null;
            state.isLoggedLoading = true;
        })

        builder
          .addCase(signupUser.fulfilled, (state, action) => {
              state.user = action.payload;
              state.error = null;
              state.isLoggedLoading = false;
              state.token = action.payload.token;
              state.role=action.payload.role;
              toast.success('Signup successful');
          })
          .addCase(signupUser.rejected, (state, action) => {
              state.user = null;
              state.isAdmin = false;
              state.error = action.payload;
              state.isLoggedLoading = false;
              toast.error('Signup failed');

          })
          .addCase(signupUser.pending, (state) => {
              state.user = null;
              state.isAdmin = false;
              state.error = null;
              state.isLoggedLoading = true;
          })
        
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
