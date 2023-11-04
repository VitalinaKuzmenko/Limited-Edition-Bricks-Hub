"use client";
import "./Questions.css";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import Line from "../Line/Line";

interface questionAndAnswer {
  question: string;
  answer: string;
}
const Questions = () => {
  const [openQuestions, setOpenQuestions] = useState<boolean[]>(
    new Array(3).fill(false)
  );
  const questionsAndAnswers: questionAndAnswer[] = [
    {
      question:
        "What makes Limited Edition Bricks Hub different from other LEGO marketplaces?",
      answer:
        "Limited Edition Bricks Hub is dedicated exclusively to limited edition LEGO sets, ensuring that collectors and enthusiasts have a specialized platform to discover and purchase rare and exclusive LEGO creations. We curate a unique collection of sets that are hard to find elsewhere, making us the ultimate destination for collectors.",
    },
    {
      question:
        "Can I pre-order upcoming limited edition LEGO sets on your platform?",
      answer:
        "Yes, we offer the opportunity to pre-order highly anticipated limited edition LEGO sets. Pre-ordering allows you to secure your purchase before the official release, ensuring you don't miss out on exclusive sets that tend to sell out quickly. We'll keep you informed about estimated release dates and ship your pre-order as soon as the product becomes available.",
    },
    {
      question: "Do you offer international shipping for your LEGO sets?",
      answer:
        "Yes, we provide international shipping for our customers worldwide. Whether you're a LEGO enthusiast in the United States, Europe, Asia, or any other part of the globe, you can enjoy the unique LEGO sets available on our platform. We work with reliable shipping partners to ensure your purchase arrives safely and on time.",
    },
  ];

  const toggleItem = (index: number) => {
    const newOpenQuestions = [...openQuestions];
    newOpenQuestions[index] = !openQuestions[index];
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <section className="faq-container">
      <h2>FAQ</h2>
      <Line />
      {questionsAndAnswers.map((item, index) => (
        <div key={index}>
          <div className="faq-item" onClick={() => toggleItem(index)}>
            <div className="faq-question">{item.question}</div>
            <div className="icon-container">
              {openQuestions[index] ? (
                <FiChevronDown className="faq-icon" />
              ) : (
                <FiChevronRight className="faq-icon" />
              )}
            </div>
          </div>
          <div
            className={`faq-answer ${openQuestions[index] ? "active" : ""}`}
            style={
              openQuestions[index] ? { maxHeight: "700px" } : { maxHeight: "0" }
            }
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Questions;
