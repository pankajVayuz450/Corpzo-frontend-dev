//ALL Admin FAQ APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const FaqApis = {
    getFaqs:`${BASE_URL}/admin/faqs`,
    addFaqs : `${BASE_URL}/admin/faqs`, 
    // deleteSubCategory : `${BASE_URL}/admin/sub-sections`,
    getFaqById : `${BASE_URL}/admin/faqs`, 
    editFaq : `${BASE_URL}/admin/faqs`,
    getAllServiceFaqs : `${BASE_URL}/admin/all-faqs`, 
    addsServiceFaqs : `${BASE_URL}/admin/serviceFaq`
}
export default FaqApis;