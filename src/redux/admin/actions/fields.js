import formAttributesNew from '@/constants/APIList/formAttributesNew';
import formFields2API from '@/constants/APIList/formFields2API';
import formInputFields from '@/constants/APIList/formInputFields';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.VITE_BASE_URL

export const getAllFormFields = createAsyncThunk(
    'field/getField',
    async (id, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${formFields2API.getAllFormFields2}?formId=${id}`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            }
        );
        return response.data.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    export const getAllFormFieldsPreview = createAsyncThunk(
        'field/getFieldPreview',
        async (id, { rejectWithValue }) => {
            try {
              const response = await axios.get(`${formFields2API.getAllFormFields2}?formId=${id}`,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                }
            );
            return response.data.data;
            } catch (error) {
            return rejectWithValue(error.response.data);
            }
        }
        );
export const deleteField = createAsyncThunk(
    'field/deleteField',
    async(id,{rejectWithValue})=>{
        try{
            const response = await axios.delete(`${formFields2API.deleteFormFieldById2}/${id}`,{
                headers:{
                    
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            });
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateField = createAsyncThunk(
    'field/updateField',
    async (fieldData, { rejectWithValue }) => {
        try {
        const response = await axios.put(`${formFields2API.updateFormFieldById2}`,fieldData,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },

        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );
export const createField = createAsyncThunk(
    'field/createField',
    async (fieldData, { rejectWithValue }) => {
        try {
        const response = await axios.post(formFields2API.createFormField2,fieldData,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        });
        return response.data.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

export const fetchTypes = createAsyncThunk(
  'formInputs/fetchTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(formInputFields.getAllInputs, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleTypeChange = createAsyncThunk(
    'formInputs/handleTypeChange',
    async ({ index, typeId }, {  rejectWithValue }) => {
      try {
        const response = await axios.get(`${formAttributesNew.getAllFormAttributes}?elementId=${typeId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        return { index, data: response.data.data };
      } catch (error) {
        console.error('Error fetching sub inputs:', error);
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  