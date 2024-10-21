import { createSlice } from '@reduxjs/toolkit';
import { createSubAdmin, deleteSubAdmin, updateStatus, fetchSubAdminById, fetchSubAdmins, updateSubAdmin } from '../actions/subAdmin';
import { sub } from 'date-fns';
import { toast } from 'react-toastify';

const subAdminSlice = createSlice({
    name: 'subAdmins',
    initialState: {
        subAdmins: [],
        subAdmin: {},
        isSubAdminCreating: false,
        isSubAdminFetching: false,
        isSubAdminsFetching: false,
        isSubAdminUpdating: false,
        isSubAdminDeleting: false,
        disabled : false,
        statusloading : false
    },
    reducers: {
        updateStatusLoading : (state, action)=> {
            state.statusloading = action.payload;
            console.log(action.payload, 'state from slice ')
          },
          updateStatusState: (state, action) => {
            // const { faqId, active } = action.payload;
            // console.log(faqId, active, "Updating status");
            console.log(action.payload, "action payload from subadmin slice");
            state.subAdmins = state.subAdmins.map((category) => {
                if (category.agentId 
                  === action.payload.agentId
                ) {
                  return { ...category, active : action.payload.active };
                }
                return category;
              });
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubAdmins.pending, (state) => {
                state.isSubAdminsFetching = true;
            })
            .addCase(fetchSubAdmins.fulfilled, (state, action) => {
                state.isSubAdminsFetching = false;
                console.log(action.payload.data, "action bhai")
                // state.admins = action.payload.data;
                state.subAdmins = action.payload.data.map((subAdmin) => {
                    const {createdAt, updatedAt, __v,isActive, ...data} = subAdmin;
                    return data;
            })
            })
            .addCase(fetchSubAdmins.rejected, (state, action) => {
                state.isSubAdminsFetching = false;
                if(action.error.message){
                    toast.error(action.error.message);
                }
                else{
                    toast.error('Failed to fetch sub-admins');
                }
            });

            builder
                .addCase(createSubAdmin.pending, (state) => {
                    state.isSubAdminCreating = true;
                })
                .addCase(createSubAdmin.fulfilled, (state, action) => {
                    state.isSubAdminCreating = false;
                    state.subAdmins.push(action.payload);
                    console.log(action.payload);
                    toast.success('Sub-admin created successfully');

                })
                .addCase(createSubAdmin.rejected, (state, action) => {
                    state.isSubAdminCreating = false;
                    if(action.error.message){
                        toast.error(action.error.message);
                    }
                    else{
                        toast.error('Failed to create sub-admin');
                    }
                });

                builder
                    .addCase(updateSubAdmin.pending, (state) => {
                        state.isSubAdminCreating = true;
                    })
                    .addCase(updateSubAdmin.fulfilled, (state, action) => {
                        state.isSubAdminCreating = false;
                        const index = state.subAdmins.findIndex((subAdmin) => subAdmin._id === action.payload._id);
                        state.subAdmins[index] = action.payload;
                        toast.success('Sub-admin updated successfully');
                    })
                    .addCase(updateSubAdmin.rejected, (state, action) => {
                        state.isSubAdminCreating = false;
                        if(action.error.message){
                            toast.error(action.error.message);
                        }
                        else{
                            toast.error('Failed to update sub-admin');
                        }
                    });

                    builder
                    .addCase(fetchSubAdminById.pending, (state) => {
                      state.isSubAdminFetching = true;
                    })
                    .addCase(fetchSubAdminById.fulfilled, (state, action) => {
                      state.isSubAdminFetching = false;
                        state.subAdmin = action.payload;
                    })
                    .addCase(fetchSubAdminById.rejected, (state, action) => {
                        state.isSubAdminFetching = false;
                        // if(action.error.message){
                        //     toast.error(action.error.message);
                        // }
                        // else{
                        //     toast.error('Failed to fetch sub-admin');
                        // }
                        toast.error(action.payload.message);
                        console.log('rejected');
                    })

                    builder
                        .addCase(updateStatus.pending, (state) => {
                            state.isSubAdminDeleting = true;
                            state.disabled = true
                            state.isStatusLoading = true;
                        }
                        )
                        .addCase(updateStatus.fulfilled, (state, action) => {
                            state.isSubAdminDeleting = false;
                            state.subAdmins = state.subAdmins.map((category) => {
                                if (category.agentId 
                                  === action.payload.agentId
                                ) {
                                  return { ...category, active : action.payload.active };
                                }
                                return category;
                              });
                              state.disabled = false;
                              state.isStatusLoading = false;
                            console.log(action.payload, "values from the slice")
                        })
                        .addCase(updateStatus.rejected, (state, action) => {
                            state.isSubAdminDeleting = false;
                            state.disabled = false
                            state.isStatusLoading = true;
                        });
                   
    }
});
export const {updateStatusLoading, updateStatusState} = subAdminSlice.actions;
export default subAdminSlice.reducer;
