import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import Navigate from "./components/Navigate/Navigate";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import History from "./components/History/History";
import Professionals from "./components/Professionals/Professionals";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { startScrollScenes } from "./motion/scrollScenes";

// El chat no es necesario para el primer pintado: va en un chunk aparte y se monta
// recién en el cliente, cuando el navegador queda libre.
const Chatbot = lazy(() => import("./components/Chatbot/Chatbot"));

function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setIdle(true), { timeout: 3000 });
    return () => cancel(id);
  }, []);
  return idle;
}

// useLayoutEffect avisa al prerenderizar en Node; allí no hay nada que medir.
const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function App() {
  useClientLayoutEffect(() => startScrollScenes(), []);
  const idle = useIdle();

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
      {idle && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}
    </>
  );
}
