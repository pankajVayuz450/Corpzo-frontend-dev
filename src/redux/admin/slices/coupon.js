import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    couponsList: [],
    coupon: {},
    isCouponCreating: false,
    isCouponsFetching: false,
    isCouponUpdating: false,
    isCouponDeleting: false,
    isActiveCouponIndex:0,
    totalPages : 0,
 totalCount : 0,
 department : {},
 currentPage : 1,
};



const CouponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    getAllCouponsList: (state, action) => {
      state.couponsList = action.payload.couponsList;
      state.totalCount = action.payload.totalCount
      state.currentPage = action.payload.currentPage
    }, 
    createCouponReducer : (state, action)=>{
      const newCoupon = action.payload; 
     
      
    }, 
    updateCoupon : (state, action)=>{
      const newCoupon = action.payload; 
     
      
    }, 
    couponLoadingCreate : (state, action)=> {
      state.isCouponCreating = action.payload;
    },
    couponLoadingUpdate : (state, action)=> {
      state.isCouponUpdating = action.payload;
    },
    couponLoadingFatch : (state, action)=> {
      state.isCouponsFetching = action.payload;
    },
    couponLoadingDelete : (state, action)=> {
        state.isCouponDeleting = action.payload;
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
    updateCouponStatusState: (state, action) => {
      console.log(current(state), "current state")
      console.log(state, "payload state");
      const { couponId, active } = action.payload;
      console.log(couponId, active, "Updating status");
    
      state.couponsList = state.couponsList.map((Coupon) => {
        if (Coupon.couponId 
          === couponId
        ) {
          return { ...Coupon, active };
        }
        return Coupon;
      });
    },
    updateIsAdding : (state, action)=>{
      state.isAdding = action.payload;
    }, 
    updateEditPage : (state, action)=> {
      state.editPage = action.payload;
    },
    setCouponIndex : (state, action)=> {
      state.isActiveCouponIndex = action.payload;
    }
    
  },
});

export const { getAllCouponsList,couponLoadingFatch,couponLoadingCreate,createCouponReducer,couponLoadingUpdate,updateCouponStatusState,updateCoupon,setCouponIndex} = CouponSlice.actions;

export default CouponSlice.reducer;
