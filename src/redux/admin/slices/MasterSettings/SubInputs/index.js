import { createSlice } from '@reduxjs/toolkit';
import { fetchAllSubInputs, createSubInput, updateSubInput, deleteSubInput, fetchSubInput } from '../../../actions/MasterSettings/SubInputs';
import { toast } from 'react-toastify';

const elementsInitialState = {
    subInputFields: null,
    isLoadingSubInputFields: false,
    loadingSubInputFieldsError: "",
    subInputField: null,
    isLoadingSubInputField: false,
    loadingSubInputFieldError: "",
    addedSubInput: null,
    isAddingSubInput: false,
    addingSubInputError: "",
    deletedSubInput: null,
    isDeletingSubInput: false,
    deletingSubInputError: "",
    updatedSubInput: null,
    isUpdatingSubInput: false,
    updatingSubInputError: "",
  };

const subInputSlice = createSlice({
  name: 'subInput',
  initialState: elementsInitialState,
  reducers: {
    removeFetchingSubInputs: (state, action) => {
        state.loadingSubInputFieldsError = "";
    },
    removeAddingSubInput: (state, action) => {
        state.addingSubInputError = "";
        state.addedSubInput = null;
    },
    removeDeletingSubInput: (state, action) => {
        state.deletingSubInputError = "";
        state.deletedSubInput = null;
    },
    removeUpdatingSubInput: (state, action) => {
        state.updatingSubInputError = "";
        state.updatedSubInput = null;
    },
    removefetchingSingleSubInput: (state, action) => {
        state.loadingSubInputFieldError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubInputs.pending, (state) => {
        state.isLoadingSubInputFields = true;
      })
      .addCase(fetchAllSubInputs.fulfilled, (state, action) => {
        state.isLoadingSubInputFields = false;
        state.subInputFields = action.payload.data;
      })
      .addCase(fetchAllSubInputs.rejected, (state, action) => {
        state.isLoadingSubInputFields = false;
        state.loadingSubInputFieldsError = action.error.message;
      });

    builder
      .addCase(fetchSubInput.pending, (state) => {
        state.isLoadingSubInputField = true;
      })
      .addCase(fetchSubInput.fulfilled, (state, action) => {
        state.isLoadingSubInputField = false;
        state.subInputField = action.payload.data;
      })
      .addCase(fetchSubInput.rejected, (state, action) => {
        state.isLoadingSubInputField = false;
        state.loadingSubInputFieldError = action.error.message;
      });

    builder
      .addCase(createSubInput.pending, (state) => {
        state.isAddingSubInput = true;
      })
      .addCase(createSubInput.fulfilled, (state, action) => {
        state.isAddingSubInput = false;
        state.addedSubInput = action.payload.data
      })
      .addCase(createSubInput.rejected, (state, action) => {
        state.isAddingSubInput = false;
        state.addingSubInputError = action.error.message;
      });

    builder
      .addCase(updateSubInput.pending, (state) => {
        state.isUpdatingSubInput = true;
      })
      .addCase(updateSubInput.fulfilled, (state, action) => {
        state.isUpdatingSubInput = false;
        state.updatedSubInput = action.payload.data;
        state.subInputFields = state.subInputFields?.map((sub) => sub?._id === action.payload.data?._id ? action.payload.data : sub);
      })
      .addCase(updateSubInput.rejected, (state, action) => {
        state.isUpdatingSubInput = false;
        state.updatingSubInputError = action.error.message;
      });

    builder
      .addCase(deleteSubInput.pending, (state) => {
        state.isDeletingSubInput = true;
      })
      .addCase(deleteSubInput.fulfilled, (state, action) => {
        state.isDeletingSubInput = false;
        state.deletedSubInput = action.payload;
        console.log(action.payload, "ss");
        state.subInputFields = state.subInputFields.filter((element) => element._id !== action.payload?._id);
      })
      .addCase(deleteSubInput.rejected, (state, action) => {
        state.isDeletingSubInput = false;
        state.deletingSubInputError = action.error.message;
      });


  },
});

export const { removeFetchingSubInputs, removeAddingSubInput, removeDeletingSubInput, removeUpdatingSubInput, removefetchingSingleSubInput } = subInputSlice.actions;
export default subInputSlice.reducer;