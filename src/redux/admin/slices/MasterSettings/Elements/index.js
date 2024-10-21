import { createSlice } from '@reduxjs/toolkit';
import { fetchAllElements,createFormElement,updateFormElement,deleteFormElement } from '../../../actions/MasterSettings/Elements/index';
import { toast } from 'react-toastify';

const elementsInitialState = {
    elements: [],
    subElements: [],
    isFetchingElements: false,
    isCreatingElement: false,
    isUpdatingElement: false,
    isDeletingElement: false,
    error: null,
  };

const elementsSlice = createSlice({
  name: 'elements',
  initialState: elementsInitialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllElements.pending, (state) => {
        state.isFetchingElements = true;
      })
      .addCase(fetchAllElements.fulfilled, (state, action) => {
        state.isFetchingElements = false;
        state.elements = action.payload.data;
      })
      .addCase(fetchAllElements.rejected, (state, action) => {
        state.isFetchingElements = false;
        state.error = action.error.message;
        toast.error("Failed to fetch data");
      });

    builder
      .addCase(createFormElement.pending, (state) => {
        state.isCreatingElement = true;
      })
      .addCase(createFormElement.fulfilled, (state, action) => {
        state.isCreatingElement = false;
        state.elements.push(action.payload.data);
        toast.success("Element created successfully");
      })
      .addCase(createFormElement.rejected, (state, action) => {
        state.isCreatingElement = false;
        state.error = action.error.message;
        toast.error("Failed to create element");
      });

    builder
      .addCase(updateFormElement.pending, (state) => {
        state.isUpdatingElement = true;
      })
      .addCase(updateFormElement.fulfilled, (state, action) => {
        state.isUpdatingElement = false;
        const index = state.elements.findIndex((element) => element.id === action.payload.data.id);
        state.elements[index] = action.payload.data;
        toast.success("Element updated successfully");
      })
      .addCase(updateFormElement.rejected, (state, action) => {
        state.isUpdatingElement = false;
        state.error = action.error.message;
        toast.error("Failed to update element");
      });

    builder
      .addCase(deleteFormElement.pending, (state) => {
        state.isDeletingElement = true;
      })
      .addCase(deleteFormElement.fulfilled, (state, action) => {
        state.isDeletingElement = false;
        state.elements = state.elements.filter((element) => element.id !== action.payload);
        toast.success("Element deleted successfully");
      })
      .addCase(deleteFormElement.rejected, (state, action) => {
        state.isDeletingElement = false;
        state.error = action.error.message;
        toast.error("Failed to delete element");
      });


  },
});

export const { addTitle, addUrl } = elementsSlice.actions;
export default elementsSlice.reducer;
