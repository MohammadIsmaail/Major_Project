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


export const getDashboardStats = async () => {
  const res = await axios.get(`${BASE_URL}/admin/get-dashboard-stats`);
  return res?.data;
};


export const createMasterPlan = async (data: any) => {
  const res = await axios.get(`${BASE_URL}/admin/get-dashboard-stats`);
  return res?.data;
};

export const getMasterPlanById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/admin/get-dashboard-stats`);
  return res?.data;
};

export const updateMasterPlan = async (id: string, data: any) => {
  const res = await axios.get(`${BASE_URL}/admin/get-dashboard-stats`);
  return res?.data;
};