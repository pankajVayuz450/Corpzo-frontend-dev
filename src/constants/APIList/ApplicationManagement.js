//ALL Admin Application APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const ApplicationAPIs = {
    getApplication:`${BASE_URL}/admin/applications/application`,
    addApplication : `${BASE_URL}/admin/applications`, 
    deleteApplication : `${BASE_URL}/admin/applications`,
    getApplicationById : `${BASE_URL}/admin/applications`, 
    editApplication : `${BASE_URL}/admin/applications/application`, 
    addNote : `${BASE_URL}/admin/applications/note`, 
    addNoteComment : `${BASE_URL}/admin/applications/comment`, 
    getNoteAndComment : `${BASE_URL}/admin/applications/note`, 
    getCaseHistory : `${BASE_URL}/admin/applications/history`, 
    manageApplication: `${BASE_URL}/admin/applications/manage-application`, 
    getFormJson: `${BASE_URL}/admin/applications/application-form`, 
    getAgent: `${BASE_URL}/admin/users`, 
}
export default ApplicationAPIs;