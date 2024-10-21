//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formAttributesNew = {
        createFormAttribute:`${BASE_URL}/admin/master/attribute`,
        updateFormAttribute:`${BASE_URL}/admin/master/attribute`,
        deleteFormAttributeById:`${BASE_URL}/admin/master/attribute`,
        getAllFormAttributes:`${BASE_URL}/admin/master/attribute`,
        getFormAttributeById:`${BASE_URL}/admin/master/attribute-byid`,
}
export default formAttributesNew;