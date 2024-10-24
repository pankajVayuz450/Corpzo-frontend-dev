//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const subInputFields = {
    getFormSubInputs:`${BASE_URL}/admin/master/sub-inputs`,
    createFormSubInput:`${BASE_URL}/admin/master/sub-input`,
    updateFormSubInput:`${BASE_URL}/admin/master/sub-input`,
    deleteFormSubInput:`${BASE_URL}/admin/master/sub-input`,
}
export default subInputFields;