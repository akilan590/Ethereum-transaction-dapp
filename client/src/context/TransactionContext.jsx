import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const createEthereumContract = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.warn("MetaMask not installed.");
    return null;
  }

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner(); // Ethers v6 requires await
  const contract = new ethers.Contract(contractAddress.trim(), contractABI, signer);
  return contract;
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount") || 0);
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value.trimStart() }));
  };

  const getAllTransactions = async () => {
    try {
      const contract = await createEthereumContract();
      if (!contract) return;

      const txs = await contract.getAllTransactions();
      const formatted = txs.map((tx) => ({
        addressTo: tx.receiver,
        addressFrom: tx.sender,
        timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
        message: tx.message,
        keyword: tx.keyword,
        amount: Number(tx.amount) / 1e18,
      }));

      setTransactions(formatted);
    } catch (err) {
      console.error("Failed to get transactions:", err);
    }
  };

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0].trim());
        await getAllTransactions();
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      const contract = await createEthereumContract();
      if (!contract) return;

      const txCount = await contract.getTransactionCount();
      const count = Number(txCount);
      setTransactionCount(count);
      localStorage.setItem("transactionCount", count.toString());
    } catch (err) {
      console.error("Error checking transaction count:", err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0].trim());
      window.location.reload();
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const sendTransaction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask.");

      let { addressTo, amount, keyword, message } = formData;
      addressTo = addressTo.trim();
      keyword = keyword.trim();
      message = message.trim();

      if (!ethers.isAddress(addressTo)) {
        return alert("Invalid Ethereum address");
      }

      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount.toString(16),
          },
        ],
      });

      const contract = await createEthereumContract();
      const txHash = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      await txHash.wait();
      setIsLoading(false);

      const txCount = await contract.getTransactionCount();
      setTransactionCount(Number(txCount));
      window.location.reload();
    } catch (err) {
      console.error("Error sending transaction:", err);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    checkIfTransactionsExists();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
