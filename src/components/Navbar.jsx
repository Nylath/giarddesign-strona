import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import giardDesignLogo from "../assets/logo/giarddesign.svg";

const mainLinks = [
  {
    href: "#o-firmie",
    label: "O firmie",
  },
  {
    href: "#realizacje",
    label: "Realizacje",
  },
  {
    href: "#kontakt",
    label: "Kontakt",
  },
];

const offerLinks = [
  {
    href: "#projekty",
    label: "Projekty",
  },
  {
    href: "#wizualizacje",
    label: "Wizualizacje",
  },
  {
    href: "#realizacje-oferta",
    label: "Realizacje",
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef(null);
  const navigationRef = useRef(null);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const closeNavigation = () => {
    setIsMenuOpen(false);
    setIsOfferOpen(false);
  };

  const closeAllMenus = () => {
    closeNavigation();
    closeSearch();
  };

  const toggleMainMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
    setIsOfferOpen(false);
    closeSearch();
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    closeNavigation();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const normalizedValue = searchValue.trim();

    if (!normalizedValue) {
      return;
    }

    console.log("Wyszukiwana fraza:", normalizedValue);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  };

  const handleOfferBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOfferOpen(false);
    }
  };

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handleClickOutsideSearch = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    };

    document.addEventListener(
      "pointerdown",
      handleClickOutsideSearch,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutsideSearch,
      );
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutsideMenu = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        closeNavigation();
      }
    };

    document.addEventListener(
      "pointerdown",
      handleClickOutsideMenu,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutsideMenu,
      );
    };
  }, [isMenuOpen]);

  return (
    <header id="top" className="navbar">
      <div className="navbar__inner">
        <a
          href="#top"
          className="navbar__logo"
          aria-label="GiardDesign — strona główna"
          onClick={closeAllMenus}
        >
          <img
            src={giardDesignLogo}
            alt="GiardDesign"
            className="navbar__logo-image"
          />
        </a>

        <nav
          ref={navigationRef}
          className={`navbar__navigation ${
            isSearchOpen ? "navbar__navigation--search-open" : ""
          }`}
          aria-label="Główna nawigacja"
        >
          <ul
            id="main-navigation"
            className={`navbar__links ${
              isMenuOpen ? "navbar__links--open" : ""
            }`}
          >
            <li
              className={`navbar__offer-item ${
                isOfferOpen ? "navbar__offer-item--open" : ""
              }`}
              onMouseEnter={() => setIsOfferOpen(true)}
              onMouseLeave={() => setIsOfferOpen(false)}
              onFocus={() => setIsOfferOpen(true)}
              onBlur={handleOfferBlur}
            >
              <button
                type="button"
                className="navbar__link navbar__link--offer"
                aria-expanded={isOfferOpen}
                aria-controls="offer-submenu"
                onClick={() =>
                  setIsOfferOpen((currentState) => !currentState)
                }
              >
                Oferta

                <svg
                  className="navbar__chevron"
                  viewBox="0 0 12 8"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.5 6 6.5l5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <ul
                id="offer-submenu"
                className={`navbar__dropdown ${
                  isOfferOpen ? "navbar__dropdown--open" : ""
                }`}
                aria-label="Kategorie oferty"
              >
                {offerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="navbar__dropdown-link"
                      onClick={closeAllMenus}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                <li className="navbar__dropdown-separator">
                  <a
                    href="#oferta"
                    className="navbar__dropdown-link navbar__dropdown-link--all"
                    onClick={closeAllMenus}
                  >
                    Zobacz całą ofertę

                    <svg
                      className="navbar__dropdown-arrow"
                      viewBox="0 0 24 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 8h20M15 2l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>

            {mainLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={closeAllMenus}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <form
            ref={searchRef}
            className={`navbar__search ${
              isSearchOpen ? "navbar__search--open" : ""
            }`}
            role="search"
            onSubmit={handleSearchSubmit}
            onKeyDown={handleSearchKeyDown}
          >
            <button
              type="button"
              className="navbar__search-button"
              aria-label="Otwórz wyszukiwarkę"
              aria-expanded={isSearchOpen}
              onClick={openSearch}
            >
              <svg
                className="navbar__search-icon"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="m18.5 18.5 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {isSearchOpen && (
              <>
                <label
                  htmlFor="navbar-search-input"
                  className="navbar__search-label"
                >
                  Wyszukaj na stronie
                </label>

                <input
                  id="navbar-search-input"
                  type="search"
                  className="navbar__search-input"
                  placeholder="Znajdź inspirację"
                  value={searchValue}
                  autoComplete="off"
                  autoFocus
                  onChange={(event) =>
                    setSearchValue(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="navbar__search-close"
                  aria-label="Zamknij wyszukiwarkę"
                  onClick={closeSearch}
                >
                  <span />
                  <span />
                </button>
              </>
            )}
          </form>

          <button
            type="button"
            className={`navbar__menu-button ${
              isMenuOpen ? "navbar__menu-button--open" : ""
            }`}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={toggleMainMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;