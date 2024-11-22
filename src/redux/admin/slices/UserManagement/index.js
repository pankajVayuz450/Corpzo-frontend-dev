import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUsers, updateUser, getUserById } from "../../actions/UserManagement/index"
import { toast } from 'react-toastify';

const userManageSlice = createSlice({
  name: 'UserManagement',
  initialState: {
    users: [],
    user: {},
    isUserCreating: false,
    isUserFetching: false,
    isUsersFetching: false,
    isUserDeleting: false,
    isUserUpdating : false,
    currentpage: 0,
    totalRecords: 0,
    totalPages: 0,
    isStatusLoading: false,
    editPage: 1,
    businessDetails: [],
    userSteps: [],
    isBusinessFetching: false,
    isServiceFetching: false,
    transactionDetails: [],
    transactionFetching: false,
    downloadUsers: [],
    userDownloadFeching: false,
    servivceProgress: [],
    isServiceprogressFetching: false,
    transactionUrl: '',
    isTransactionDocumentLoading: false,
    verifyUserFromTableLoading: {},
    userId: "",
    logs : [],
    totalArchivedUsers : 0
  },
  reducers: {
    updateStatusState: (state, action) => {
      const { userId, active } = action.payload;

      state.users = state.users.map((category) => {
        if (category.userId
          === userId
        ) {
          return { ...category, active };
        }
        return category;  
      });
    },
    updateStatusLoading: (state, action) => {
      state.isStatusLoading = action.payload;
    },
    updateEditPage: (state, action) => {
      state.editPage = action.payload;
    },
    getBusinessDetails: (state, action) => {
      state.businessDetails = action.payload.businessDetails;
    },
    getUserServicesReducer: (state, action) => {
      state.userSteps = action.payload.userSteps
    },
    updateBusinessFetching: (state, action) => {
      state.isBusinessFetching = action.payload;
    },
    updateServiceFetching: (state, action) => {
      state.isServiceFetching = action.payload
    },
    updateDownlaodUserFetching: (state, action) => {
      state.userDownloadFeching = action.payload
    },
    updateTransactionFetching: (state, action) => {
      state.transactionFetching = action.payload
    },
    getTransactions: (state, action) => {
      state.transactionDetails = action.payload.transactionDetails;
    },
    downloadUsers: (state, action) => {
      state.downloadUsers = action.payload.downloadUsers;
    },
    serviceProgress: (state, action) => {
      state.servivceProgress = action.payload.servivceProgress
    },
    updateProgressLoading: (state, action) => {
      state.isServiceprogressFetching = action.payload;
    },
    transactionDocumentUrl: (state, action) => {
      state.transactionUrl = action.payload;
    },
    transactionDocumentLoading: (state, action) => {
      console.log(action.payload, "value")
      state.isTransactionDocumentLoading = action.payload;
    },
    verifyUserFromTable: (state, action) => {
      const { userId } = action.payload
    },
    updateVerifyUserLoading: (state, action) => {
      const { userId, loading } = action.payload;

      state.verifyUserFromTableLoading = {
        ...state.verifyUserFromTableLoading,
        [userId]: loading
      };
    },
    getUserIdReucer: (state, action) => {
      state.userId = action.payload;
    },
    updateUserPormotionRole: (state, action) => {
      const { userId, role } = action.payload
      state.users = state.users.map(user =>
        user._id === userId
          ? { ...user, role }
          : user
      );

    },
    updateUserPromotionLoading : (state,action)=>{
      state.isUserUpdating = action.payload;
    },
    deleteUserById :(state, action)=>{
      const userId = action.payload.userId; 
      
      state.users = state.users.filter((user)=>{
        return user._id !== userId
      })
    }, 
    getLogs : (state, action)=>{
      state.logs = action.payload.logs;
      state.totalArchivedUsers = action.payload.totalCount
    },
    updateLogsLoading : (state, action)=>{
      state.logsLoading = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isUsersFetching = true;
      }
      )
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isUsersFetching = false;
        console.log(action.payload, "usrs from slice")
        state.users = action.payload.users.map((user) => {
          const {  __v, isActive, ...rest } = user;
          return rest;
        });
        state.totalPages = action.payload.totalPages
        state.currentpage = action.payload.currentpage
        state.totalRecords = action.payload.totalCount
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isUsersFetching = false;
        if (action.error.message) {
          toast.error(action.error.message);
        }
        else {
          toast.error('Failed to fetch users');
        }
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.isUserCreating = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isUserCreating = false;
        console.log(action.payload, "create user response")
        state.users.push(action.payload);
        toast.success('User created successfully');

      })
      .addCase(createUser.rejected, (state, action) => {
        state.isUserCreating = false;
        if (action.payload.message) {
          toast.error(action.payload.message);
        }
        else {
          toast.error('Failed to create user');
        }
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isUserCreating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUserCreating = false;
        state.users = state.users.map(user =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user
        );

        // state.users.push(action.payload);

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUserCreating = false;
        console.log(action, "reject")
        if (action.payload.message) {
          toast.error(action.payload.message);
        }
        else {
          toast.error('Failed to update user');
        }
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.isUserCreating = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isUserCreating = false;
        state.users = state.users.filter((user) => user._id !== action.payload._id);
        toast.success('User deleted successfully');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isUserCreating = false;
        if (action.payload.message) {
          toast.error(action.payload.message);
        }
        else {
          toast.error('Failed to delete user');
        }
      });


    builder
      .addCase(getUserById.pending, (state) => {
        state.isUserFetching = true;
      }
      )
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isUserFetching = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isUserFetching = false;
        if (action.error.message) {
          toast.error(action.error.message);
        }
        else {
          toast.error('Failed to fetch user');
        }
      });
  }
});
export const { updateStatusState,deleteUserById,getLogs,updateLogsLoading,updateUserPromotionLoading, updateVerifyUserLoading,updateUserPormotionRole, getUserIdReucer, getTransactions, transactionDocumentUrl, transactionDocumentLoading, updateProgressLoading, serviceProgress, updateDownlaodUserFetching, downloadUsers, updateTransactionFetching, updateBusinessFetching, updateServiceFetching, getBusinessDetails, getUserServicesReducer, updateStatusLoading, updateEditPage } = userManageSlice.actions
export default userManageSlice.reducer;