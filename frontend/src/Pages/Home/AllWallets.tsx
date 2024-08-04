import axios from "axios"
import { BACKEND_DOMAIN } from "../../constants"
import { useEffect, useState } from "react"

export default function AllWallets() {
    const [wallets,setWallets] = useState([])
     // ? function to get all wallets and its count
     const getAllWallets = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/wallets`)
            setWallets(req.data.length)
        } catch (err) {
            console.log("Error :", err)
        }
    }

    useEffect(() => {
        getAllWallets()
    },[])

  return (
    <div>AllWallets</div>
  )
}
