import { createSlice } from '@reduxjs/toolkit';
import { fetchAllAttributes,createAttribute,deleteAttribute,updateAttribute } from  '../../../actions/MasterSettings/Attributes/index';
import { toast } from 'react-toastify';
const attributesInitialState = {
    attributes: [],
    isFetchingAttributes: false,
    isCreatingAttribute: false,
    isUpdatingAttribute: false,
    isDeletingAttribute: false,
  };

  const attributesSlice = createSlice({
    name: 'attributes',
    initialState: attributesInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllAttributes.pending, (state) => {
          state.isFetchingAttributes = true;
        })
        .addCase(fetchAllAttributes.fulfilled, (state, action) => {
          console.log("fetchAllAttributes.fulfilled action.payload:",action.payload);
          
          state.isFetchingAttributes = false;
          state.attributes = action.payload.attributes;
        })
        .addCase(fetchAllAttributes.rejected, (state, action) => {
          state.isFetchingAttributes = false;
          toast.error(action.error.message);
        });

        builder
        .addCase(createAttribute.pending, (state) => {
          state.isCreatingAttribute = true;
        })
        .addCase(createAttribute.fulfilled, (state, action) => {
          state.isCreatingAttribute = false;
          state.attributes.push(action.payload.data);
          toast.success("Attribute created successfully");
        })
        .addCase(createAttribute.rejected, (state, action) => {
          state.isCreatingAttribute = false;
          toast.error(action.error.message);
        });

        builder
        .addCase(updateAttribute.pending, (state) => {
          state.isUpdatingAttribute = true;
        })
        .addCase(updateAttribute.fulfilled, (state, action) => {
          state.isUpdatingAttribute = false;
          const index = state.attributes.findIndex((attribute) => attribute.id === action.payload.data.id);
          state.attributes[index] = action.payload.data;
          toast.success("Attribute updated successfully");
        })
        .addCase(updateAttribute.rejected, (state, action) => {
          state.isUpdatingAttribute = false;
          toast.error(action.error.message);
        });

        builder
        .addCase(deleteAttribute.pending, (state) => {
          state.isDeletingAttribute = true;
        })
        .addCase(deleteAttribute.fulfilled, (state, action) => {
          state.isDeletingAttribute = false;
          state.attributes = state.attributes.filter((attribute) => attribute.id !== action.meta.arg.id);
          toast.success("Attribute deleted successfully");
        })
        .addCase(deleteAttribute.rejected, (state, action) => {
          state.isDeletingAttribute = false;
          toast.error(action.error.message);
        });
        

    },
  });
  
  export default attributesSlice.reducer;
  