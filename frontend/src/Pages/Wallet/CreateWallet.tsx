import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_DOMAIN } from "../../constants"
import { FaCopy } from "react-icons/fa"

interface WalletModalProps {
    setShowModal: (show: boolean) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ setShowModal }) => {
    const [privateKey, setPrivateKey] = useState<string>('')
    const [publicKey, setPublicKey] = useState<string>('')

    useEffect(() => {
        axios.post(`${BACKEND_DOMAIN}/create-wallet`)
            .then((res) => {
                setPrivateKey(res.data.private_key)
                setPublicKey(res.data.public_key)
            })
            .catch((err) => console.log(err))
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(privateKey)
        alert("Private key copied to clipboard!")
    }

    const handleSave = () => {
        localStorage.setItem("privateKey", privateKey)
        localStorage.setItem('publicKey', publicKey)
        setShowModal(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-lg z-50">
            <div className="bg-white p-6 h-auto w-96 rounded-xl shadow-lg flex flex-col">
                <div className="flex justify-end">
                    <button onClick={() => setShowModal(false)} className="bg-black w-24 rounded-full text-white py-2">
                        Close
                    </button>
                </div>
                <div className="mt-8 text-left">
                    <div className="mb-4">
                        <h4 className="font-semibold text-black">Private Key</h4>
                        <p className="text-sm text-gray-600 mb-4 text-balance">
                            Your private key is crucial for accessing and managing your wallet. 
                            It should be kept secret and secure, as anyone with access to it can control your wallet.
                            Make sure to save it in a safe place.
                        </p>
                        <div className="p-2 bg-gray-200 mt-2 rounded-md shadow-inner flex justify-between items-center">
                            <span className="truncate">{privateKey}</span>
                            <button
                                onClick={copyToClipboard}
                                className="ml-2 text-black hover:text-black"
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold">Public Key</h4>
                        <div className="p-2 bg-gray-200 mt-2 rounded-md shadow-inner flex justify-between items-center">
                            <span className="truncate">{publicKey}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-4 bg-black w-32 btn text-white rounded-full"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CreateWallet() {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <main className="py-12 lg:py-20">
            <button onClick={() => setShowModal(true)} className="w-44 rounded-xl bg-white text-black hover:bg-gray-800 hover:text-white py-2">
                Create New Wallet
            </button>
            {showModal && <WalletModal setShowModal={setShowModal} />}
        </main>
    )
}
