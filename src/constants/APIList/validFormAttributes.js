//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const validFormAttributes = {
    getValidFormAttributes:`${BASE_URL}/admin/master/valid-form-attribute`,
    createValidFormAttribute:`${BASE_URL}/admin/master/valid-form-attribute`,
    updateValidFormAttributeById:`${BASE_URL}/admin/master/valid-form-attribute`,
    deleteValidFormAttributeById:`${BASE_URL}/admin/master/valid-form-attribute`,
}
export default validFormAttributes;