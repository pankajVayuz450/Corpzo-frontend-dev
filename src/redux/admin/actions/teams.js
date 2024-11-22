import teamAPIs from '@/constants/APIList/teamAPIs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {updateStatusLoading, updateStatusState} from "../slices/teamsSlice"
import axios from 'axios';
import { toast } from 'react-toastify';

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
  async ({ teamId, team }, { rejectWithValue }) => {
    console.log(team, teamId, "upate team")
    try {
      const response = await axios.put(`${teamAPIs.updateTeamById}/${teamId}`, {team}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",

        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatus = ({_id, active})=>{
  return async (dispatch) => {
    try {
        dispatch(updateStatusLoading(true))
        const response = await axios.put(`${teamAPIs.updateTeamById}/${_id}`, {active}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        if (response.status == 200) {
           
            dispatch(updateStatusState({_id, active}))
            dispatch(updateStatusLoading(false))
           toast.success("Status updated from toggle")
        }
    } catch (error) {
        console.log(error, "error")
        // toast.error(error.response.data.message)
        dispatch(updateStatusLoading(false))

    }
}
}
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