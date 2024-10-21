//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formFields2API = {
    createFormField2:`${BASE_URL}/admin/form/field-2`,
    getAllFormFields2:`${BASE_URL}/admin/form/field-2`,
    updateFormFieldById2:`${BASE_URL}/admin/form/field-2`,
    deleteFormFieldById2:`${BASE_URL}/admin/form/field-2`,

}
export default formFields2API;