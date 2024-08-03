import { useEffect, useState } from "react"
import CreateWallet from "./CreateWallet"
import { useGlobalState } from "../../Context/GlobalStateContext"
import UserWallet from "./UserWallet"




export default function Wallet() {
  const [publicKey, setPublicKey] = useState<string | null>()
  const [privateKey, setPrivateKey] = useState<string | null>()
  const { isEnabled } = useGlobalState()
  useEffect(() => {
    setPublicKey(localStorage.getItem("publicKey"))
    setPrivateKey(localStorage.getItem("privateKey"))
  }, [isEnabled])
  return (
    <div className="flex flex-col items-center py-16">
      <h3 className="text-white text-2xl uppercase tracking-wider">crypto wallet</h3>
      {(publicKey && privateKey) ? <UserWallet publicKey={publicKey} privateKey={privateKey}/> : <CreateWallet />}
    </div>
  )
}
