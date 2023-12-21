"use client";
import { useRef, useState } from "react";
import "./ContactUsForm.css";

const ContactUsForm = () => {
  const formRef = useRef(null);
  const [result, setResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const reasons = [
    { id: 1, option: "Compliments" },
    { id: 2, option: "Complaints" },
    { id: 3, option: "Suggestions" },
    { id: 4, option: "Other" },
  ];

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult("Sending");
    setIsSubmitting(true);

    //TODO: do something with data from form
    if (formRef.current) {
      //   formRef.current.reset();
      setIsSubmitting(false); // Enable the submit button
    }
  };
  return (
    <div className="contact-us-form-container">
      <p>Fields marked with an asterisk (*) are required.</p>
      <form ref={formRef} onSubmit={onSubmit} className="contact-us-form">
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-firstname"
            className="contact-us-form-label"
          >
            First Name *
          </label>
          <input
            type="text"
            id="contact-us-form-firstname"
            name="firstname"
            placeholder="e.g. John"
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-lastname"
            className="contact-us-form-label"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="contact-us-form-lastname"
            name="lastname"
            placeholder="e.g. Smith"
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-email"
            className="contact-us-form-label"
          >
            Email *
          </label>
          <input
            type="email"
            id="contact-us-form-email"
            name="email"
            placeholder="e.g. name@gmail.com"
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-phone"
            className="contact-us-form-label"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-us-form-phone"
            name="phone"
            placeholder="e.g. +44 3342 675669"
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-subject"
            className="contact-us-form-label"
          >
            Subject *
          </label>
          <input
            type="text"
            id="contact-us-form-subject"
            name="subject"
            placeholder="e.g. Pre-order Lego set"
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label
            htmlFor="contact-us-form-reason"
            className="contact-us-form-label"
          >
            Reason For Contact *
          </label>
          <select
            id="contact-us-form-reason"
            name="reason"
            defaultValue={""}
            className="contact-us-form-select"
            required
          >
            <option disabled value={""} className="contact-us-form-option">
              Please select a reason...
            </option>
            {reasons.map((reason) => {
              return (
                <option
                  key={reason.id}
                  className="contact-us-form-option"
                  value={reason.option}
                >
                  {reason.option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="contact-us-form-group contact-us-form-message-container">
          <label
            htmlFor="contact-us-form-message"
            className="contact-us-form-label"
          >
            What would you like to discuss? *
          </label>
          <textarea
            id="contact-us-form-message"
            name="message"
            placeholder="e.g. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, a!"
            required
            className="contact-us-form-textarea"
          />
        </div>
        <div className="contact-us-form-submit-container">
          <span className="contact-us-form-submit-result">{result}</span>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`contact-us-form-submit ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
