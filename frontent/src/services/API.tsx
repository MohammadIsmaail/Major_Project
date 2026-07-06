import axios from "axios";

const BASE_URL = "https://lms-backend-ocvq.onrender.com";

 

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
  const response = await axios.get(`${BASE_URL}/admin/admin-dashboard-stats`);
  return response.data;
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

// Course
export const createMasterCourse = async(data:any)=>{
  const res = await axios.post(`${BASE_URL}/admin/create-master-course`,data)
  return res.data
}

export const getMasterCourse = async () => {
  const res = await axios.get(`${BASE_URL}/admin/get-master-course/`,);
  return res.data;
};

export const deleteMasterCourse = async (id:any) => {
  const res = await axios.delete(`${BASE_URL}/admin/delete-master-course/${id}`,);
  return res.data;
};


export const getSingleMasterCourse = async (id: any) => {
  const res = await axios.get(`${BASE_URL}/admin/single-master-course/${id}`);
  return res?.data;
};


export const updateMasterCourse = async (id: any,data: any) => {
  const res = await axios.put(`${BASE_URL}/admin/update-master-course/${id}`,data);
  return res.data;
};

//    User 
export const getUserPlans = async () => {
  const res = await axios.get(`${BASE_URL}/admin/get-master-plan`);
  return res.data;
};

export const purchasePlanService = async (plan_id: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/user/purchase-plan`,{ plan_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
// Purchased Plans
export const purchasedPlanService = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/user/Purchased-Plan-User`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
// View Course
export const viewCourseService = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/user/user-view-course`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};



export const userForgotPasswordService = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/user/forget-passwords`,data);
  return res.data;
};


// llllllllllllllllllllllllllll


export const getUserDashboardService = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/user/get-user-dashboard`, { // 👈 fix
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};




// User Management (Admin)
export const getAllUsersService = async () => {
  const token = localStorage.getItem("token"); // 👈 tumhare project me admin/user same "token" key use ho rahi hai, isliye ye rakha
  const res = await axios.get(`${BASE_URL}/admin/get-all-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUserService = async (id: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/admin/delete-user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const toggleUserStatusService = async (id: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.patch(`${BASE_URL}/admin/toggle-user-status/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update Password
export const updatePasswordService = async (data: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BASE_URL}/user/update-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};