//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const formInputFields = {
    getAllInputs:`${BASE_URL}/admin/master/inputs`,
    createFormInput:`${BASE_URL}/admin/master/input`,
    updateFormInput:`${BASE_URL}/admin/master/input`,
    deleteFormInput:`${BASE_URL}/admin/master/input`,
}
export default formInputFields;