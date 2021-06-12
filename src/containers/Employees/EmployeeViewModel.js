
import axios from 'axios'
class EmployeeViewModel {
  getEmployeeStatus = () => {
    return axios.get('/status')
  };
  getEmployeeRoles = () => {
    return axios.get('/roles')
  };
  getEmployees = () => {
    return axios.get('/employees')
  };
  addEmployee=(values)=>{
    return axios.post('/employees',values)
  }
  editEmployee=(id,values)=>{
    return axios.put(`/employees/${id}`,values)
  }
}
export default new EmployeeViewModel();
