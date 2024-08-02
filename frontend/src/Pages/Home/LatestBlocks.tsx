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
    const [currentPage, setCurrentPage] = useState(1)
    const blocksPerPage = 10

    const fetchBlocks = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/block-data`)
            setBlocks(req.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlocks()
        const interval = setInterval(() => {
            fetchBlocks()
            console.log("API called")
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    // Pagination logic
    const indexOfLastBlock = currentPage * blocksPerPage
    const indexOfFirstBlock = indexOfLastBlock - blocksPerPage
    const currentBlocks = blocks.slice(indexOfFirstBlock, indexOfLastBlock)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="p-4">
            <h3 className="font-bold text-2xl lg:text-4xl mb-4 text-white">Latest Blocks</h3>
            <div className="flex items-center space-y-4 mb-8">
                {blocks.reverse().slice(1, 10).map((block, index) => (
                    <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <button className="btn bg-gradient-to-br from-orange-500 to-orange-400 h-24 w-24 text-white flex items-center justify-center rounded-lg shadow-lg">
                                <span className="text-xl font-semibold">{block.Index}</span>
                            </button>
                            <p className="text-white mt-2">#{block.PreviousHash.slice(0, 8)}</p>
                        </div>
                        {index < blocks.length - 1 && (
                            <svg className="w-8 text-white rotate-90" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C10.9 2 10 2.9 10 4V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V4C14 2.9 13.1 2 12 2Z" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
            <table className="min-w-full rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/12 px-4 py-2">Index</th>
                        <th className="w-2/12 px-4 py-2">Timestamp</th>
                        <th className="w-3/12 px-4 py-2">Data</th>
                        <th className="w-3/12 px-4 py-2">Previous Hash</th>
                        <th className="w-3/12 px-4 py-2">Hash</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {currentBlocks.map((block, index) => (
                        <tr key={index} className="text-white">
                            <td className="border px-4 py-2">{block.Index}</td>
                            <td className="border px-4 py-2">{block.Timestamp}</td>
                            <td className="border px-4 py-2">{block.Data}</td>
                            <td className="border px-4 py-2">{block.PreviousHash}</td>
                            <td className="border px-4 py-2">{block.Hash}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="flex list-none">
                        {Array.from({ length: Math.ceil(blocks.length / blocksPerPage) }, (_, i) => i + 1).map(number => (
                            <li key={number} className="mx-1">
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 ${currentPage === number ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
