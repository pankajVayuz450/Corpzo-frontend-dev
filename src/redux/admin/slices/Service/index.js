import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  serviceList: [],
  isAdding: false,
  totalPages: 0,
  service: {},
  totalCount: 0,
  diabled: false,
  childLoading: {},
  isStatusLoading: false,
  editPage: 1,
  activeCategories: [],
  activeSubCategories: [],
  activeSubCategoriesList: [],
  activeSelectedSubCategoriesList:[],
  getActiveBusinessEmailList: [],
  forms: [],
  delivrableVideoUrl: "",
  stepsVideoUrl: "",
  documentVideoUrl: "",
  uploadVideoLoading: false,
  buttonContent : "Upload Video",
  updateHeader : "", 
  stepValue : 0
};


const serivceSlice = createSlice({
  name: 'serivceSlice',
  initialState,
  reducers: {
    getServices: (state, action) => {
      state.serviceList = action.payload.serviceList;
      state.totalCount = action.payload.totalCount;
    },
    addSteps: (state, action) => {
      const newCategory = action.payload;
      console.log(newCategory, "newCatgory")
      console.log(newCategory)
    },
    getActiveCategoryList: (state, action) => {
      state.activeCategories = action.payload.activeCategories;
    },
    getActiveSubCategoryList: (state, action) => {
      state.activeSubCategories = action.payload.activeSubCategories;
    },
    getActiveSubCategoryListAll: (state, action) => {
      state.activeSubCategoriesList = action.payload.activeSubCategoriesList;
    },
    getActiveSelectedSubCategoryListAll: (state, action) => {
      state.activeSelectedSubCategoriesList = action.payload;
    },
    getActiveBusinessEmail1: (state, action) => {
      state.getActiveBusinessEmailList = action.payload.getActiveBusinessEmailList;
    },
    getForms: (state, action) => {
      state.forms = action.payload.forms;
    },
    updateVideoUrl: (state, action) => {
      console.log(action.payload, "service slice video url");
      if (action.payload.fieldName === "deliverable") {
        state.delivrableVideoUrl = action.payload.url;
        state.stepValue = 1
      } else if (action.payload.fieldName === "step") {
        state.stepsVideoUrl = action.payload.url;
        state.stepValue = 2
      } else if (action.payload.fieldName === "document") {
        state.documentVideoUrl = action.payload.url;
        state.stepValue = 2
      }
    },
    handleStepValue : (state, action)=>{
      state.stepValue = action.payload || 0;
    }, 
    updateUploadLoading: (state, action) => {
      state.uploadVideoLoading = action.payload;
    },
    updateHeader : (state, action)=>{
      state.header = action.payload;
    },
    updateContent:(state, action)=>{
      console.log(action.payload, "button contenttttt")
      state.buttonContent = action.payload;
    }, 
    deleteStepBId: (state, action) => {
      const categoryId = action.payload;
      console.log(categoryId, "cid")
      state.stepsList = state.stepsList.filter((category) => {
        return category._id !== categoryId
      })
    },
    getServiceById: (state, action) => {
      const newObject = action.payload;
      console.log(newObject, "new Object")
      state.service = newObject;
    },
    updateLoading: (state, action) => {
      state.isFetching = action.payload;
    },
    updateAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    updateStatusLoading: (state, action) => {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      console.log(action.payload, "service payload update ")
      const { serviceId, active } = action.payload;


      state.serviceList = state.serviceList.map((offer) => {
        console.log(offer, "offer from reducer")
        if (offer._id
          === serviceId
        ) {
          return { ...offer, active };
        }
        return offer;
      });
    },
    updateEditPage: (state, action) => {
      state.editPage = action.payload;
    }
  },
});
export const { getServices, updateUploadLoading,updateHeader,handleStepValue, updateContent, getActiveCategoryList, updateVideoUrl, getForms, getActiveSubCategoryList, addSteps, updateEditPage, updateStatusLoading, updateLoading, updateStatusState, toggleSwitchSuccess, toggleSwitchFailure, deleteStepBId, updateAdding, getServiceById, getActiveSubCategoryListAll, getActiveBusinessEmail1,getActiveSelectedSubCategoryListAll } = serivceSlice.actions;

export default serivceSlice.reducer;
