import "./ContactUsSection.css";
import Line from "../../../components/Line/Line";
import ContactUsForm from "../ContactUsForm/ContactUsForm";

const ContactUsSection = () => {
  return (
    <section className="contact-us-section">
      <h1 className="contact-us-title">Contact Us</h1>
      <Line />
      <ContactUsForm />
    </section>
  );
};

export default ContactUsSection;
