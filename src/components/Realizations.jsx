import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "./Realizations.css";

import realization1 from "../assets/realizations/realization-1.jpg";
import realization2 from "../assets/realizations/realization-2.jpg";
import realization3 from "../assets/realizations/realization-3.jpg";
import realization4 from "../assets/realizations/realization-4.jpg";
import realization5 from "../assets/realizations/realization-5.jpg";
import realization6 from "../assets/realizations/realization-6.jpg";
import realization7 from "../assets/realizations/realization-7.jpg";
import realization8 from "../assets/realizations/realization-8.jpg";
import realization9 from "../assets/realizations/realization-9.jpg";
import realization10 from "../assets/realizations/realization-10.png";
import realization11 from "../assets/realizations/realization-11.png";
import realization12 from "../assets/realizations/realization-12.png";

const projects = [
  {
    src: realization1,
    alt: "Nowoczesny ogród z roślinnością przy schodach",
  },
  {
    src: realization2,
    alt: "Taras z basenem przy nowoczesnym domu",
  },
  {
    src: realization3,
    alt: "Pergola obsadzona czerwonymi kwiatami",
  },
  {
    src: realization4,
    alt: "Oczko wodne z kolorowymi rybami koi",
  },
  {
    src: realization5,
    alt: "Ścieżka ogrodowa wśród tropikalnej roślinności",
  },
  {
    src: realization6,
    alt: "Nowoczesna konstrukcja tarasowa przy domu",
  },
  {
    src: realization7,
    alt: "Przestrzeń ogrodowa z drewnianą zabudową",
  },
  {
    src: realization8,
    alt: "Minimalistyczne patio z drzewem",
  },
  {
    src: realization9,
    alt: "Drewniana pergola nad tarasem",
  },
  {
    src: realization10,
    alt: "Ścieżka z płyt prowadząca do tarasu",
  },
  {
    src: realization11,
    alt: "Drewniany taras obok oczka wodnego",
  },
  {
    src: realization12,
    alt: "Jasny ogród z oczkiem wodnym",
  },
];

const breakpointColumns = {
  default: 3,
  900: 2,
  600: 1,
};

function Realizations() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isLightboxOpen = selectedIndex !== null;

  const changeImage = (direction) => {
    setSelectedIndex((currentIndex) => {
      return (
        currentIndex +
        direction +
        projects.length
      ) % projects.length;
    });
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        changeImage(1);
      }

      if (event.key === "ArrowLeft") {
        changeImage(-1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <>
      <section
        id="realizacje"
        className="realizations"
        aria-labelledby="realizations-title"
      >
        <div className="realizations__container">
          <header className="realizations__header">
            <p className="realizations__eyebrow">
              Realizacje
            </p>

            <h2
              id="realizations-title"
              className="realizations__title"
            >
              Nasze <em>projekty</em>
            </h2>
          </header>

          <div
            id="realizations-gallery"
            className={`realizations__gallery ${
              isExpanded
                ? "realizations__gallery--expanded"
                : "realizations__gallery--collapsed"
            }`}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="realizations__grid"
              columnClassName="realizations__grid-column"
            >
              {projects.map((project, index) => (
                <button
                  key={project.src}
                  type="button"
                  className="realizations__item"
                  aria-label={`Otwórz zdjęcie: ${project.alt}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={project.src}
                    alt={project.alt}
                    className="realizations__image"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </Masonry>

            {!isExpanded && (
              <div className="realizations__fade">
                <button
                  type="button"
                  className="realizations__more-button"
                  aria-expanded="false"
                  aria-controls="realizations-gallery"
                  onClick={() => setIsExpanded(true)}
                >
                  Rozwiń

                  <svg
                    className="realizations__more-icon"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3v11M5 10l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="realizations__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria realizacji"
          onClick={closeLightbox}
        >
          <div
            className="realizations__lightbox-counter"
            aria-live="polite"
          >
            {selectedIndex + 1}/{projects.length}
          </div>

          <button
            type="button"
            className="realizations__lightbox-close"
            aria-label="Zamknij galerię"
            onClick={closeLightbox}
          >
            <span />
            <span />
          </button>

          <button
            type="button"
            className="realizations__lightbox-nav realizations__lightbox-nav--prev"
            aria-label="Poprzednie zdjęcie"
            onClick={(event) => {
              event.stopPropagation();
              changeImage(-1);
            }}
          >
            <svg viewBox="0 0 28 20" aria-hidden="true">
              <path
                d="M27 10H3M11 2l-8 8 8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="realizations__lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={projects[selectedIndex].src}
              alt={projects[selectedIndex].alt}
              className="realizations__lightbox-image"
            />
          </div>

          <button
            type="button"
            className="realizations__lightbox-nav realizations__lightbox-nav--next"
            aria-label="Następne zdjęcie"
            onClick={(event) => {
              event.stopPropagation();
              changeImage(1);
            }}
          >
            <svg viewBox="0 0 28 20" aria-hidden="true">
              <path
                d="M1 10h24M17 2l8 8-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Realizations;