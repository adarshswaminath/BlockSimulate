import { useEffect, useState } from "react"
import CreateWallet from "./CreateWallet"
import { useGlobalState } from "../../Context/GlobalStateContext"
import UserWallet from "./UserWallet"
import ElasticTitle from "../../Components/ElasticTitle"
import GlowingButton from "../../Components/GlowingButton"




export default function Wallet() {
  const [publicKey, setPublicKey] = useState<string | null>()
  const [privateKey, setPrivateKey] = useState<string | null>()
  const { isEnabled } = useGlobalState()
  useEffect(() => {
    setPublicKey(localStorage.getItem("publicKey"))
    setPrivateKey(localStorage.getItem("privateKey"))
  }, [isEnabled])
  return (
   <section className="py-16">
     <ElasticTitle title="Crypto Wallet"/>
    <div className="flex items-center justify-center mt-6 p-2">
    <GlowingButton/>
    </div>
    <div className="flex flex-col items-center ">
      {(publicKey && privateKey) ? <UserWallet publicKey={publicKey} privateKey={privateKey}/> : <CreateWallet />}
    </div>
   </section>
  )
}
