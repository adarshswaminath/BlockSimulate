import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const [userAddress,setUserAddress] = useState<string>("")
  const navigate = useNavigate()
  const handleSubmit = () => {
    if(userAddress) {
      navigate(`/addresses/${userAddress}`)
    }
  }
  return (
    <header className="flex flex-col items-center py-12">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase text-white">Explorer</h2>
        <p className="mt-6 text-lg text-white max-w-2xl text-center">A blockchin explorer for blocksimulate smart chain.Enabling users to explore blocks, transactions and addresses on Blocksimulate network.</p>
        <div className="flex flex-wrap space-x-2 items-center w-full max-w-3xl justify-center">
        <input onChange={(e) => setUserAddress(e.target.value)} type="text" className="input bg-gray-200 text-black mt-3 w-full max-w-2xl" placeholder="search blocks / transactions / wallets" />
        <button onClick={handleSubmit} className="btn mt-3 bg-gray-900 rounded-full text-2xl text-white">
          <CiSearch/>
        </button>
        </div>
    </header>
  )
}
