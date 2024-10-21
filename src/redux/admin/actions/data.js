import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ url, title }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return { data: response.data.data, title };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createInputTypes = createAsyncThunk(
  'data/createData',
  async ({ url, data }, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return { data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

  export const updateInputTypes = createAsyncThunk(
    'data/updateData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
       
        return { data: response.data.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteInputTypes = createAsyncThunk(
    'data/deleteData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data,
        });
        // Directly return the data expected by the reducer
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const createSubInputTypes = createAsyncThunk(
    'data/createSubData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return { data: response.data.data };

      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const updateSubInputTypes = createAsyncThunk(
    'data/updateSubData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return { data: response.data.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteSubInputTypes = createAsyncThunk(
    'data/deleteSubData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data,
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const createAttributeTypes = createAsyncThunk(
    'data/createAttributeData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return { data: response.data.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const updateAttributeTypes = createAsyncThunk(
    'data/updateAttributeData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return { data: response.data.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const deleteAttributeTypes = createAsyncThunk(
    'data/deleteAttributeData',
    async ({ url, data }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data,
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const fetchTypes = createAsyncThunk(
    'data/fetchTypes',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${process.env.VITE_BASE_URL}/getFormInputs`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const options = response.data.data.map(type => ({ value: type._id, label: type.typeName }));
        return options; // Return the fetched data
      } catch (error) {
        console.error('Failed to fetch types:', error);
        return rejectWithValue(error.response.data); // Use rejectWithValue to handle errors
      }
    }
  );

export const fetchSubTypes = createAsyncThunk(
  'data/fetchSubTypes',
  async (inputId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.VITE_BASE_URL}/getAllFieldSubTypes`, {
        params: { inputId },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      const options = response.data.data.map(subType => ({ value: subType._id, label: subType.subtypeName }));
      return options;
    } catch (error) {
      console.error('Failed to fetch subtypes:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateValidFormElement = createAsyncThunk(
  'data/updateValidFormElement',
  async ({ url, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return { data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteValidFormElement = createAsyncThunk(
  'delete/validFormElement', async ({url, data}, {rejectWithValue}) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data,
      });

      console.log(response)
      if (response.status === 202 || response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue({
          status: response.data.status,
          statusCode: response.status,
          message: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.data.status,
          statusCode: error.response.status,
          message: error.response.data.message,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: "No response was received",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue({
          message: error.message,
        });
      }
    }
  }
);

export const createValidFormElement = createAsyncThunk(
  'create/validFormElement',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.post(url,data,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    }
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}
  }
)

export const createValidFormElementTypes = createAsyncThunk(
  'create/validFormElementTypes',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.post(url,data,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    }
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}

  }
)

export const updateValidFormElementTypes = createAsyncThunk(
  'update/validFormElementTypes',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.put(url,data,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    }
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}

  }
)

export const createValidFormElementAttributes = createAsyncThunk(
  'create/validFormElementAttributes',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.post(url,data,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    }
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}
  
    } 
)

export const updateValidFormElementAttributes = createAsyncThunk(
  'update/validFormElementAttributes',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.put(url,data,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    }
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}
  }
)

export const deleteValidFormElementTypes = createAsyncThunk( 
  'delete/validFormElementTypes',async({url,data},{rejectWithValue})=>{
try{
  console.log(localStorage.getItem('authToken'))
  const response = await axios.delete(url,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    },
    data :data
  })
  return response.data.data
}
catch(err){
  rejectWithValue(err.response.data)
}
  }
)

export const deleteValidFormElementAttributes= createAsyncThunk(
  'delete/validFormElementAttributes',async({url,data},{rejectWithValue})=>{
try{
  const response = await axios.delete(url,{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('authToken')}` 
    },
    data :data
  })
  return response.data.data

}
catch(err){
  rejectWithValue(err.response.data)
}
  }
)

  

