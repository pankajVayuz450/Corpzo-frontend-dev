import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isFetching: false,
  quotationList: [],
  userList: [],
  businessList: [],
  isAdding: false,
  totalPages: 0,
  quotation: {},
  totalCount: 0,
  diabled: false,
  childLoading: {},
  isStatusLoading: false,
  editPage: 1,
  userLoaidng: false,
  buisnessLoading: false,
  ativeInactiveStatus : false
};



const quotationSlice = createSlice({
  name: 'quotationSlice',
  initialState,
  reducers: {
    getQuotation: (state, action) => {
      state.quotationList = action.payload.quotationList;
      state.totalCount = action.payload.totalCount
    },
    getUsers: (state, action) => {
      state.userList = action.payload.userList;
    },
    getBusiness: (state, action) => {
      state.businessList = action.payload.businessList;
    },

    updateLoading: (state, action) => {
      state.isFetching = action.payload;
    },
    updateUserLoading: (state, action) => {
      state.userLoaidng = action.payload;
    },
    updateBusinessLoading: (state, action) => {
      state.buisnessLoading = action.payload;
    },
    updateAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    getSingleQuotationReducer: (state, action) => {
      state.quotation = action.payload
    },
    updateStatusLoading: (state, action) => {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      console.log(action.payload, "update status from quotation")
      const { quotationId, status } = action.payload;
      
      state.quotationList = state.quotationList.map((step) => {
        if (step._id === quotationId
        ) {
          return { ...step, status };
        }
        return step;
      });
    },
    updateActiveInactiveLoading : (state, action)=>{
      state.ativeInactiveStatus = action.payload;
    },
    updateActiveInactiveStatus : (state, action)=>{
      const { quotationId, active } = action.payload;
      
      state.quotationList = state.quotationList.map((step) => {
        if (step._id === quotationId
        ) {
          return { ...step, active };
        }
        return step;
      });
    },
    updateEditPage: (state, action) => {
      state.editPage = action.payload;
    }
  },
});
export const { getQuotation, getUsers, getSingleQuotationReducer, updateUserLoading, updateBusinessLoading,updateActiveInactiveStatus,updateActiveInactiveLoading, getBusiness, updateEditPage, updateStatusLoading, updateLoading, updateStatusState, deleteStepBId, updateAdding, getStepById } = quotationSlice.actions;

export default quotationSlice.reducer;
