import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const FAQmodel = () => {
    const { t } = useTranslation();

    const faqData = [
        {
            id: 1,
            question: "WHAT SERVICE DOES YOUR DEVELOPMENT COMPANY OFFER?",
            answer: "We offer a range of services including web development, mobile app development, custom software development, UI/UX design, and quality assurance.",
        },
        {
            id: 2,
            question: "WHAT TECHNOLOGIES DO YOU SPECIALIZE IN?",
            answer: "We specialize in a wide range of technologies including but not limited to JavaScript, Python, Ruby on Rails, Swift, Java, and more.",
        },
        {
            id: 3,
            question: "HOW LONG DOES IT TAKE TO DEVELOP A TYPICAL WEBSITE OR MOBILE APP?",
            answer: "The timeline for development can vary depending on the complexity of the project. We typically provide a project timeline after the initial consultation and requirements gathering.",
        },
        {
            id: 4,
            question: "CAN YOU HELP WITH MAINTAINING AND UPDATING EXISTING SOFTWARE OR WEBSITE?",
            answer: "Yes, we offer maintenance and support services for existing software and websites. This can include updates, bug fixes, and security enhancements.",
        },
        {
            id: 5,
            question: "WHAT IS YOUR APPROACH TO ENSURING THE SECURITY OF THE DEVELOPED SOFTWARE?",
            answer: "We follow industry best practices for security, including regular security audits, code reviews, and adherence to security standards and protocols.",
        },
    ];

    const [expandedId, setExpandedId] = useState(null);
   
    const toggleAnswer = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="faq-container">
            {faqData.map((item) => (
                <div key={item.id} className="faq-item">
                    <div
                        className="faq-question"
                        onClick={() => toggleAnswer(item.id)}
                    >
                        <span>{item.question}</span>
                        {expandedId === item.id ? (
                            <FaChevronUp className="arrow-icon" />
                        ) : (
                            <FaChevronDown className="arrow-icon" />
                        )}
                    </div>
                    {expandedId === item.id && (
                        <div className="faq-answer">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQmodel;