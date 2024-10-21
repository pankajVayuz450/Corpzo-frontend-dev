//ALL Admin Department APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const departmentApis = {
    getDepartment:`${BASE_URL}/admin/department`,
    addDepartment : `${BASE_URL}/admin/department`, 
    deleteDepartment : `${BASE_URL}/admin/department`,
    getDepartmentById : `${BASE_URL}/admin/department`, 
    editDepartment : `${BASE_URL}/admin/department`, 
}
export default departmentApis;