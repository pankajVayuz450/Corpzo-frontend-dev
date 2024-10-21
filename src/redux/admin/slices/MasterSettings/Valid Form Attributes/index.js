import { createSlice } from '@reduxjs/toolkit';
import {fetchValidFormAttributes,createValidFormElementAttributes,updateValidFormElementAttributes,deleteValidFormElementTypes} from '../../../actions/MasterSettings/Valid Form Attributes/index';

const validFormAttributesInitialState = {
  validFormAttributes: [],
  isFetchingValidFormAttributes: false,
  isCreatingValidFormAttribute: false,
  isUpdatingValidFormAttribute: false,
  isDeletingValidFormAttribute: false,
  error: null,
};

  const validFormAttributesSlice = createSlice({
    name: 'validFormAttributes',
    initialState: validFormAttributesInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder 
        .addCase(fetchValidFormAttributes.pending, (state) => {
          state.isFetchingValidFormElements = true;
        }
        )
        .addCase(fetchValidFormAttributes.fulfilled, (state, action) => {
          state.isFetchingValidFormElements = false;
          state.validFormAttributes = action.payload.data;
        })
        .addCase(fetchValidFormAttributes.rejected, (state, action) => {
          state.isFetchingValidFormElements = false;
          state.error = action.error.message;
          toast.error("Failed to fetch data");
        });

      builder
        .addCase(createValidFormElementAttributes.pending, (state) => {
          console.log("(createValidFormElementAttributes.pending");
          
          state.isCreatingValidFormAttribute = true;
        })
        .addCase(createValidFormElementAttributes.fulfilled, (state, action) => {
          console.log("createValidFormElementAttributes.fulfilled");
          console.log("action payload",action.payload);
          
          
          state.isCreatingValidFormAttribute = false;
          // state.validFormAttributes.push(action.payload.data);
        })
        .addCase(createValidFormElementAttributes.rejected, (state, action) => {
          console.log("(createValidFormElementAttributes.rejected");
          
          state.isCreatingValidFormAttribute = false;
          state.error = action.error.message;
        });

      builder
        .addCase(updateValidFormElementAttributes.pending, (state) => {
          state.isUpdatingValidFormElement = true;
        })
        .addCase(updateValidFormElementAttributes.fulfilled, (state, action) => {
          state.isUpdatingValidFormElement = false;
          const index = state.validFormAttributes.findIndex((element) => element.id === action.payload.data.id);
          state.validFormAttributes[index] = action.payload.data;
          toast.success("Element updated successfully");
        })
        .addCase(updateValidFormElementAttributes.rejected, (state, action) => {
          state.isUpdatingValidFormElement = false;
          state.error = action.error.message;
          toast.error("Failed to update element");
        });

      builder
        .addCase(deleteValidFormElementTypes.pending, (state) => {
          state.isDeletingValidFormElement = true;
        })
        .addCase(deleteValidFormElementTypes.fulfilled, (state, action) => {
          state.isDeletingValidFormElement = false;
          state.validFormAttributes = state.validFormAttributes.filter((element) => element.id !== action.payload.data.id);
          toast.success("Element deleted successfully");
        })
        .addCase(deleteValidFormElementTypes.rejected, (state, action) => {
          state.isDeletingValidFormElement = false;
          state.error = action.error.message;
          toast.error("Failed to delete element");
        });
        
    },
  });
  
  export default validFormAttributesSlice.reducer;
  