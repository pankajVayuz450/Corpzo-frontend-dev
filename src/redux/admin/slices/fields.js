import { createSlice } from '@reduxjs/toolkit';
import { createField, getAllFormFields, fetchTypes, handleTypeChange, updateField, getAllFormFieldsPreview } from '../actions/fields';
import { toast } from 'react-toastify';

const initialState = {
  fields: [],
  formInputs: [],
  subInputs: {},
  formJson: [],
  previewedForm: [],
  isFetching: false,
  isFetchingFormFields: false,
  isFetchingAttributes: false,
  isFieldCreating: false,
  isFieldCreated: false,
  isFieldUpdating: false,
  isFieldUpdated: false,
};



const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addFieldAction: (state, action) => {
      state.fields.push(action.payload);
    },
    removeFieldAction: (state, action) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setSubInputs: (state, action) => {
      state.subInputs = action.payload;
    },
    setFormJson: (state, action) => {
      state.formJson = action.payload;
    },
    clearFields: (state) => { 
      state.subInputs = {};
      state.fields = [];
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.isFetching = false;
        state.formInputs = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.isFetching = false;
        console.error('Fetch types failed: ', action.payload);
      })
      .addCase(handleTypeChange.pending, (state) => {
        state.isFetchingAttributes = true;
      })
      .addCase(handleTypeChange.fulfilled, (state, action) => {
        state.isFetchingAttributes = false;
        state.subInputs[action.payload.index] = action.payload.data;
      })
      .addCase(handleTypeChange.rejected, (state, action) => {
        state.isFetchingAttributes = false;
        console.error('Handle type change failed: ', action.payload);
      })
      .addCase(createField.pending, (state) => {
        state.isFieldCreating = true;
        state.isFieldCreated = false;
      })
      .addCase(createField.fulfilled, (state, action) => {
        state.isFieldCreating = false;
        state.isFieldCreated = true;
        state.fields=[];
        toast.success('Field created successfully!', { autoClose: 5000 });
      })
      .addCase(createField.rejected, (state, action) => {
        state.isFieldCreating = false;
        state.isFieldCreated = false;
        toast.error(action.payload.message, { autoClose: 5000 
        });
      })
      .addCase(getAllFormFields.pending, (state) => {
        state.isFetchingFormFields = true;
      })
      .addCase(getAllFormFields.fulfilled, (state, action) => {
        state.isFetchingFormFields = false;
        state.fields = action.payload.map(field => {
          const { attributes, _id: id, options, elementId } = field;
          return { attributes, id, options, elementId };
        });
        
      })
      .addCase(getAllFormFields.rejected, (state, action) => {
        state.isFetchingFormFields = false;
        toast.error(action.payload.message, { autoClose: 5000 });
      })
      .addCase(updateField.pending, (state) => {
        state.isFieldUpdating = true;
      })
      .addCase(updateField.fulfilled, (state, action) => {
        state.isFieldUpdating = false;
        state.isFieldUpdated = true;
        const index = state.fields.findIndex(field => field.id === action.payload.id);
        if (index !== -1) {
          state.fields[index] = action.payload;
        }
        toast.success('Field updated successfully!', { autoClose: 5000 });
        
      })
      .addCase(updateField.rejected, (state, action) => {
        state.isFieldUpdating = false;
        state.isFieldUpdated = false;
        toast.error(action.payload.message, { autoClose: 5000 });
      });

      builder
        .addCase(getAllFormFieldsPreview.pending, (state) => {
          state.isFetchingFormFields = true;
        }
        )
        .addCase(getAllFormFieldsPreview.fulfilled, (state, action) => {
          state.isFetchingFormFields = false;
          state.previewedForm = action.payload;
        })
        .addCase(getAllFormFieldsPreview.rejected, (state, action) => {
          state.isFetchingFormFields = false;
          toast.error(action.payload.message, { autoClose: 5000 });
  })


  }
});

export const { addFieldAction, removeFieldAction, setFields, setSubInputs, setFormJson,clearFields } = fieldsSlice.actions;

export default fieldsSlice.reducer;
