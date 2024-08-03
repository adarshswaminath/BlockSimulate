import axios from "axios";
import Card from "../../Components/Card";
import { BACKEND_DOMAIN } from "../../constants";
import { useEffect, useState } from "react";
import { getUsertransactions } from "../../utils";

export default function BlockDetails() {
    const [totalWallets, setTotalWallets] = useState<number>(0)
    const [totalTransactions, setTotalTransactions] = useState<number>(0)
    const [latestBlockHash, setLatestBlockHash] = useState<string>('')

    // ? function to get all wallets and its count
    const getAllWallets = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/wallets`)
            setTotalWallets(req.data.length)
        } catch (err) {
            console.log("Error :", err)
        }
    }

    // ? function to get latest blocl
    const getLatestBlock = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/latest-block`)
            setLatestBlockHash(req.data.Hash)
        } catch (err) {
            console.log("Error :", err)
        }
    }


    // ? get all transactions count
    const fetchTransaction = async () => {
        const transactions = await getUsertransactions()
        setTotalTransactions(transactions.length)
    }

    useEffect(() => {
        getAllWallets()
        fetchTransaction()

        // ! need to call getLatestBlock function in every 10 min
        const interval = setInterval(() => {
            getLatestBlock()
        }, 10000)

        return () => clearInterval(interval)
    }, [])
    return (
        <div className="flex items-center justify-center flex-wrap gap-4">
            <Card>
                <h3 className="font-bold">total wallets</h3>
                <h2 className="text-2xl mt-3 font-bold">{totalWallets}</h2>
            </Card>

            <Card>
                <h3 className="font-bold">latest block</h3>
                <h2 className="text-2xl mt-3 font-bold">
                    {latestBlockHash.slice(0, 12) ? latestBlockHash.slice(0, 12) : "Loading..."}
                </h2>
            </Card>

            <Card>
                <h3 className="font-bold">total transactions</h3>
                <h2 className="text-2xl mt-3 font-bold">{totalTransactions}</h2>
            </Card>
        </div>
    )
}
