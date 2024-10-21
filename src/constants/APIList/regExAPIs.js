//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const regExAPIs = {
    createRegEx:`${BASE_URL}/admin/master/reg-ex`,
    getAllRegEx:`${BASE_URL}/admin/master/reg-ex`,
    getRegExById:`${BASE_URL}/admin/master/reg-ex`,
    updateRegExById:`${BASE_URL}/admin/master/reg-ex`,
    deleteRegExById:`${BASE_URL}/admin/master/reg-ex`,
}
export default regExAPIs;