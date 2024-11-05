//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const adminAPIs = {
    login:`${BASE_URL}/user/auth/login`,
    checkUser:`${BASE_URL}/admin/auth/check-user`,
    verifyOTP:`${BASE_URL}/user/auth/verify-otp`,
    resendOTP:`${BASE_URL}/user/auth/resend-otp`,
}
// const adminAPIs = {
//     login:`${BASE_URL}/admin/auth/login`,
//     checkUser:`${BASE_URL}/admin/auth/check-user`,
//     verifyOTP:`${BASE_URL}/admin/auth/verify-otp`,
//     resendOTP:`${BASE_URL}/admin/auth/resend-otp`,
// }
export default adminAPIs;