import { useEffect, useRef, useState } from "react";
import "./About.css";

import aboutImage from "../assets/images/about-garden.jpg";

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="o-firmie"
      ref={sectionRef}
      className={`about ${isVisible ? "about--visible" : ""}`}
      aria-labelledby="about-title"
    >
      <div className="about__layout">
        <div className="about__media">
          <img
            src={aboutImage}
            alt="Starannie zaprojektowany ogród przy domu"
            className="about__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="about__content">
          <div className="about__content-inner">
            <p className="about__eyebrow">O firmie</p>

            <h2 id="about-title" className="about__title">
              Tworzymy
              <br />
              z <em>pasją</em>
            </h2>

            <p className="about__description">
              Każdy projekt to nowe wyzwanie. Dlatego nasze zespoły tworzą
              wyjątkowe rozwiązania oraz architekturę, których zadaniem jest
              rozpoznanie i realizacja potrzeb każdego Klienta. Naszą
              specjalizacją są przestrzenie nowoczesne, które charakteryzuje
              minimalizm, geometria i elegancka prostota. Tworzymy ogrody
              małoobsługowe, dostosowane do współczesnego trybu życia.
            </p>

            <a href="#kontakt" className="about__button">
              Poznaj nas bliżej

              <svg
                className="about__button-arrow"
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;