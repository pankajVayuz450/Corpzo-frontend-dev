import { createSlice } from '@reduxjs/toolkit';
import { createRole, deleteRole, fetchAllAssignedToData, fetchAllRoles, fetchRoleById, updateRole } from '../actions/roles';

const initialState = {
  roles: null,
  isFetchingRoles: false,
  fetchingRolesError: "",
  page: 1,
  limit: 10,
  role: null,
  isFetchingRole: false,
  fetchingRoleError: "",
  addedRole: null,
  isAddingRole: false,
  addingRoleError: "",
  updatedRole: null,
  isUpdatingRole: false,
  updatingRoleError: "",
  deletedRole: null,
  isDeletingRole: false,
  deletingRoleError: "",
  assignedTo: [{ label: "Select Assignee", value: "" }],
  isFetchingAssignedTo: false,
  fetchingAssignedToError: "",
  totalCount: 0
};

const rolesSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    removeFetchingRolesError: (state, action) => {
      state.fetchingRolesError = "";
    },
    removeAddingRoleError: (state, action) => {
      state.addingRoleError = "";
      state.addedRole = null;
    },
    removeFetchingSingleRoleError: (state, action) => {
      state.fetchingRoleError = "";
    },
    removeUpdatingRoleError: (state, action) => {
      state.updatingRoleError = "";
      state.updatedRole = null;
    },
    removeDeletingRoleError: (state, action) => {
      state.deletingRoleError = "";
      state.deletedRole = null;
    },
    removeFetchingAssignedTo: (state, action) => {
      state.fetchingAssignedToError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.isFetchingRole = true;
      })
    builder.addCase(fetchAllRoles.fulfilled, (state, action) => {
      state.isFetchingRole = false;
      state.roles = action.payload.roles;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalCount = action.payload.totalCount;
    })
    builder.addCase(fetchAllRoles.rejected, (state, action) => {
      state.isFetchingRole = false;
      state.fetchingRoleError = action.payload;
    })

    builder.addCase(fetchRoleById.pending, (state) => {
      state.isFetchingRole = true;
    })
    builder.addCase(fetchRoleById.fulfilled, (state, action) => {
      state.isFetchingRole = false;
      state.role = action.payload.role;
    })
    builder.addCase(fetchRoleById.rejected, (state, action) => {
      state.isFetchingRole = false;
      state.fetchingRoleError = action.payload.message
    })

    builder.addCase(createRole.pending, (state) => {
      state.isAddingRole = true;
    })
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.isAddingRole = false;
      state.addedRole = action.payload;
    })
    builder.addCase(createRole.rejected, (state, action) => {
      state.isAddingRole = false;
      state.addingRoleError = action.payload.message
    })

    builder.addCase(updateRole.pending, (state) => {
      state.isUpdatingRole = true;
    })
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.isUpdatingRole = false;
      state.updatedRole = action.payload;
      state.roles = state.roles.map((role) => role?._id === action.payload?._id ? action.payload : role);
    })
    builder.addCase(updateRole.rejected, (state, action) => {
      state.isUpdatingRole = false;
      state.updatingRoleError = action.payload.message;
    })

    builder.addCase(deleteRole.pending, (state) => {
      state.isDeletingRole = true;
    })
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.isDeletingRole = false;
      state.deletedRole = action.payload.data;
      state.roles = state.roles.filter((role) => role?._id !== action.payload?.data?._id)
    })
    builder.addCase(deleteRole.rejected, (state, action) => {
      state.isDeletingRole = false;
      state.deletingRoleError = action.payload.message;
    });

    builder.addCase(fetchAllAssignedToData.pending, (state) => {
      state.isFetchingAssignedTo = true;
    })
    builder.addCase(fetchAllAssignedToData.fulfilled, (state, action) => {
      state.isFetchingAssignedTo = false;
      state.assignedTo = [{ label: "Select Assignee", value: "" }, ...action.payload.data?.map((val) => ({ value: val?._id, label: `${val?.name} (${val?.email})` }))];
    })
    builder.addCase(fetchAllAssignedToData.rejected, (state, action) => {
      state.isFetchingAssignedTo = false;
      state.fetchingAssignedToError = action.payload.message;
    });
  }
});

export const { removeAddingRoleError, removeDeletingRoleError, removeFetchingRolesError, removeFetchingSingleRoleError, removeUpdatingRoleError, removeFetchingAssignedTo } = rolesSlice.actions;

export default rolesSlice.reducer;