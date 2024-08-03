import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_DOMAIN } from "../../constants";
import { getUsertransactions } from "../../utils";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface AccountDetails {
  balance: number;
  public_key: string;
}

interface Transaction {
  Sender: string;
  Receiver: string;
  Amount: number;
  Signature: string;
  Timestamp: string;
}

export default function WalletDetails() {
  const { address } = useParams<{ address: string }>();
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isValidAddress, setIsValidAddress] = useState(true);

  const fetchAccountData = async () => {
    try {
      const accountRes = await axios.get(`${BACKEND_DOMAIN}/account-details/${address}`);
      const transactionRes = await getUsertransactions();
      const filteredTransactions = transactionRes.filter((transaction: Transaction) =>
        transaction.Sender === address || transaction.Receiver === address
      );

      setAccountDetails(accountRes.data);
      setTransactions(filteredTransactions);
    } catch (err) {
      setIsValidAddress(false);
      console.error("Error Due to invalid address", err);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, [address]);

  return (
    <div className="p-6 text-white">
      {isValidAddress && <h3 className="text-3xl font-bold mb-6">Wallet Details</h3>}
      {isValidAddress ? (
        <>
          {accountDetails ? (
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">Account Details</h2>
              <p className="text-lg text-gray-200">Balance: {accountDetails.balance} BCS</p>
              <p className="text-lg text-gray-200">Public Key: {accountDetails.public_key.slice(0, 24)}...</p>
            </div>
          ) : (
            <p className="text-gray-500">Loading account details...</p>
          )}

          <div className="bg-gray-900 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Recent Transactions</h2>
            {transactions.length > 0 ? (
              <ul className="space-y-4">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.Timestamp}
                    className="bg-gray-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      <div className="bg-gray-700 p-2 rounded-full mr-4 mb-2 md:mb-0">
                        {transaction.Sender === address ? (
                          <FaArrowUp className="text-red-400" />
                        ) : (
                          <FaArrowDown className="text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-200">From: {transaction.Sender.slice(0, 24)}...</p>
                        <p className="font-semibold text-gray-200">To: {transaction.Receiver.slice(0, 24)}...</p>
                        <p className="text-sm text-gray-400">{transaction.Timestamp.slice(0, 24)}</p>
                        <span className={`font-bold lg:hidden block`}>
                          {transaction.Amount} BCS
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold hidden lg:block`}>
                        {transaction.Amount} BCS
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{transaction.Signature.slice(0, 24)}...</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No transactions found.</p>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
            <NoAddressFound/>
        </div>
      )}
    </div>
  );
}



const NoAddressFound = () => {
    return(
        <h2 className="text-center text-2xl font-bold">Invalid address requested.</h2>
    )
}