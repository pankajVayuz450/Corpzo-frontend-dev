//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formAPIs = {
    createForm:`${BASE_URL}/admin/form`,
    getAllForms:`${BASE_URL}/admin/form`,
    // getFormById:`${BASE_URL}/admin/form/form-by-id`,
    getFormById:`${BASE_URL}/admin/form/bylimit`,
    updateFormById:`${BASE_URL}/admin/form`,
    changeFormStatus:`${BASE_URL}/admin/form`,
    deleteFormById:`${BASE_URL}/admin/form`,

}
export default formAPIs;