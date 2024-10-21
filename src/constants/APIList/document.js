//ALL Admin Document APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const DocumentApis = {
    getDocument:`${BASE_URL}/document/admin-folder`,
    addDocument:`${BASE_URL}/document/admin-folder`,
    updateDocument : `${BASE_URL}/document/admin-folder`,
    uploadDocument : `${BASE_URL}/document/upload-document-admin`,
    getFolderDocuments :  `${BASE_URL}/document/admin-uploaded-document`
    // addDocument : `${BASE_URL}/admin/Document`, 
    // deleteDocument : `${BASE_URL}/admin/Document`,
    // getDocumentById : `${BASE_URL}/admin/Document`, 
    // editDocument : `${BASE_URL}/admin/Document`, 
}
export default DocumentApis;