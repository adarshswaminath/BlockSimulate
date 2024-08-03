import CreateWallet from "./CreateWallet"

export default function Wallet() {
  const publicKey = localStorage.getItem("publicKey")
  const privateKey = localStorage.getItem("privateKey")
  return (
    <div className="flex flex-col items-center py-16">
      <h3 className="text-white text-2xl uppercase tracking-wider">crypto wallet</h3>
      <header className="flex items-center justify-between p-2 bg-gray-600 w-full max-w-3xl rounded-xl">
        <div className="badge text-white">BlockChian Simulate Chain</div>
        <h2 className="text-white">Account</h2>
      </header>
      {(publicKey && privateKey) ? "Account" : <CreateWallet/>}
    </div>
  )
}
