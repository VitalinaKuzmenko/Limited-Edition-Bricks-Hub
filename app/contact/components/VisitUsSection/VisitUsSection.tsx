import "./VisitUsSection.css";
import Line from "../../../components/Line/Line";
import VisitUsMap from "../VisitUsMap/VisitUsMap";

const VisitUsSection = () => {
  return (
    <section className="visit-us-section">
      <h2>Visit Us</h2>
      <Line />
      <div className="visit-us-container">
        <div className="visit-us-address-container">
          <h3>ADDRESS</h3>
          <p>
            <span>Limited Edition Bricks Hub</span>
            <span>9 Millbank,</span>
            <span>London</span>
            <span>SW1P 3GE</span>
            <span>United Kingdom</span>
          </p>
        </div>
        <div className="visit-us-contacts-container">
          <h3>CONTACT</h3>
          <p>
            <span>
              <ul className="contact-us-contacts-list">
                <li>
                  <a href="tel:+44 3342 675669" className="contact-link"></a>
                </li>
              </ul>
            </span>
            <span>
              <ul className="contact-us-contacts-list">
                <li>
                  <a
                    href="mailto:board@lentegeurhospital.co.za"
                    className="contact-link"
                  >
                    contact@limitededitionbrickshub.co.uk
                  </a>
                </li>
              </ul>
            </span>
          </p>
        </div>
        <VisitUsMap />
      </div>
    </section>
  );
};

export default VisitUsSection;
