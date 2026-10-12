import { useLayoutEffect } from "react";
import Navigate from "./components/Navigate/Navigate";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import History from "./components/History/History";
import Professionals from "./components/Professionals/Professionals";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import { startScrollScenes } from "./motion/scrollScenes";

export default function App() {
  useLayoutEffect(() => startScrollScenes(), []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navigate />
      <main>
        <Hero />
        <Stats />
        <History />
        <Professionals />
        <Brands />
        <Products />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
