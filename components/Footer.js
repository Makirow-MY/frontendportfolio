import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [currentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <footer
      className="footer-container"
      onMouseMove={handleMouseMove}
    >
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>

      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-brand">
            <h2 className="footer-heading">{t('header.brand')}<span className="text-gradient">Tech</span></h2>
            <p className="footer-description">
              {t('footer.brand_description')}
            </p>
            
            <ul className="hero_social">
              <li>
                <Link href="https://www.facebook.com/share/1FSdz8Gfe8/">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/engineermakiayengue?utm_source=qr&igsh=YmVsbTh2b3N0aGpz">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/@Makirow_Vibe">
                  <IoLogoYoutube />
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Makirow-MY">
                  <FaGithub />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-subheading">{t('footer.explore')}</h3>
            <ul className="footer-nav">
              {[
                { name: t('header.home'), link: '/' },
                { name: t('header.projects'), link: '/projects' },
                { name: t('header.services'), link: '/services' },
                { name: t('header.blog'), link: '/blogs' },
                { name: t('header.contact'), link: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.link} className="footer-link">
                    <span className="link-underline"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-subheading">{t('footer.newsletter_title')}</h3>
            <p className="footer-newsletter-text">
              {t('footer.newsletter_description')}
            </p>
            <form className="footer-form">
              <div className="form-group">
                <input type="email" placeholder={t('footer.email_placeholder')} className="form-input" />
                <button type="submit" className="form-button">
                  <span>{t('footer.subscribe')}</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright', { year: currentYear })}
            <span className="footer-heart">
              {t('footer.made_with')} <FaHeart className="heart-icon" />
            </span>
          </p>
          
          <div className="footer-legal">
            <a href="/policy" className="legal-link">{t('footer.privacy_policy')}</a>
            <a href="/terms" className="legal-link">{t('footer.terms_of_service')}</a>
          </div>
        </div>
      </div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;