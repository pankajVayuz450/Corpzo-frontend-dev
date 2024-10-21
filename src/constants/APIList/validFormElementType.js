//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const validFormElementType = {
    getAllValidFormElementTypes:`${BASE_URL}/admin/master/valid-form-element-type`,
    createValidFormElementType:`${BASE_URL}/admin/master/valid-form-element-type`,
    updateFormElementTypeById:`${BASE_URL}/admin/master/valid-form-element-type`,
    deleteValidFormElementTypeById:`${BASE_URL}/admin/master/valid-form-element-type`,
}
export default validFormElementType;