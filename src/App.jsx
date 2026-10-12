import Navigate from "./components/Navigate/Navigate";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import History from "./components/History/History";
import Professionals from "./components/Professionals/Professionals";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

export default function App() {
  return (
    <>
      <Navigate />
      <main>
        <Hero />
        <Stats />
        <History />
        <Professionals />
        <Products />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
