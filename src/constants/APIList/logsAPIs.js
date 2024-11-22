//ALL Admin Logs APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const logsAPIs = {
    getLogs : `${BASE_URL}/admin/applications/logs`
}

export default logsAPIs