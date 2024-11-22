import React, { useState } from "react";
import "./App.css";
import About from "./components/About/About";
import Navigate from "./components/Navigate/Navigate";
import { WelcomeToPage } from "./components/WelcomeToPage/WelcomeToPage";
import Us from "./components/Us/Us";
import Contact from "./components/Contact/Contact";
import Products from "./components/Products/Products";

const App = () => {
  const [showPage, setShowPage] = useState(false);

  const handleShowPage = () => {
    setShowPage(true);
  };

  return (
    <>
      {!showPage && <WelcomeToPage onSiteClick={handleShowPage} />}
      {showPage && (
        <>
          <Navigate />
          <About id="us" />
          <Us />
          <Products />
          <Contact />
        </>
      )}
    </>
  );
};

export default App;
