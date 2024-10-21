//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const validFormElements = {
    getAllValidFormElements:`${BASE_URL}/admin/master/valid-form-element`,
    createValidFormElement:`${BASE_URL}/admin/master/valid-form-element`,
    updateValidFormElementById:`${BASE_URL}/admin/master/valid-form-element`,
    deleteValidFormElementById:`${BASE_URL}/admin/master/valid-form-element`,
}
export default validFormElements;