//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const teamAPIs = {
    createTeam:`${BASE_URL}/admin/team`,
    getAllTeams:`${BASE_URL}/admin/team`,
    getTeamById:`${BASE_URL}/admin/team`,
    updateTeamById:`${BASE_URL}/admin/team`,
    deleteTeamById:`${BASE_URL}/admin/team`,

}
export default teamAPIs;