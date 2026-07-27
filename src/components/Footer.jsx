import "./Footer.css";

import giardDesignFooterLogo from "../assets/logo/giarddesign-2.svg";
import adRespectLogo from "../assets/logo/adrespect.svg";

const socialLinks = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <a
            href="#top"
            className="footer__logo-link"
            aria-label="GiardDesign — przejdź na początek strony"
          >
            <img
              src={giardDesignFooterLogo}
              alt="GiardDesign"
              className="footer__logo"
            />
          </a>

          <div className="footer__contact">
            <p className="footer__contact-text">
              Daj znać, co możemy dla Ciebie zrobić!
            </p>

            <a href="#kontakt" className="footer__contact-button">
              Skontaktuj się z nami
            </a>
          </div>
        </div>

        <div className="footer__middle">
          <nav
            className="footer__navigation"
            aria-label="Nawigacja w stopce"
          >
            <a href="#kontakt" className="footer__link">
              Kontakt
            </a>

            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer__details">
            <a href="tel:+48000000000" className="footer__link">
              000-000-000
            </a>

            <a
              href="mailto:giarddesign@kontakt.pl"
              className="footer__link"
            >
              giarddesign@kontakt.pl
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Prawa zastrzeżone © 2022
          </p>

          <a
            href="https://adrespect.pl/"
            className="footer__author"
            target="_blank"
            rel="noreferrer"
            aria-label="Strona wykonana przez adRespect"
          >
            <span className="footer__author-label">made by</span>

            <img
              src={adRespectLogo}
              alt="adRespect"
              className="footer__author-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;