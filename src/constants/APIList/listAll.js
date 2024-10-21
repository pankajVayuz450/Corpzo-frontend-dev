//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const listAll = {
    getAllFieldTypes:`${BASE_URL}/admin/master/all-field-types`,
    getAllFieldSubtypes:`${BASE_URL}/admin/master/all-field-sub-types`,
    getAllAttributes:`${BASE_URL}/admin/master/all-attributes`,
}
export default listAll;