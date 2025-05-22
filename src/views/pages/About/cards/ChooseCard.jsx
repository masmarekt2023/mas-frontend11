import React from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

function ChooseCard() {

  const { t } = useTranslation();

  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true, 
  });

  const cards = [
    {
        title:"Lorem ipsum dolor sit amet",
        desc: "consectetur adipiscing elit.Lorem ipsum dolor sit amet,",
      },
      {
        title: "Lorem ipsum dolor sit amet",
        desc: "consectetur adipiscing elit.Lorem ipsum dolor sit amet,",
      },
      {
        title: "Lorem ipsum dolor sit amet",
        desc: "consectetur adipiscing elit.Lorem ipsum dolor sit amet,",
      },
      {
        title: "Lorem ipsum dolor sit amet",
        desc: "consectetur adipiscing elit.Lorem ipsum dolor sit amet,",
      },
  ];

  return (
    <div className="ccard" ref={ref}>
      <div className="ccard-cont">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`ccard-body ${inView ? "animate" : ""}`}
            style={{ transitionDelay: `${index * 0.3}s` }} 
          >
            <div className="circle"></div>
            <div className="ccard-text">
              <span className="ccard-title">{card.title}</span>
              <span className="ccard-desc">{card.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseCard;
