import ContactUsSection from "./components/ContactUsSection/ContactUsSection";
import VisitUsSection from "./components/VisitUsSection/VisitUsSection";
import "./contact.css";

const ContactPage = () => {
  return (
    <div className="contact-us-page">
      <ContactUsSection />
      <VisitUsSection />
    </div>
  );
};

export default ContactPage;
