
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import Wallet from "./Pages/Wallet/Wallet";
import Transactions from "./Pages/Transactions/Transactions";
import WalletDetails from "./Pages/WalletDetails/WalletDetails";

export default function App() {
  return (
    <main className="min-h-screen" style={{
      backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)"
    }}>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/addresses/:address" element={<WalletDetails />} />
          <Route path="/transactions" element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}
