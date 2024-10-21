import { createSlice } from '@reduxjs/toolkit';
import { fetchValidFormElements,updateValidFormElement,deleteValidFormElement,createValidFormElement } from '../../../actions/MasterSettings/Valid Form Elements/index';
import { toast } from 'react-toastify';

const validFormElementsInitialState = {
    validFormElements: [],
    isFetchingValidFormElements: false,
    isCreatingValidFormElement: false,
    isUpdatingValidFormElement: false,
    isDeletingValidFormElement: false,
    error: null,
  };

  

const validFormElementsSlice = createSlice({
    name: 'validFormElements',
    initialState: validFormElementsInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchValidFormElements.pending, (state) => {
          state.isFetchingValidFormElements = true;
        }
        )
        .addCase(fetchValidFormElements.fulfilled, (state, action) => {
          state.isFetchingValidFormElements = false;
          console.log( action.payload.data);
          state.validFormElements = action.payload.data;
        })
        .addCase(fetchValidFormElements.rejected, (state, action) => {
          state.isFetchingValidFormElements = false;
          state.error = action.error.message;
          toast.error("Failed to fetch data");
        });

      builder
        .addCase(createValidFormElement.pending, (state) => {
          state.isCreatingValidFormElement = true;
          
        })
        .addCase(createValidFormElement.fulfilled, (state, action) => {
          console.log("action.payload.data",action.payload);
          
          
          state.isCreatingValidFormElement = false;
          state.validFormElements?.data.push(action.payload);
        })
        .addCase(createValidFormElement.rejected, (state, action) => {
          
          state.isCreatingValidFormElement = false;
          state.error = action.error.message;
        });

      builder
        .addCase(updateValidFormElement.pending, (state) => {
          state.isUpdatingValidFormElement = true;
        })
        .addCase(updateValidFormElement.fulfilled, (state, action) => {
          state.isUpdatingValidFormElement = false;
          // const index = state.validFormElements?.data.findIndex((element) => element.id === action.payload.data.id);
          // state.validFormElements?.data[index] = action.payload.data;
          toast.success("Element updated successfully");
        })
        .addCase(updateValidFormElement.rejected, (state, action) => {
          state.isUpdatingValidFormElement = false;
          state.error = action.error.message;
          toast.error("Failed to update element");
        });

      builder
        .addCase(deleteValidFormElement.pending, (state) => {
          state.isDeletingValidFormElement = true;
        })
        .addCase(deleteValidFormElement.fulfilled, (state, action) => {
          state.isDeletingValidFormElement = false;
          state.validFormElements = state.validFormElements?.data.filter((element) => element.id !== action.payload.data.id);
          toast.success("Element deleted successfully");
        })
        .addCase(deleteValidFormElement.rejected, (state, action) => {
          state.isDeletingValidFormElement = false;
          state.error = action.error.message;
          toast.error("Failed to delete element");
        });
        
    },
  });
  
  export default validFormElementsSlice.reducer;
  