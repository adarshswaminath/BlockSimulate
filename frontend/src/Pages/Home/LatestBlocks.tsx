import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_DOMAIN } from "../../constants"

export default function LatestBlocks() {
    interface Block {
        Index: number,
        Timestamp: string,
        Data: string,
        PreviousHash: string,
        Hash: string
    }

    const [blocks, setBlocks] = useState<Block[]>([])

    const fetchBlocks = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/block-data`)
            let reverseBlocks = req.data.reverse()
            setBlocks(reverseBlocks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlocks()
        const interval = setInterval(() => {
            fetchBlocks()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="p-4">
            <div className="flex items-center justify-center mt-4">
                <div className="w-full max-w-4xl p-3 border rounded-xl ">
                    <h2 className="font-bold text-white text-center">Latest Block Details</h2>
                    <hr className="mt-4 mb-4 border-white" />
                    <div className="grid grid-cols-3 text-white font-semibold">
                        <h2>Block</h2>
                        <h2>Timestamp</h2>
                        <h2>Hash</h2>
                    </div>
                    <hr className="mt-4 mb-4 border-white" />
                    {/* Data displaying */}
                    {blocks.slice(0, 10).map((block, index) => (
                        <div key={index} className="grid grid-cols-3 text-white border-b border-white last:border-none p-2">
                            <span>{block.Index}</span>
                            <span>{block.Timestamp.slice(-9)}</span>
                            <span className="truncate">{block.Hash}</span>
                        </div>
                    ))}
                    <div className="mt-3 flex justify-center">
                    <button className="bg-white btn w-full text-black hover:text-white">See All Transactions</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
