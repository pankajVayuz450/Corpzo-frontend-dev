import { createSlice } from '@reduxjs/toolkit';
// import { createField, getAllFormFields, fetchTypes, handleTypeChange, updateField, getAllFormFieldsPreview } from '../actions/fields';
import { toast } from 'react-toastify';

const initialState = {
  fields: ["raja"],
//   formInputs: [],
//   subInputs: {},
//   formJson: [],
//   previewedForm: [],
//   isFetching: false,
//   isFetchingFormFields: false,
//   isFetchingAttributes: false,
//   isFieldCreating: false,
//   isFieldCreated: false,
//   isFieldUpdating: false,
//   isFieldUpdated: false,
};



const fieldsSlice2 = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    addFieldAction: (state, action) => {
      // state.fields.push(action.payload);
      state.fields.push(["Raja","kumar","Sah"]);
    }
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTypes.pending, (state) => {
//         state.isFetching = true;
//       })
//   }
});

export const { addFieldAction} = fieldsSlice2.actions;

export default fieldsSlice2.reducer;
