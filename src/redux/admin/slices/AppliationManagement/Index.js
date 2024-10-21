import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  isStatusLoading: false,
  applicationsList: [],
  applicationId: "",
  attributeId: "",
  agentList: [],
  formId: "",
  userId: "",
  noteList: [],
  commentLoading:false,
  caseHistoryList: [],
  applicationFormData: [],
  isAdding: false,
  totalPages: 0,
  investor: {},
  totalCount: 0,
  currentStatus:""
};



const applicationSlice = createSlice({
  name: 'ApplicationManagementSlice',
  initialState,
  reducers: {
    getApplications: (state, action) => {
      state.applicationsList = action.payload.applicationsList;
      state.totalCount = action.payload.totalCount
      state.totalPages = action.payload.totalPages
    },
    getApplicationsFormData: (state, action) => {

      state.applicationFormData = action.payload;

    },

    getNoteList: (state, action) => {

      state.noteList = action.payload
    },
    getAgentList: (state, action) => {

      state.agentList = action.payload
    },
    setApplicationId: (state, action) => {

      state.applicationId = action.payload
    },
    setUserId: (state, action) => {

      state.userId = action.payload
    },
    setCurrentStatus: (state, action) => {

      state.currentStatus = action.payload
    },
    setFormId: (state, action) => {

      state.formId = action.payload
    },
    setAttributeId: (state, action) => {

      state.attributeId = action.payload;
    },
    getCaseHistoryList: (state, action) => {

      state.caseHistoryList = action.payload
    },
    getSingleApplicationById: (state, action) => {
      const newObject = action.payload;
      state.investor = newObject;
    },
    updateLoading: (state, action) => {
      state.isFetching = action.payload;
    },
    commentLoading: (state, action) => {
      state.commentLoading = action.payload;
    },
    updateApplicationStatusLoading: (state, action) => {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      console.log(current(state), "current state check ")

    },
    manageUpdateStatusState: (state, action) => {
      const { attributeId, status } = action.payload; // Destructure the payload to get attributeId and newStatus

      // Find the index of the item in applicationFormData that matches the given attributeId
      const index = state.applicationFormData.findIndex((item) => item._id === attributeId);

      if (index !== -1) {
        // Update the status of the matched item
        state.applicationFormData[index].status = status;
      }

      console.log(current(state), "Updated state with new status");
    },
    manageUpdateCommentState: (state, action) => {
      const { noteId, commenterId, commentContent, type } = action.payload; // Destructure the comment details from payload
    
      // Find the index of the note in noteList that matches the given noteId
      const noteIndex = state.noteList.findIndex((note) => note.noteId === noteId);
    
      if (noteIndex !== -1) {
        // If the note is found, push the new comment into the comments array of the found note
        state.noteList[noteIndex].comments.push({
          _id: new Date().getTime().toString(),  // generate a temporary ID for the new comment
          noteId: noteId,
          commenterId: commenterId,
          commentContent: commentContent,
          type: type
        });
      }
    
      console.log(current(state), "Comment added successfully");
    },
    


  },
});


export const { getApplications, updateLoading, updateStatusState, getSingleApplicationById, getNoteList, getCaseHistoryList, getApplicationsFormData, setApplicationId, setAttributeId, setFormId, setUserId, updateApplicationStatusLoading, manageUpdateStatusState, getAgentList,commentLoading,manageUpdateCommentState,setCurrentStatus } = applicationSlice.actions;

export default applicationSlice.reducer;
