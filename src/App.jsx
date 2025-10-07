import React, { useEffect, useState } from "react";
import "./App.css";
import About from "./components/About/About";
import Navigate from "./components/Navigate/Navigate";
import { WelcomeToPage } from "./components/WelcomeToPage/WelcomeToPage";
import Us from "./components/Us/Us";
import Contact from "./components/Contact/Contact";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
const App = () => {
  const [showPage, setShowPage] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setShowPage(true);
    }, 1000);
  },[])

  return (
    <>
      {!showPage && <WelcomeToPage />}
      {showPage && (
        <>
          <Navigate />
          <About id="us" />
          <Us />
          <Products />
          <Contact />
          <Footer />
          <Chatbot />
        </>
      )}
    </>
  );
};

export default App;
