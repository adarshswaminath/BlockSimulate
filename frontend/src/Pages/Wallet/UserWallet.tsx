import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_DOMAIN } from '../../constants';
import { FaArrowDown, FaArrowUp, FaCopy, FaExchangeAlt, FaPaperPlane } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import { IoCloseSharp } from 'react-icons/io5';
import { getUsertransactions } from '../../utils';
import { useGlobalState } from '../../Context/GlobalStateContext';
import Swal from 'sweetalert2';

interface UserWalletProps {
    publicKey: string;
    privateKey: string;
}

interface Transaction {
    Sender: string;
    Receiver: string;
    Amount: number;
    Signature: string;
    Timestamp: string;
}

const UserWallet: React.FC<UserWalletProps> = ({ publicKey, privateKey }) => {
    const [userBalance, setUserBalance] = useState<number | null>(null);
    const [showReceiveModal, setShowReceiveModal] = useState<boolean>(false);
    const [showSendModal, setShowSendModal] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const { isEnabled, setIsEnabled } = useGlobalState();


    const handleSend = async () => {
        setLoading(true)
        setError(null);

        // Input validation
        if (recipientAddress === publicKey) {
            setError("You can't send BCS to your own address.");
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return;
        }

        if (userBalance !== null && amountNum > userBalance) {
            setError("Insufficient balance for this transaction.");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_DOMAIN}/transfer`, {
                sender_public_key: publicKey,
                sender_private_key: privateKey,
                receiver_public_key: recipientAddress,
                amount: amountNum
            });

            console.log(response.data)

            if (response.data) {
                setIsEnabled((prev) => !prev);
                setShowSendModal(false);
                setRecipientAddress('');
                setAmount('');
                Swal.fire("sucess", "Transaction Sucess", "success")
            } else {
                setError(response.data.message || "Transaction failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during transaction:", error);
            setError("An error occurred while processing the transaction. Please check the Recipient Address");
        } finally {
            setLoading(false)
        }
    };

    const getAddressDetails = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/account-details/${publicKey}`);
            setUserBalance(req.data.balance);
        } catch (error) {
            console.error('Error fetching address details:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const allTransactions = await getUsertransactions();
            const userTransactions = allTransactions.filter((transaction: Transaction) =>
                transaction.Sender === publicKey || transaction.Receiver === publicKey
            );
            setTransactions(userTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        getAddressDetails();
        fetchTransactions();
    }, [publicKey, isEnabled]);

    const copyPublicKey = () => {
        navigator.clipboard.writeText(publicKey);
        alert('Public key copied to clipboard!');
    };

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <div className='bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='text-center md:text-left mb-6 md:mb-0'>
                        <h1 className='text-5xl font-extrabold text-white mb-2'>
                            {userBalance !== null ? `${userBalance.toFixed(2)} BCS` : 'Loading...'}
                        </h1>
                        <span className='bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm'>
                            {publicKey.slice(0, 16)}...{publicKey.slice(-8)}
                        </span>
                    </div>
                    <div className='flex space-x-4'>
                        <button
                            onClick={() => setShowReceiveModal(true)}
                            className='btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full border-none transition duration-300 ease-in-out flex items-center'
                        >
                            <FaArrowDown className='mr-2' /> Receive
                        </button>
                        <button
                            onClick={() => setShowSendModal(true)}
                            className='btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full border-none transition duration-300 ease-in-out flex items-center'
                        >
                            <FaArrowUp className='mr-2' /> Send
                        </button>
                    </div>
                </div>
            </div>

            {showReceiveModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
                    <div className='bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md'>
                        <div className='flex justify-between items-center border-b pb-4 mb-6'>
                            <h2 className='text-2xl font-bold text-gray-200'>Receive Funds</h2>
                            <button
                                onClick={() => setShowReceiveModal(false)}
                                className='text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
                            >
                                <IoCloseSharp size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className='bg-gray-100 p-6 rounded-2xl mb-6'>
                                <QRCode value={publicKey} size={200} />
                            </div>
                            <div className='w-full flex items-center mb-4'>
                                <input
                                    type='text'
                                    readOnly
                                    value={publicKey}
                                    className='border border-gray-300 p-3 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                                <button
                                    onClick={copyPublicKey}
                                    className='bg-blue-500 hover:bg-blue-600 btn text-white p-3 rounded-r-md transition duration-300 ease-in-out'
                                >
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showSendModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
                    <div className='bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md'>
                        <div className='flex justify-between items-center border-b border-gray-700 pb-4 mb-6'>
                            <h2 className='text-2xl font-bold text-white'>Send BCS</h2>
                            <button
                                onClick={() => {
                                    setShowSendModal(false);
                                    setError(null);
                                }}
                                className='text-gray-400 hover:text-white transition duration-300 ease-in-out'
                            >
                                <IoCloseSharp size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-400 mb-1">Recipient Address</label>
                                <input
                                    type="text"
                                    id="recipient"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    className="w-full input bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter recipient's address"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">Amount (BCS)</label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full input bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.00"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}
                            <button
                                onClick={handleSend}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                            >
                                {loading ? "Please Wait..." : (
                                    <>
                                        <FaPaperPlane className="mr-2" />
                                        <span>Send BCS</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='bg-gray-900 rounded-2xl shadow-xl p-8'>
                <h2 className='text-2xl font-bold text-gray-200 mb-6'>Recent Transactions</h2>
                {transactions.length > 0 ? (
                    <ul className='space-y-4'>
                        {transactions.map((transaction) => (
                            <li key={transaction.Timestamp} className='bg-gray-800 p-4 rounded-xl flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <FaExchangeAlt className='text-blue-500 mr-4' size={24} />
                                    <div>
                                        <p className='font-semibold text-gray-200'>
                                            {transaction.Sender === publicKey ? 'Sent' : 'Received'}
                                        </p>
                                        <p className='text-sm text-gray-400'>
                                            {transaction.Timestamp}
                                        </p>
                                    </div>
                                </div>
                                <span className={`font-bold ${transaction.Sender === publicKey ? 'text-red-500' : 'text-green-500'}`}>
                                    {transaction.Sender === publicKey ? '-' : '+'}{transaction.Amount} BCS
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-gray-500 text-center'>No transactions found.</p>
                )}
            </div>
        </div>
    );
}

export default UserWallet;