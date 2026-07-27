import { useEffect, useRef, useState } from "react";
import "./Offer.css";

import pencilBody from "../assets/icons/pencil-body.png";
import pencilSparkle from "../assets/icons/pencil-sparkle.png";
import eyeIcon from "../assets/icons/eye.png";
import starsLeft from "../assets/icons/stars-left.png";
import starsRight from "../assets/icons/stars-right.png";
import starsBottom from "../assets/icons/stars-bottom.png";
import starsDots from "../assets/icons/stars-dots.png";

const offers = [
  {
    id: "projekty",
    modifier: "projects",
    title: "Projekty",
    description:
      "Zaprojektujemy Twój ogród w nowoczesnym stylu i z najlepszym wykorzystaniem istniejącej przestrzeni.",
    linkText: "Dowiedz się więcej",
    ariaLabel: "Dowiedz się więcej o projektach",
    icon: (
      <span
        className="offer-card__icon offer-card__icon--pencil"
        aria-hidden="true"
      >
        <img
          src={pencilBody}
          alt=""
          className="offer-card__icon-layer offer-card__pencil-body"
        />

        <img
          src={pencilSparkle}
          alt=""
          className="offer-card__icon-layer offer-card__pencil-sparkle"
        />
      </span>
    ),
  },
  {
    id: "wizualizacje",
    modifier: "visualizations",
    title: "Wizualizacje",
    description:
      "Przedstawimy Ci projekty koncepcyjne w postaci wirtualnego spaceru animowanego w technologii 3D.",
    linkText: "Dowiedz się więcej",
    ariaLabel: "Dowiedz się więcej o wizualizacjach",
    icon: (
      <span
        className="offer-card__icon offer-card__icon--eye"
        aria-hidden="true"
      >
        <img
          src={eyeIcon}
          alt=""
          className="offer-card__icon-layer offer-card__eye-image"
        />
      </span>
    ),
  },
  {
    id: "realizacje-oferta",
    modifier: "realizations",
    title: "Realizacje",
    description:
      "Zrealizujemy Twoje marzenie przy użyciu najnowszych rozwiązań i zaawansowanych technologii.",
    linkText: "Zobacz nasze realizacje",
    ariaLabel: "Zobacz nasze realizacje",
    icon: (
      <span
        className="offer-card__icon offer-card__icon--stars"
        aria-hidden="true"
      >
        <img
          src={starsDots}
          alt=""
          className="offer-card__icon-layer offer-card__star offer-card__star--dots"
        />

        <img
          src={starsLeft}
          alt=""
          className="offer-card__icon-layer offer-card__star offer-card__star--left"
        />

        <img
          src={starsRight}
          alt=""
          className="offer-card__icon-layer offer-card__star offer-card__star--right"
        />

        <img
          src={starsBottom}
          alt=""
          className="offer-card__icon-layer offer-card__star offer-card__star--bottom"
        />
      </span>
    ),
  },
];

function CardArrow() {
  return (
    <svg
      className="offer-card__arrow"
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
  );
}

function Offer() {
  const cardsRef = useRef([]);
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = { ...current };

          entries.forEach((entry) => {
            next[entry.target.dataset.card] = entry.isIntersecting;
          });

          return next;
        });
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="oferta"
      className="offer"
      aria-labelledby="offer-title"
    >
      <div className="offer__container">
        <header className="offer__header">
          <p className="offer__eyebrow">Oferta</p>

          <h2 id="offer-title" className="offer__title">
            Działamy <em>kompleksowo</em>
          </h2>

          <p className="offer__description">
            Oferujemy kompletną obsługę inwestycji terenów zielonych.
            Projektujemy nowoczesne ogrody przydomowe oraz rezydencjonalne.
            Stworzymy dla Ciebie projekt, zwizualizujemy go i wcielimy w życie,
            a na każdym etapie posłużymy radą i wieloletnim doświadczeniem.
          </p>
        </header>

        <div className="offer__cards">
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              id={offer.id}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              data-card={offer.id}
              type="button"
              className={`offer-card offer-card--${offer.modifier} ${
                visibleCards[offer.id] ? "offer-card--visible" : ""
              }`}
              aria-label={offer.ariaLabel}
            >
              <div className="offer-card__main">
                {offer.icon}

                <h3 className="offer-card__title">
                  {offer.title}
                </h3>

                <p className="offer-card__description">
                  {offer.description}
                </p>
              </div>

              <span className="offer-card__link">
                {offer.linkText}
                <CardArrow />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Offer;