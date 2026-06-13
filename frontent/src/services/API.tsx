import axios from "axios";

const BASE_URL = 'http://localhost:8000';

const userRegistrationService = async () => {
    const res = await axios.post(`${BASE_URL}/user/register`)
    return res.data
}