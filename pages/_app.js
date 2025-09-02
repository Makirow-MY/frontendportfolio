import Footer1 from "@/components/currency";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import "@/styles/globals.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";



export default function App({ Component, pageProps }) {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isloading, setIsloading] = useState(true);
  const [statee, setState] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsloading(false);
    };
    setTimeout(handleComplete, 3000);
    return () => {
      clearTimeout(handleComplete);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 100,
      delay: 0,
      duration: 1000,
      easing: 'ease-in-out',
      mirror: false,
      once: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const colors = [
    { light: '#B90276FF', dark: '#520134FF' },
    { light: '#FFFF00', dark: '#9E9E03FF' },
    { light: '#048FF9FF', dark: '#024F8AFF' },
    { light: '#04F983FF', dark: '#01733CFF' },
    { light: '#4403F6FF', dark: '#1E026AFF' },
  ];

  const RandomNum = Math.floor(Math.random() * colors.length);
  const randomColor = colors[RandomNum];
  const [CurrentColor, setCurrentColor] = useState(RandomNum);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((pre) => (pre + 1) % colors.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--main-site-color', colors[CurrentColor].light);
    root.style.setProperty('--main-hover-color', colors[CurrentColor].dark);
    root.style.transition = '6s ease-in-out';
  }, [CurrentColor]);

  return (
    <>
      <Preloader isLoading={isloading} />
      <div style={{ position: 'absolute', top: '0%', left: 0, zIndex: 100000 }}>
        <Toaster />
      </div>
      <Header state={statee} setState={setState} />
      {!isloading && (
        <main
          onClick={() => setState(false)}
          style={{ position: 'relative' }}
          id="site-wrapper"
          onMouseMove={handleMouseMove}
        >
          <div
            className="footer-glow"
            style={{
              left: `${glowPosition.x}px`,
              top: `${glowPosition.y}px`,
            }}
          ></div>
          <Component {...pageProps} />
        </main>
      )}
      <Footer />
    </>
  );
}