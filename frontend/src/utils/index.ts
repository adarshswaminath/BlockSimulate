import axios from "axios"
import { BACKEND_DOMAIN } from "../constants"



// ? function to get all transactions
export const getUsertransactions = async() => {
    const req = await axios.get(`${BACKEND_DOMAIN}/transactions`)
    return req.data;
}
