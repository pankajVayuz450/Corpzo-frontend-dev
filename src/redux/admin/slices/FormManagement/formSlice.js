import { createSlice } from '@reduxjs/toolkit';
// import { createField, createForm, deleteForm, fetchAllForms, updateForm } from '../actions/form';
import { toast } from 'react-toastify';

import formAPIs from '@/constants/APIList/formAPIs';
import formFields2API from '@/constants/APIList/formFields2API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for easier maintenance and potential reusability
const BASE_URL = process.env.VITE_BASE_URL;

export const fetchAllForms = createAsyncThunk(
    'forms/fetchAll',
    async (params, { rejectWithValue }) => {
      try {
        console.log("forms/fetchAll");
        
        const response = await axios.get(formAPIs.getAllForms, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params:params
        });
        console.log("response",response?.data);
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createForm = createAsyncThunk(
    'forms/create',
    async (formData, { rejectWithValue }) => {
        console.log("forms/create, formData",formData);
        
      try {
        const response = await axios.post(formAPIs.createForm, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const createField=createAsyncThunk('fields/create',async (fieldData,{rejectWithValue})=>{
    try{
      const response = await axios.post(formFields2API.createFormField2,fieldData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
  );
  
  export const updateForm = createAsyncThunk(
    'forms/update',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${formAPIs.updateFormById}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const changeFormStatus2 = createAsyncThunk(
    'forms/changeStatus',
    async ({formId,isActive}, { rejectWithValue }) => {
        console.log("forms/changeStatus",{formId,isActive});
        
      try {
        const response = await axios.patch(`${formAPIs.changeFormStatus}`, {formId,isActive}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const changeFormStatus = ({formId,isActive}) => {
    return async (dispatch) => {
        try {
            console.log("changeFormStatus............... Slice");
            
            dispatch(updateStatusLoading(true))
            const response = await axios.patch(`${formAPIs.changeFormStatus}`, {formId,isActive}, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              });
            console.log("response.............:",response)
            if (response.status == 202) {
                
                console.log( "update status",response.data?.data)
                dispatch(updateFormStatus(response.data?.data))
                toast.success(`Status updated`)
            }
        } catch (error) {
            console.log(error)
            toast.error(`Could'nt update record`)
        }finally{
            dispatch(updateStatusLoading(false))
        }
    }
}

  export const deleteForm = createAsyncThunk(
    'forms/delete',
    async (formId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${formAPIs.deleteFormById}?formId=${formId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

function displayFetchError(payload) {
  const defaultMessage = "Failed to fetch data";
  const message = payload ? `${defaultMessage}: ${payload}` : `${defaultMessage}, Network Error`;
  toast.error(message);
}


export const formSlice2 = createSlice({
  name: 'form',
  initialState: {
    title: '',
    url:'',
    description: '',
    forms: [],
    total:0,
    page:1,
    limit:10,
    isFormLoading: false,
    isFormCreating:false,
    isFieldCreating:false,
    isFormCreated:false,
    isFieldCreated:false,
    isFieldDeleting:false,
    isFormDeleting:false,
    isFormCreated:false,
    isStatusChanging:false
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
    },



    updateFormStatus: (state, action) => {
        console.log(action.payload, "payload..............");
        const { userId, active } = action.payload;
        console.log("form Slice: Changing status");
      
        //WILL WORK ON THIS LATER
        // console.log([ ...state.forms?.data ], "Old State..............");

        //  [...state.forms?.data].map((d)=>console.log(d))

        
         state.forms = state.forms.map((data) => {
            if (data._id === action.payload?._id) {
              return { ...data, isActive:  action.payload?.isActive};
            }
            return data;
          });
      }, 
      updateStatusLoading : (state, action)=> {
        console.log("updateStatusLoading action.payload",action.payload);
        
        state.isStatusChanging = action.payload;
      },
    //   changeFormStatus : (state, action)=>{
    //     // state.editPage = action.payload;
    //   }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllForms.pending, (state,action) => {
        console.log("fetchAllForms.pending");
        
        state.isFormLoading = true;
      })
      .addCase(fetchAllForms.fulfilled, (state, action) => {
        console.log("fetchAllForms.fulfilled................");
        
        // console.log("action.payload",action.payload.data?.data);
        
        state.isFormLoading = false; 
        state.forms = action.payload.data?.data;
        state.total = action.payload.data?.total;
        state.page =  action.payload.data?.page;
        state.limit =  action.payload.data?.limit;
        // state.total = action.payload.data;

      })
      .addCase(fetchAllForms.rejected, (state,action) => {
        console.log("fetchAllForms.rejected");
        
        state.isFormLoading = false; 
        if (!action.payload) {
          displayFetchError(null); 
        } else {
          displayFetchError(action.payload);
        }
      })
      .addCase(createForm.pending, (state) => {
        console.log("createForm.pending..");
        
        state.isFormCreating = true;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        console.log("createForm.fulfilled payload",action.payload);
        
        state.isFormCreating = false;
        state.isFormCreated = true;
        state.forms.push(action.payload.data);
        state.total =  state.total+1;
        toast.success(action.payload.message);

      })
      .addCase(createForm.rejected, (state, action) => {
        console.log("createForm.rejected");
        
        state.isFormCreating = false;
        // if (!action.payload) {
        //   displayFetchError(null); 
        // } else {
        //   displayFetchError(action.payload.message);
        // }
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

        //   builder.addCase(changeFormStatus.pending, (state,action)=>{
        //     state.isStatusChanging = true;

        //   }).addCase(changeFormStatus.fulfilled, (state, action) => {
        //     console.log("changeFormStatus.fulfilled", action.payload);
            
        //     const newData = action.payload.data;
        //     console.log("newData",newData);
            
        
        //     state.isStatusChanging = false;
        
        //     // Find the index of the form item with the matching _id
        //     // const formIndex = state.forms?.data.map(formItem => if(formItem._id === newData._id));

        //     // console.log("store:::::",formIndex);
            
        
        //     // If the item is found, update its isActive property
        //     // if (formIndex !== -1) {
        //     //     // state.forms?.data[formIndex] = {
        //     //     //     ...state.forms?.data[formIndex],
        //     //     //     isActive: newData.isActive
        //     //     // };

        //     //     // state?.forms?.data[formIndex]?.isActive = newData.isActive
        //     //     // const newArray = state.forms?.data.map(())
        //     // }
        
        //     console.log("Updated form data:", state.forms);
        //     toast.success("Status changed");
        // }).addCase(changeFormStatus.rejected, (state,action)=>{
        //     state.isStatusChanging = false;
        //     toast.error("Status did not changed")
        //   })


  },
 
});

export const { setTitle,setFormCreated, setDescription,setUrl ,setIsFormCreated,updateFormStatus,updateStatusLoading} = formSlice2.actions;

export default formSlice2.reducer;