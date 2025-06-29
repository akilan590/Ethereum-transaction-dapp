import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-col w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-sm sm:text-base break-words">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-sm sm:text-base break-words">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-sm sm:text-base">
            Amount: {amount} ETH
          </p>
          {message && (
            <p className="text-white text-sm sm:text-base mt-1">
              Message: {message}
            </p>
          )}
        </div>

        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-2 px-4 w-max rounded-3xl -mt-5 shadow-lg">
          <p className="text-[#37c7da] font-medium text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          {currentAccount
            ? "Latest Transactions"
            : "Connect your wallet to see the latest transactions"}
        </h3>

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions].reverse().map((tx, i) => (
            <TransactionsCard key={i} {...tx} />
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="w-full flex justify-center items-center mt-10">
            <p className="text-white text-base">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
