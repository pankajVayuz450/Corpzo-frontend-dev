import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    logs: [],
};

const logSLice = createSlice({
    name: "logSLice",
    initialState,
    reducers: {
        getLogs: (state, action) => {
            state.logs = action.payload.logs;
            state.totalCount = action.payload.totalCount;
        },
        updateLoading : (state, action)=>{
            state.isFetching = action.payload;
        }
    }
})

export const { getLogs,updateLoading } = logSLice.actions;

export default logSLice.reducer; 