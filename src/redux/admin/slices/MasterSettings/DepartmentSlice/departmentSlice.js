import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 departmentList : [], 
 isAdding : false,
 totalPages : 0,
 totalCount : 0,
 department : {},
 currentPage : 1,
 isStatusLoading : false,
 editPage : 1,
};



const DepartmentSlice = createSlice({
  name: 'subDepartmentSlice',
  initialState,
  reducers: {
    getdepartmentList: (state, action) => {
      state.departmentList = action.payload.departmentList;
      state.totalPages = action.payload.totalPages
      state.totalCount = action.payload.totalCount
      state.currentPage = action.payload.currentPage
    }, 
    addDepartment : (state, action)=>{
      const newDepartment = action.payload; 
      console.log(newDepartment, "newCatgory")
      console.log(newDepartment)
    }, 
    updateAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    updateStatusLoading : (state, action)=> {
      state.isStatusLoading = action.payload;
    },
    deleteDepartmentById :(state, action)=>{
      const DepartmentId = action.payload; 
      console.log(DepartmentId, "cid")
      state.departmentList = state.departmentList.filter((Department)=>{
        return Department.DepartmentId !== DepartmentId
      })
    }, 
    getSingleDepartmentById : (state, action)=>{
      const newObject = action.payload; 
      state.department = newObject;
    }, 
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateStatusState: (state, action) => {
      console.log(current(state), "current state")
      console.log(state, "payload state");
      const { departmentId, active } = action.payload;
      console.log(departmentId, active, "Updating status");
    
      state.departmentList = state.departmentList.map((Department) => {
        if (Department.departmentId 
          === departmentId
        ) {
          return { ...Department, active };
        }
        return Department;
      });
    },
    updateIsAdding : (state, action)=>{
      state.isAdding = action.payload;
    }, 
    updateEditPage : (state, action)=> {
      state.editPage = action.payload;
    }
    
  },
});

export const { getdepartmentList,addDepartment, updateEditPage ,updateStatusLoading, updateAdding,updateLoading,updateStatusState, deleteDepartmentById, getSingleDepartmentById} = DepartmentSlice.actions;

export default DepartmentSlice.reducer;
