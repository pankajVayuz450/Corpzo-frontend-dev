import { createSlice } from '@reduxjs/toolkit';
import { createTeam, deleteTeam, fetchAllTeams, fetchTeamById, updateTeam } from '../actions/teams';

const initialState = {
  teams: null,
  isFetchingTeams: false,
  fetchingTeamsError: "",
  page: 1,
  limit: 10,
  team: null,
  isFetchingTeam: false,
  fetchingTeamError: "",
  addedTeam: null,
  isAddingTeam: false,
  addingTeamError: "",
  updatedTeam: null,
  isUpdatingTeam: false,
  updatingTeamError: "",
  deletedTeam: null,
  isDeletingTeam: false,
  deletingTeamError: "",
  totalCount: 0
};



const teamsSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    removeFetchingTeamsError: (state, action) => {
        state.fetchingTeamsError = "";
    },
    removeAddingTeamError: (state, action) => {
        state.addingTeamError = "";
        state.addedTeam = null;
    },
    removeFetchingSingleTeamError: (state, action) => {
        state.fetchingTeamError = "";
    },
    removeUpdatingTeamError: (state, action) => {
        state.updatingTeamError = "";
        state.updatedTeam = null;
    },
    removeDeletingTeamError: (state, action) => {
        state.deletingTeamError = "";
        state.deletedTeam = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeams.pending, (state) => {
        state.isFetchingTeam = true;
      })
      builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.isFetchingTeam = false;
        state.teams = action.payload.teams;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalCount = action.payload.totalCount;
      })
      builder.addCase(fetchAllTeams.rejected, (state, action) => {
        state.isFetchingTeam = false;
        state.fetchingTeamError = action.payload.message;
      })

      builder.addCase(fetchTeamById.pending, (state) => {
        state.isFetchingTeam = true;
      })
      builder.addCase(fetchTeamById.fulfilled, (state, action) => {
        state.isFetchingTeam = false;
        state.team = action.payload.team;
      })
      builder.addCase(fetchTeamById.rejected, (state, action) => {
        state.isFetchingTeam = false;
        state.fetchingTeamError = action.payload.message
      })

      builder.addCase(createTeam.pending, (state) => {
        state.isAddingTeam = true;
      })
      builder.addCase(createTeam.fulfilled, (state, action) => {
        state.isAddingTeam = false;
        state.addedTeam = action.payload;
      })
      builder.addCase(createTeam.rejected, (state, action) => {
        state.isAddingTeam = false;
        state.addingTeamError = action.payload.message
      })

      builder.addCase(updateTeam.pending, (state) => {
        state.isUpdatingTeam = true;
      })
      builder.addCase(updateTeam.fulfilled, (state, action) => {
        state.isUpdatingTeam = false;
        state.updatedTeam = action.payload;
        state.teams = state.teams.map((team) => team?._id === action.payload?._id ? action.payload : team);
      })
      builder.addCase(updateTeam.rejected, (state, action) => {
        state.isUpdatingTeam = false;
        state.updatingTeamError = action.payload.message;
      })

      builder.addCase(deleteTeam.pending, (state) => {
        state.isDeletingTeam = true;
      })
      builder.addCase(deleteTeam.fulfilled, (state, action) => {
        state.isDeletingTeam = false;
        state.deletedTeam = action.payload.data;
        state.teams = state.teams.filter((team) => team?._id !== action.payload?.data?._id)
      })
      builder.addCase(deleteTeam.rejected, (state, action) => {
        state.isDeletingTeam = false;
        state.deletingTeamError = action.payload.message;
      });
  }
});

export const { removeAddingTeamError, removeDeletingTeamError, removeFetchingTeamsError, removeFetchingSingleTeamError, removeUpdatingTeamError } = teamsSlice.actions;

export default teamsSlice.reducer;