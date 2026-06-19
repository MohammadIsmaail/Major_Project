import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const userRegistrationService = async (_data:any) => {
    const res = await axios.post(`${BASE_URL}/user/register`,_data)
    return res?.data
}

export const userLoginService = async (_data:any) => {
    const res = await axios.post(`${BASE_URL}/user/login`,_data)
    return res?.data
}

export const adminLoginService = async (_data:any) => {
    const res = await axios.post(`${BASE_URL}/admin/login`,_data)
    return res?.data
}

// dfghjk
export const getDashboardStats = async () => {
  const res = await axios.get(`${BASE_URL}/admin/get-dashboard-stats`);
  return res?.data;
};


export const createMasterPlan = async (_data:any) => {
  const res = await axios.post(`${BASE_URL}/admin/create-master-plan`,_data);
  return res?.data;
};

export const getMasterPlan = async () => {
  const res = await axios.get(`${BASE_URL}/admin/get-master-plan`);
  return res?.data;
};

export const deleteMasterPlan = async (id: any) => {
  const res = await axios.delete(`${BASE_URL}/admin/delete-master-plan/${id}`);
  return res?.data;
};

export const getSingleMasterPlan = async (id: any) => {
  const res = await axios.get(`${BASE_URL}/admin/get-single-master-plan/${id}`);
  return res?.data;
};


export const updateMasterPlan = async (id: any,data: any) => {
  const res = await axios.put(`${BASE_URL}/admin/update-master-plan/${id}`,data);
  return res.data;
};




