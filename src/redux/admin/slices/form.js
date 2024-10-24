import { createSlice } from '@reduxjs/toolkit';
import { createField, createForm, deleteForm, fetchAllForms, updateForm } from '../actions/form';
import { toast } from 'react-toastify';

function displayFetchError(payload) {
  const defaultMessage = "Failed to fetch data";
  const message = payload ? `${defaultMessage}: ${payload}` : `${defaultMessage}, Network Error`;
  toast.error(message);
}


export const formSlice = createSlice({
  name: 'form',
  initialState: {
    title: '',
    url:'',
    description: '',
    forms: [],
    isFormLoading: false,
    isFormCreating:false,
    isFieldCreating:false,
    isFormCreated:false,
    isFieldCreated:false,
    isFieldDeleting:false,
    isFormDeleting:false,
    isFormCreated:false,
  },
  reducers: {
    setIsFormCreated:(state,action)=>{
state.isFormCreated=action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setFormCreated:(state,action)=>{
      state.isFormCreated=action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllForms.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(fetchAllForms.fulfilled, (state, action) => {
        console.log("payload.data",payload.data);
        
        state.isFormLoading = false; 
        state.forms = action.payload.data;
       

      })
      .addCase(fetchAllForms.rejected, (state,action) => {
        state.isFormLoading = false; 
        if (!action.payload) {
          displayFetchError(null); 
        } else {
          displayFetchError(action.payload);
        }
      })
      .addCase(createForm.pending, (state) => {
        state.isFormCreating = true;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.isFormCreating = false;
        state.isFormCreated = true;
        state.forms.push(action.payload.data);
        toast.success(action.payload.message);

      })
      .addCase(createForm.rejected, (state, action) => {
        state.isFormCreating = false;
        if (!action.payload) {
          displayFetchError(null); 
        } else {
          displayFetchError(action.payload.message);
        }
      });
      
      builder
        .addCase(updateForm.pending, (state) => {
          state.isFormCreating = true;
        })
        .addCase(updateForm.fulfilled, (state, action) => {
          state.isFormCreating = false;

          state.forms = state.forms.map((form) => {
            if (form._id === action.payload.formId) {
              return action.payload;
            }
            return form;

          }
          
        );
        toast.success(action.payload.message);
        })
        .addCase(updateForm.rejected, (state, action) => {
          state.isFormCreating = false;
          state.error = action.payload;
          if (!action.payload) {
            displayFetchError(null); 
          } else {
            displayFetchError(action.payload.message);
          }
        });

        builder
        .addCase(deleteForm.pending, (state) => {
          state.isFormDeleting = true;
        })

        .addCase(deleteForm.fulfilled, (state, action) => {
          state.isFormDeleting = false;
          state.forms = state.forms.filter((form) => form.id !== action.payload.id);
          toast.success(action.payload.message);

        })
        .addCase(deleteForm.rejected, (state, action) => {
          state.isFormDeleting = false;
          if (!action.payload) {
            displayFetchError(null); 
          } else {
            displayFetchError(action.payload);
          }
        });

        builder
          .addCase(createField.pending, (state) => {
            state.isFieldCreating = true;
          }
          )
          .addCase(createField.fulfilled, (state, action) => {
            state.isFieldCreating = false;
            state.isFieldCreated=true;
            state.forms = state.forms.map((form) => {
              if (form._id === action.payload.formId) {
                return action.payload;
              }
              return form;
            });
            toast.success(action.payload.message);
          })
          .addCase(createField.rejected, (state, action) => {
            state.isFieldCreating = false;
            if (!action.payload) {
              displayFetchError(null); 
            } else {
              displayFetchError(action.payload.message);
            }
          });


  },
 
});

export const { setTitle, setDescription,setUrl ,setIsFormCreated} = formSlice.actions;

export default formSlice.reducer;