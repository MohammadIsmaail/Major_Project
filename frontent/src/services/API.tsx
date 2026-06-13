import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const userRegistrationService = async (_data:any) => {
    const res = await axios.post(`${BASE_URL}/user/register`,_data)
    return res?.data
}