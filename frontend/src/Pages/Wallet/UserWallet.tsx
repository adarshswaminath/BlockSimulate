import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_DOMAIN } from '../../constants';
import { FaArrowDown, FaArrowUp, FaCopy } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import { IoCloseSharp } from 'react-icons/io5';

interface UserWalletProps {
    publicKey: string;
}

const UserWallet: React.FC<UserWalletProps> = ({ publicKey }) => {
    const [userBalance, setUserBalance] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const getAddressDetails = async () => {
        try {
            const req = await axios.get(`${BACKEND_DOMAIN}/account-details/${publicKey}`);
            setUserBalance(req.data.balance);
            console.log(req.data);
        } catch (error) {
            console.error('Error fetching address details:', error);
        }
    };

    useEffect(() => {
        getAddressDetails();
    }, [publicKey]);

    const copyPublicKey = () => {
        navigator.clipboard.writeText(publicKey);
        alert('Public key copied to clipboard!');
    };

    return (
        <div className='container mx-auto px-4 mt-16'>
            <div className='bg-gray-800 rounded-lg shadow-lg p-6'>
                <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
                   <div>
                   <h1 className='text-4xl font-bold text-white mb-4 md:mb-0'>
                        {userBalance !== null ? `${userBalance.toFixed(2)} BCS` : 'Loading...'}
                    </h1>
                    <span className='badge mb-2'>{publicKey.slice(1,26)}...</span>
                   </div>

                    <div className='mt-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full'
                        >
                            <FaArrowDown className='mr-2' /> Receive
                        </button>
                        <button
                            onClick={() => alert('Send feature is not implemented yet.')}
                            className='ml-3 btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full'
                        >
                            <FaArrowUp className='mr-2' /> Send
                        </button>
                    </div>
                    
                </div>
            </div>

            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                        <div className='flex justify-between items-center border-b pb-4 mb-6'>
                            <h2 className='text-2xl font-semibold'>Receive Funds</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className='btn bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition duration-300 ease-in-out'
                            >
                                <IoCloseSharp className='text-gray-600' />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className='bg-gray-100 p-4 rounded-lg mb-6'>
                                <QRCode value={publicKey} size={200} />
                            </div>
                            <div className='w-full flex items-center mb-4'>
                                <input
                                    type='text'
                                    readOnly
                                    value={publicKey}
                                    className='border p-3 rounded-l-md flex-grow text-sm'
                                />
                                <button
                                    onClick={copyPublicKey}
                                    className='bg-black hover:bg-gray-600 text-white p-3 rounded-r-md transition duration-300 ease-in-out'
                                >
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserWallet;