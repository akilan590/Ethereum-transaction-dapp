# ⚡ ethereum-transaction-dapp

A modern, full-stack **Ethereum Transaction DApp** built with **Solidity**, **React.js**, **Tailwind CSS**, and **Ethers.js**. This decentralized application allows users to seamlessly send Ethereum transactions with custom messages and keywords—and enhances each transaction with dynamically fetched GIFs using the Giphy API.

---

## 🧠 About The Project

Most DApps stop at just sending ETH. This project goes a step further by **enriching each transaction** with a human-friendly touch: messages, keywords, and visuals. It creates a better user experience and introduces clean architecture practices using React Context API, loading states, and address formatting.

This DApp:
- Connects securely to MetaMask
- Lets users send ETH to any wallet address
- Records each transaction to a Solidity smart contract
- Uses keywords to fetch relevant GIFs for visual context
- Displays all transactions with rich data and a stylish UI

---

## 🎥 Live Demo & Screenshots

> 🚧 Live demo coming soon  
> 📸 Example UI:
> ![Demo Screenshot](./screenshot.png)

---
📜 Smart Contract Overview
Transactions.sol

addToBlockchain(address, amount, message, keyword)
Adds a transaction with metadata to storage and emits an event.

getAllTransactions()
Returns all transactions stored on-chain.

getTransactionCount()
Returns the number of recorded transactions.

🧪 Example Transaction
Field	Value
To	0xABC123...
Amount	0.01 ETH
Message	Thanks for the coffee ☕
Keyword	coffee
Result	Displays a coffee-related GIF + logs TX on Sepolia


✅ Best Practices Used
🧠 Context API for scalable state management

⚛️ Functional React Components with hooks

📡 Ethers.js v6+ contract interaction

🔐 ENS and address validation to avoid MetaMask bugs

📦 Modular file organization

🙋‍♂️ 
Akilan N.
Frontend + Blockchain Developer
🔗 LinkedIn
📦 GitHub: @akilan590
## 🚀 Features

- 🔗 **MetaMask integration** – Secure wallet connection
- 💸 **Send Ethereum** – Transfer ETH with metadata
- 🧾 **Smart contract integration** – Custom Solidity contract deployed on Sepolia
- 🖼️ **Giphy API support** – Dynamic GIF rendering based on transaction keyword
- 🕒 **Timestamps** – Human-readable transaction times
- 🧾 **Transaction history** – View previous blockchain interactions
- 🔒 **Input validation** – Prevent invalid addresses and empty inputs
- ⚛️ **React Context** – Shared state management across components
- 🎨 **Responsive UI** – Built with Tailwind CSS for modern design
- 💾 **LocalStorage caching** – Remembers last known transaction count

---

## 🛠 Tech Stack

| Layer        | Tools & Libraries                              |
|--------------|------------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Vite                   |
| Blockchain   | Solidity, Hardhat, Ethers.js                   |
| Wallet       | MetaMask                                       |
| Backend (SC) | Ethereum Smart Contract (Sepolia Testnet)      |
| API          | Giphy Developer API                            |
| Utilities    | React Context, Custom Hooks, ENS Protection    |

---

## 📂 Project Structure

ethereum-transaction-dapp/
│
├── client/ # Frontend Application
│ ├── src/
│ │ ├── components/ # UI components (Navbar, Welcome, Loader, etc.)
│ │ ├── context/ # React Context for transactions
│ │ ├── hooks/ # Custom GIF fetch hook
│ │ ├── utils/ # Constants, helper functions
│ │ ├── App.jsx # Root React component
│ │ └── main.jsx # Entry point
│ └── index.html # Main HTML shell
│
├── smart_contract/ # Blockchain Backend
│ ├── contracts/Transactions.sol # Smart contract logic
│ ├── scripts/deploy.js # Deployment script using Hardhat
│ └── hardhat.config.js # Hardhat config
│
└── README.md # Project documentation

