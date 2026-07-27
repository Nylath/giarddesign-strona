import { useCallback, useEffect, useRef, useState } from "react";
import "./Intro.css";

import introImage1 from "../assets/images/intro-garden.jpg";
import introImage2 from "../assets/images/intro-garden2.png";
import introImage3 from "../assets/images/intro-garden3.png";
import introImage4 from "../assets/images/intro-garden4.png";

const AUTO_SLIDE_TIME = 7000;
const SWIPE_THRESHOLD = 50;

const slides = [
  {
    image: introImage1,
    alt: "Nowoczesna aranżacja ogrodu wykonana przez GiardDesign",
  },
  {
    image: introImage2,
    alt: "Ogród przy nowoczesnym domu",
  },
  {
    image: introImage3,
    alt: "Projekt ogrodu przygotowany przez GiardDesign",
  },
  {
    image: introImage4,
    alt: "Nowoczesna realizacja ogrodu przygotowana przez GiardDesign",
  },
];

const sliderSlides = [
  {
    ...slides.at(-1),
    id: "clone-last",
  },
  ...slides.map((slide, index) => ({
    ...slide,
    id: `slide-${index}`,
  })),
  {
    ...slides[0],
    id: "clone-first",
  },
];

const sliderButtons = [
  {
    direction: -1,
    label: "Poprzednie zdjęcie",
    path: "M11 2 3 10l8 8M4 10h21",
  },
  {
    direction: 1,
    label: "Następne zdjęcie",
    path: "m17 2 8 8-8 8M24 10H3",
  },
];

function Intro() {
  const [trackPosition, setTrackPosition] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const touchStartRef = useRef(null);
  const hasMultipleSlides = slides.length > 1;

  const moveSlide = useCallback(
    (direction) => {
      if (!hasMultipleSlides || isAnimating) {
        return;
      }

      setIsAnimating(true);
      setIsTransitionEnabled(true);
      setTrackPosition((position) => position + direction);
    },
    [hasMultipleSlides, isAnimating],
  );

  const resetTrackPosition = (newPosition) => {
    setIsTransitionEnabled(false);
    setTrackPosition(newPosition);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setIsAnimating(false);
      });
    });
  };

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "transform") {
      return;
    }

    if (trackPosition === 0) {
      resetTrackPosition(slides.length);
      return;
    }

    if (trackPosition === slides.length + 1) {
      resetTrackPosition(1);
      return;
    }

    setIsAnimating(false);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    const startPosition = touchStartRef.current;

    if (!startPosition || isAnimating) {
      touchStartRef.current = null;
      return;
    }

    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - startPosition.x;
    const distanceY = touch.clientY - startPosition.y;

    touchStartRef.current = null;

    const isHorizontalSwipe =
      Math.abs(distanceX) > Math.abs(distanceY);

    if (
      !isHorizontalSwipe ||
      Math.abs(distanceX) < SWIPE_THRESHOLD
    ) {
      return;
    }

    if (distanceX < 0) {
      moveSlide(1);
    } else {
      moveSlide(-1);
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (!hasMultipleSlides || isAnimating) {
      return;
    }

    const timer = window.setTimeout(() => {
      moveSlide(1);
    }, AUTO_SLIDE_TIME);

    return () => window.clearTimeout(timer);
  }, [trackPosition, hasMultipleSlides, isAnimating, moveSlide]);

  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro__layout">
        <div className="intro__content">
          <div className="intro__content-inner">
            <h1 id="intro-title" className="intro__title">
              Nowoczesna aranżacja Twojego ogrodu
            </h1>

            <p className="intro__description">
              Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka
              realizacji. Oferujemy kompleksowy zakres usług z indywidualnym
              podejściem do każdego projektu.
            </p>

            <div className="intro__actions">
              <a
                href="#kontakt"
                className="intro__button intro__button--primary"
              >
                Skontaktuj się z nami
              </a>

              <a
                href="#realizacje"
                className="intro__button intro__button--secondary"
              >
                Zobacz nasze Realizacje

                <svg
                  className="intro__button-arrow"
                  viewBox="0 0 16 18"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1v15M2.5 11 8 16.5 13.5 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="intro__media"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            className={`intro__track ${
              isTransitionEnabled ? "intro__track--animated" : ""
            }`}
            style={{
              transform: `translate3d(-${trackPosition * 100}%, 0, 0)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {sliderSlides.map((slide, index) => {
              const isActive = index === trackPosition;

              return (
                <div
                  key={slide.id}
                  className="intro__slide"
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={isActive ? slide.alt : ""}
                    className="intro__image"
                    draggable="false"
                  />
                </div>
              );
            })}
          </div>

          <div
            className="intro__slider-controls"
            role="group"
            aria-label="Sterowanie zdjęciami"
          >
            {sliderButtons.map((button) => (
              <button
                key={button.direction}
                type="button"
                className="intro__slider-button"
                aria-label={button.label}
                disabled={!hasMultipleSlides || isAnimating}
                onClick={() => moveSlide(button.direction)}
              >
                <svg
                  className="intro__slider-icon"
                  viewBox="0 0 28 20"
                  aria-hidden="true"
                >
                  <path
                    d={button.path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;