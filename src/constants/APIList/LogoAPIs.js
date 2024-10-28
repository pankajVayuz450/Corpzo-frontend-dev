//ALL Admin Video Intro APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const LogoAPIs = {
    getLogos:`${BASE_URL}/user/auth/signup-basic-module`,
    putLogos : `${BASE_URL}/admin/sections`,
    uploadVideo : `${BASE_URL}/user/auth/upload-file`,
    saveLogoDetails : `${BASE_URL}/user/auth/signup-basic-module`,

}
export default LogoAPIs;