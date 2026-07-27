import "./Contact.css";

import contactImage1 from "../assets/realizations/realization-1.jpg";
import contactImage2 from "../assets/realizations/realization-5.jpg";
import contactImage3 from "../assets/realizations/realization-10.png";

const contactPhotos = [
  {
    src: contactImage1,
    position: "left",
  },
  {
    src: contactImage2,
    position: "center",
  },
  {
    src: contactImage3,
    position: "right",
  },
];

function Contact() {
  return (
    <section
      id="kontakt"
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact__panel">
        <div className="contact__photos" aria-hidden="true">
          {contactPhotos.map((photo) => (
            <div
              key={photo.position}
              className={`contact__photo contact__photo--${photo.position}`}
            >
              <img
                src={photo.src}
                alt=""
                draggable="false"
              />
            </div>
          ))}
        </div>

        <div className="contact__content">
          <h2 id="contact-title" className="contact__title">
            Zostańmy w kontakcie!
            <br />
            Znajdziesz nas na <em>Instagramie.</em>
          </h2>

          <div className="contact__action">
            <p className="contact__description">
              Śledź nasze
              <br />
              najnowsze realizacje!
            </p>

            <a
              href="https://www.instagram.com/"
              className="contact__button"
              target="_blank"
              rel="noreferrer"
              aria-label="Otwórz profil GiardDesign na Instagramie"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;