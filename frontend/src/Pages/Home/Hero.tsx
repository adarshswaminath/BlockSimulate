import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ElasticTitle from "../../Components/ElasticTitle";

export default function Hero() {
  const [userAddress, setUserAddress] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (userAddress) {
      navigate(`/addresses/${userAddress}`);
    }
  };

  return (
    <header className=" text-white py-20">
      <div className="container mx-auto px-4">
        <ElasticTitle title="Explorer" />
        <div className="max-w-3xl mx-auto mt-4">
          <div className="flex items-center bg-white rounded-full p-1 mb-8">
            <input
              onChange={(e) => setUserAddress(e.target.value)}
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-gray-900 focus:outline-none"
              placeholder="Search blocks / transactions / wallets"
            />
            <button
              onClick={handleSubmit}
              className="bg-gray-500 text-white rounded-full p-2 py-2 px-6 border-none hover:bg-gray-600 transition"
            >
              <CiSearch className="text-xl" />
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/about"
              className="flex items-center justify-center bg-white text-black p-2 w-48 rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out group"
            >
              Documentation
              <FaArrowRight className="ml-3 p-2 bg-gray-700  text-white text-4xl rounded-full group-hover:bg-black group-hover:-rotate-45 transition duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
