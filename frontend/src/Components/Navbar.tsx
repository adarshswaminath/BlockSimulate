import { FaGithub } from "react-icons/fa"
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <nav className="navbar flex justify-between">
       <Link to="/">
       <h2 className="text-3xl text-white font-bold">BlockSimulate.</h2>
       </Link>
        <div className="flex items-center space-x-2">
        <Link to="/wallet">
        <button className="btn w-32 bg-white text-black hover:text-white rounded-full tracking-wider">Wallet</button>
        </Link>
        <a href="https://github.com/adarshswaminath/BlockSimulate" target="_blank" className="btn rounded-full text-xl bg-white text-black hover:text-white">
        <FaGithub />
        </a>
        </div>
    </nav>
  )
}
