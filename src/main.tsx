import React from "react";
import ReactDOM from "react-dom/client";
import WendellPortfolio from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <WendellPortfolio />
    </LanguageProvider>
  </React.StrictMode>,
);
