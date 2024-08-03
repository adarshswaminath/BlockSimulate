import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <nav className="navbar flex justify-between">
        <h2 className="text-3xl text-white font-bold">BlockSimulate.</h2>
        <Link to="/wallet">
        <button className="btn w-32 bg-white text-black hover:text-white rounded-full tracking-wider">Wallet</button>
        </Link>
    </nav>
  )
}
