import React from 'react';
import { FaWallet, FaExchangeAlt, FaCubes, FaLock, FaInfoCircle, FaChartLine, FaUserFriends, FaGlobe } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiGo } from 'react-icons/si';
import ElasticTitle from '../../Components/ElasticTitle';

const About: React.FC = () => {
  return (
    <div className="text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ElasticTitle title='BlockSimulate &nbsp; Documentation'/>
        
        <div className="bg-gray-900 rounded-xl shadow-2xl p-8 mb-12 mt-12">
          <h2 className="text-3xl font-bold mb-4">About BlockSimulate</h2>
          <p className="text-lg leading-relaxed">
            <span className="font-semibold text-blue-400">BlockSimulate</span> is a web application designed to provide a simplified, interactive experience of blockchain technology. Built with ReactJS, Tailwind CSS, and Go, the project aims to educate users about core blockchain concepts without the complexities of real-world implementations.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { icon: <FaWallet />, title: "User-friendly interface", description: "Intuitive interface for easy blockchain interaction" },
              { icon: <FaWallet />, title: "Wallet creation", description: "Simple virtual wallet creation process" },
              { icon: <FaExchangeAlt />, title: "Transaction management", description: "Send and receive simulated cryptocurrency" },
              { icon: <FaCubes />, title: "Blockchain exploration", description: "Visualize and explore the blockchain structure" },
              { icon: <FaLock />, title: "Transparency", description: "Public access to all transactions and block data" },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700">
                <div className="text-3xl mb-4 text-blue-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
          <div className="flex justify-center space-x-12">
            {[
              { icon: <SiReact />, name: "ReactJS", color: "text-blue-400" },
              { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-teal-400" },
              { icon: <SiGo />, name: "Go", color: "text-cyan-400" },
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`text-5xl mb-3 ${tech.color}`}>{tech.icon}</div>
                <span className="text-lg">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Blockchain Fundamentals</h2>
          <div className="bg-gray-900 rounded-xl p-8">
            <p className="mb-6 text-lg">
              <span className="font-semibold text-blue-400">Blockchain</span> is a distributed, immutable ledger that records transactions across multiple computers. It is a core technology underlying cryptocurrencies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { term: "Block", definition: "A collection of transactions grouped together and added to the blockchain." },
                { term: "Transaction", definition: "Represents the transfer of value from one wallet to another." },
                { term: "Hash", definition: "A unique digital fingerprint of data used to verify integrity." },
                { term: "Public Key", definition: "A cryptographic key that can be shared publicly." },
                { term: "Private Key", definition: "A secret cryptographic key that proves ownership of a wallet." },
                { term: "Wallet", definition: "A digital interface for managing cryptocurrency holdings." },
              ].map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">{item.term}</h3>
                  <p>{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How BlockSimulate Works</h2>
          <div className="bg-gray-900 rounded-xl p-8">
            <ol className="list-decimal list-inside space-y-4">
              {[
                "Wallet Creation: Users generate a new wallet pair (public and private key).",
                "Transaction Initiation: Users initiate a transaction by specifying recipient, amount, and signing.",
                "Transaction Verification: The transaction is broadcast and verified by other nodes.",
                "Block Creation: Verified transactions are collected into a new block.",
                "Blockchain Update: The new block is added to the end of the blockchain.",
              ].map((step, index) => (
                <li key={index} className="text-lg">{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How to Use BlockSimulate</h2>
          <div className="bg-gray-900 rounded-xl p-8">
            <p className="mb-6 text-lg">
              Experience the blockchain simulation easily on your own or with friends:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUserFriends className="mr-2 text-purple-400" /> Share with Friends
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Share the project URL: <a href='https://block-simulate.vercel.app/' target='_blank' className="text-blue-400">https://block-simulate.vercel.app/</a></li>
                  <li>Each friend creates their own wallet</li>
                  <li>Transfer and receive coins between wallets</li>
                  <li>Explore the blockchain together</li>
                </ol>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaGlobe className="mr-2 text-green-400" /> Solo Exploration
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Open the project in your main browser</li>
                  <li>Open an incognito window or another browser</li>
                  <li>Create wallets in both windows</li>
                  <li>Simulate transactions between your wallets</li>
                  <li>Observe how the blockchain updates</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaInfoCircle className="mr-2 text-yellow-400" /> Limitations
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Simulated Currency: No real-world value</li>
                <li>Limited Functionality: Focuses on core concepts</li>
                <li>Single Node: Operates on a single node for simplicity</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaChartLine className="mr-2 text-green-400" /> Future Enhancements
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Implement a multi-node network</li>
                <li>Introduce mining or proof-of-stake mechanisms</li>
                <li>Develop smart contract functionality</li>
                <li>Integrate additional blockchain features</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center text-gray-400 mt-16">
          <p>This document provides a high-level overview of the BlockSimulate project.</p>
        </div>
      </div>
    </div>
  );
};

export default About;