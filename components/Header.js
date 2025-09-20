import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';

export default function Header({ state, setState }) {
  const { t, i18n } = useTranslation();
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isVisible, setIsVisible] = useState(false);
setTimeout(() => {
   toast.dismiss();
}, 3000);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 60) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem('darkmode') === 'true';
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('darkmode', true);
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkmode', false);
    }
  }, [dark]);

  const ToggleMode = () => {
    setDark(!dark);
  };

  useEffect(() => {
    setMobile(state);
  }, [state]);

  const handlehandbugar = () => {
    setMobile(!mobile);
    setState(!state);
  };

  const router = useRouter();
  useEffect(() => {
    const { pathname } = router;
    const parts = pathname.split('/');
    if (parts.length > 2) {
      const result = `/${parts[1]}`;
      setActiveLink(result);
    } else {
      setActiveLink(router.pathname);
    }
  }, [router]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  return (
    <header className={isVisible ? 'sticky' : ''}>
      <nav className="container flex flex-sb">
        <h2 className="footer-heading">{t('header.brand')} <span className="text-gradient"></span></h2>

        <div className="navlist flex gap-2">
          <ul className="flex gap-2 flex-left">
            <li>
              <Link href="/" onClick={() => setActiveLink('/')} className={activeLink === '/' ? "active" : ''}>
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setActiveLink('/services')} className={activeLink === '/services' ? "active" : ''}>
                {t('header.services')}
              </Link>
            </li>
            <li>
              <Link href="/projects" onClick={() => setActiveLink('/projects')} className={activeLink === '/projects' ? "active" : ''}>
                {t('header.projects')}
              </Link>
            </li>
            <li>
              <Link href="/blogs" onClick={() => setActiveLink('/blogs')} className={activeLink === '/blogs' ? "active" : ''}>
                {t('header.blog')}
              </Link>
            </li>
          </ul>

          {/* <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="language-selector"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select> */}

          <div onClick={ToggleMode} className="darkmodetoggle">
            {dark ? <FaMoon /> : <FaSun />}
          </div>

          <button>
            <Link href="/contact">{t('header.hire_me')}</Link>
          </button>
          <div className={`mobiletogglesvg ${mobile ? "hide" : ""}`} onClick={handlehandbugar}>
            <HiMiniBars3BottomRight />
          </div>
        </div>

        <div onClick={() => { setMobile(false); setState(false); }} className={`mobilenavlist ${mobile ? "active" : ""}`}>
          <h2 className="footer-heading">{t('header.brand')}<span className="text-gradient">Tech</span></h2>
          
          <ul onClick={() => { setMobile(false); setState(false); }} className="flex gap-1 flex-col flex-left mt-2">
            <li>
              <Link href="/" onClick={() => setActiveLink('/')} className={activeLink === '/' ? "active" : ''}>
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setActiveLink('/services')} className={activeLink === '/services' ? "active" : ''}>
                {t('header.services')}
              </Link>
            </li>
            <li>
              <Link href="/projects" onClick={() => setActiveLink('/projects')} className={activeLink === '/projects' ? "active" : ''}>
                {t('header.projects')}
              </Link>
            </li>
            <li>
              <Link href="/blogs" onClick={() => setActiveLink('/blogs')} className={activeLink === '/blogs' ? "active" : ''}>
                {t('header.blog')}
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setActiveLink('/contact')} className={activeLink === '/contact' ? "active" : ''}>
                {t('header.contact')}
              </Link>
            </li>
          </ul>

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="language-selector mobile"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>

          <p onClick={() => { setMobile(false); setState(false); }}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </nav>
    </header>
  );
}