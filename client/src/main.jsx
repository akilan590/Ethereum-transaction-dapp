import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext"; // ✅ Make sure it's singular

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
);
