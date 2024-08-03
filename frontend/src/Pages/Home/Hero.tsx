export default function Hero() {
  return (
    <header className="flex flex-col items-center py-12">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase text-white">Explorer</h2>
        <p className="mt-6 text-lg text-white max-w-2xl text-center">A blockchin explorer for blocksimulate smart chain.Enabling users to explore blocks, transactions and addresses on Blocksimulate network.</p>
        <input type="text" className="input bg-gray-200 mt-3 w-full max-w-2xl" placeholder="search blocks / transactions / wallets" />
    </header>
  )
}
