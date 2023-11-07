import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PopupSignin from "../components/PopupSignin/PopupSignin";
import ContactUsSection from "./components/ContactUsSection/ContactUsSection";
import VisitUsSection from "./components/VisitUsSection/VisitUsSection";
import "./contact.css";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="contact-us-page">
        <ContactUsSection />
        <VisitUsSection />
        <PopupSignin />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
