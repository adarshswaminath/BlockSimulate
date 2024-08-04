import { useEffect, useState } from "react";
import { getUsertransactions } from "../../utils";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import ElasticTitle from "../../Components/ElasticTitle";

interface Transaction {
  Sender: string;
  Receiver: string;
  Amount: number;
  Signature: string;
  Timestamp: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<'date' | 'amount' | 'sender' | 'receiver'>('date');

  const fetchTransactions = async () => {
    const allTransactions = await getUsertransactions();
    setTransactions(allTransactions);
    setFilteredTransactions(allTransactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [searchQuery, searchCriteria, transactions]);

  const filterTransactions = () => {
    const query = searchQuery.toLowerCase();
    const filtered = transactions?.filter(transaction => {
      switch (searchCriteria) {
        case 'date':
          return transaction.Timestamp.toLowerCase().includes(query);
        case 'amount':
          return transaction.Amount.toString().includes(query);
        case 'sender':
          return transaction.Sender.toLowerCase().includes(query);
        case 'receiver':
          return transaction.Receiver.toLowerCase().includes(query);
        default:
          return true;
      }
    });
    setFilteredTransactions(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mt-4 mb-6">
        <ElasticTitle title="All &nbsp; Transactions"/>
      </div>
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8">
        {/* Search Bar */}
        <div className="mb-6 flex space-x-4">
          <input
            type="text"
            placeholder={`Search by ${searchCriteria}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full input"
          />
          <select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value as 'date' | 'amount' | 'sender' | 'receiver')}
            className="select border p-2 rounded-md w-44 h-[3rem]"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
          </select>
        </div>

        {filteredTransactions?.length > 0 ? (
          <ul className="space-y-4">
            {filteredTransactions?.map((transaction) => (
              <li
                key={transaction.Timestamp}
                className="bg-gray-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="bg-gray-700 p-2 rounded-full mr-4 mb-2 md:mb-0">
                    {transaction.Amount > 0 ? (
                      <FaArrowDown className="text-green-400" />
                    ) : (
                      <FaArrowUp className="text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">From: {transaction.Sender.slice(0, 24)}...</p>
                    <p className="font-semibold text-gray-200">To: {transaction.Receiver.slice(0, 24)}...</p>
                    <p className="text-sm text-gray-400">{transaction.Timestamp.slice(0, 24)}</p>
                    <span
                      className={`font-bold lg:hidden block`}
                    >
                      {transaction.Amount} BCS
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold hidden lg:block`}
                  >
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
    </div>
  );
}
