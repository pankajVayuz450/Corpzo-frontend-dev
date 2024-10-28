import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUsers, updateUser,getUserById } from "../../actions/UserManagement/index"
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
    currentpage : 0, 
    totalRecords : 0, 
    totalPages : 0, 
    isStatusLoading : false,
    editPage : 1,
    businessDetails : [],
    userSteps : [],
    isBusinessFetching : false, 
    isServiceFetching : false,
    transactionDetails : [],
    transactionFetching : false,
    downloadUsers : [], 
    userDownloadFeching : false
    },
    reducers: {
        updateStatusState: (state, action) => {
            console.log(action.payload, "payload");
            const { userId, active } = action.payload;
            console.log(active, "Updating status");
          
            state.users = state.users.map((category) => {
              if (category.userId 
                === userId
              ) {
                return { ...category, active };
              }
              return category;
            });
          }, 
          updateStatusLoading : (state, action)=> {
            state.isStatusLoading = action.payload;
          },
          updateEditPage : (state, action)=>{
            state.editPage = action.payload;
          }, 
          getBusinessDetails : (state, action)=>{
            state.businessDetails = action.payload.businessDetails;
          },
          getUserServicesReducer : (state, action)=>{
            state.userSteps = action.payload.userSteps
          }, 
          updateBusinessFetching : (state, action)=>{
            state.isBusinessFetching = action.payload;
          }, 
          updateServiceFetching : (state, action)=>{
            state.isServiceFetching = action.payload
          }, 
          updateDownlaodUserFetching : (state, action)=>{
            state.userDownloadFeching = action.payload
          }, 
          updateTransactionFetching : (state, action)=>{
            state.transactionFetching = action.payload
          }, 
          getTransactions : (state, action)=>{
            state.transactionDetails = action.payload.transactionDetails;
          }, 
          downloadUsers :(state, action)=>{
            state.downloadUsers = action.payload.downloadUsers;
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
                    const {createdAt, updatedAt,__v,isActive, ...rest} = user;
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
export const {updateStatusState,getTransactions,updateDownlaodUserFetching,downloadUsers,updateTransactionFetching, updateBusinessFetching,updateServiceFetching,getBusinessDetails,getUserServicesReducer, updateStatusLoading, updateEditPage} = userManageSlice.actions
export default userManageSlice.reducer;