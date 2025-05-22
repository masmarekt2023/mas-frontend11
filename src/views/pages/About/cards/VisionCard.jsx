import React from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

function VisionCard() {
  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true, 
  });

  const { t } = useTranslation();

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
    <div className="hcard" ref={ref}>
      <div className="hcard-cont">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`hcard-body ${inView ? "animate" : ""}`}
            style={{ transitionDelay: `${index * 0.2}s` }} 
          >
            <div className="hcard-text">
              <span className="hcard-title">{card.title}</span>
              <span className="hcard-desc">{card.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisionCard;
