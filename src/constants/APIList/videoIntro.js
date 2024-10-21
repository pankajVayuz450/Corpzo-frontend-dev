//ALL Admin Video Intro APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const VideoIntroApis = {
    getVideos:`${BASE_URL}/user/auth/signup-basic-module`,
    putVideo : `${BASE_URL}/admin/sections`,
    uploadVideo : `${BASE_URL}/user/auth/upload-file`,
    saveVideoDetails : `${BASE_URL}/user/auth/signup-basic-module`,

}
export default VideoIntroApis;