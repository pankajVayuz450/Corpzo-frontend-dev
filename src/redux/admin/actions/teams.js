import teamAPIs from '@/constants/APIList/teamAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllTeams = createAsyncThunk(
    'fetchAllTeams',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(teamAPIs.getAllTeams, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data?.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const fetchTeamById = createAsyncThunk(
    'fetchTeamById',
    async (teamId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${teamAPIs.getTeamById}/${teamId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createTeam = createAsyncThunk(
    'createTeam',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(teamAPIs.createTeam, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error, "error from create team")
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateTeam = createAsyncThunk(
    'updateTeam',
    async ({ teamId, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${teamAPIs.updateTeamById}/${teamId}`, formData, {
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
  
  export const deleteTeam = createAsyncThunk(
    'deleteTeam',
    async (teamId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${teamAPIs.deleteTeamById}/${teamId}`, {
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