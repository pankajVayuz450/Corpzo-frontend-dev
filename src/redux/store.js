// store.js is the entry point of the Redux store. It is responsible for creating the Redux store and combining the reducers.
import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './admin/slices/user';
// import formSliceReducer from './admin/slices/form';
import formSliceReducer from './admin/slices/FormManagement/formSlice'
import fieldSliceReducer from './admin/slices/fields';
import fieldsSlice2Reducer from './admin/slices/FormManagement/fieldsSlice'
import dataSliceReducer from './admin/slices/data';
import subAdminReducer from './admin/slices/subAdmin';
import couponSliceReducer from './admin/slices/coupon'
import attributesSliceReducer from './admin/slices/MasterSettings/Attributes/index'
import elementSliceReducer from './admin/slices/MasterSettings/Elements/index'
import subInputSliceReducer from './admin/slices/MasterSettings/SubInputs/index'
import regexSliceReducer from './admin/slices/MasterSettings/Regex/index'
import validFormElementsSliceReducer from './admin/slices/MasterSettings/Valid Form Elements/index'
import validFormAttributesSliceReducer from './admin/slices/MasterSettings/Valid Form Attributes/index'
import userManageSliceReducer from './admin/slices/UserManagement/index'
import adminSlice from './admin/slices/adminSlice'
import categorySliceReducer from './admin/slices/MasterSettings/CategorySlice/categorySlice';
import subCategorySliceReducer from "./admin/slices/MasterSettings/subCategorySlice/aubCategorySlice";
import departmentReducer from './admin/slices/MasterSettings/DepartmentSlice/departmentSlice'
import InvestorReducer from "./admin/slices/InvestorManagement/Index"
import applicationReducer from "./admin/slices/AppliationManagement/Index"
import faqReducer from "./admin/slices/FAQ/index"
import stepsReducer from "./admin/slices/Steps"
import subscriptionReducer from "./admin/slices/Subscriptions"
import offerReducer from "./admin/slices/Offer"
import serivceReducer from "./admin/slices/Service"
import videoReducer from "./admin/slices/VIdeoIntroSlice"
import logger from 'redux-logger'; // Import redux-logger
import documentReducer from './admin/slices/Document'
import roleReducer from "./admin/slices/rolesSlice"
import teamReducer from "./admin/slices/teamsSlice"


const customMiddleware = store => next => action => {
  console.log('Dispatching action:', action); // Log the action
  const result = next(action); // Pass the action to the next middleware/reducer
  console.log('Next state:', store.getState()); // Log the next state after the action is processed
  return result; // Return the result from the next middleware/reducer
};
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    admin:adminSlice,
    fields:fieldSliceReducer,
    formFields:fieldsSlice2Reducer,
    // forms: formSliceReducer,
    forms:formSliceReducer,
    subAdmins: subAdminReducer,
    data: dataSliceReducer,
    attributes:attributesSliceReducer,
    elements:elementSliceReducer,
    subInput: subInputSliceReducer,
    validFormElements:validFormElementsSliceReducer,
    validFormElementAttributes:validFormAttributesSliceReducer,
    validations:regexSliceReducer,
    coupons:couponSliceReducer ,
    userMgmt: userManageSliceReducer,
    category : categorySliceReducer,
    subCategory : subCategorySliceReducer,
    department : departmentReducer,
    investors: InvestorReducer, 
    applications : applicationReducer, 
    faq : faqReducer,
    steps : stepsReducer,
    subscriptions : subscriptionReducer,
    offer : offerReducer,
    service : serivceReducer,
    video : videoReducer, 
    document : documentReducer, 
    role: roleReducer,
    team: teamReducer
  },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(customMiddleware, logger)
});
export default store;
