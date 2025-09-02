
import "@/styles/globals.css";
import Header from "../../FORNTEND/components/Header";

export default function App({ Component, pageProps }) {

    const [language, setLanguage] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChoice = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return <>
   {!language && (
        <div className="language-selection">
          <h2>{translations.en.chooseLanguage}</h2>
          <button onClick={() => handleLanguageChoice('en')}>English</button>
          <button onClick={() => handleLanguageChoice('fr')}>Français</button>
        </div>
      )}
      
      {language && (
        <>
        {/* <Header /> */}
    <Component {...pageProps} />
      </>
      )}
 
  </>
}
