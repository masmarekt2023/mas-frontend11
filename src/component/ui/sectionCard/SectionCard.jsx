import React, { useRef, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import CardComponent from '../Card/CardCreators';
import './sectionCard.css';
import Cardbundle from '../Card/Cardbundle';
import CardMarketplace from '../Card/CardMarketplace';

const SectionCard = ({
    likesCount,
    subscrib,
    CardpersonalInfo,
    Subscribe,
    data,
    chat,
    Creators,
    Bundles,
    Marketplace
}) => {
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    // Function to determine scroll amount
    const getScrollAmount = () => (isDesktop ? 300 : 50);

    // Handle left arrow click
    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    };

    // Handle right arrow click
    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    };

    // Function to start auto-scrolling
    const startAutoScroll = () => {
        if (isDesktop) {
            intervalRef.current = setInterval(() => {
                if (!isDragging && autoScroll && carouselRef.current) {
                    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }, 2000);
        }
    };

    // Stop auto-scrolling
    const stopAutoScroll = () => {
        clearInterval(intervalRef.current);
    };

    // Listen for window resize to update isDesktop state
    useEffect(() => {
        const handleResize = () => {
            const newIsDesktop = window.innerWidth > 768;
            if (newIsDesktop !== isDesktop) {
                setIsDesktop(newIsDesktop);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isDesktop]);

    // Start auto-scroll only if it's a desktop
    useEffect(() => {
        if (isDesktop) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
        return () => stopAutoScroll();
    }, [isDesktop, isDragging, autoScroll]);

    // Touch event handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        setScrollLeft(carouselRef.current.scrollLeft);
        stopAutoScroll(); // Stop auto-scroll when touched
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (isDesktop) startAutoScroll(); // Resume only if desktop
    };

    return (
        <div dir='ltr' className='marginForSmall' style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
            {/* Left Arrow */}
            <button  onClick={handleScrollLeft} className='prev-arrow'>
                <AiOutlineArrowLeft size={30} />
            </button>

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                style={{
                    display: 'flex',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    padding: '20px',
                    whiteSpace: 'nowrap',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseEnter={() => {
                    setAutoScroll(false);
                    stopAutoScroll();
                }}
                onMouseLeave={() => {
                    if (isDesktop) {
                        setAutoScroll(true);
                        startAutoScroll();
                    }
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {data.map((itemCard, index) => (
                    <div className='CardContainer' key={index}>
                        {Creators && (
                            <CardComponent
                                data={itemCard}
                                chat={chat}
                                subscrib={subscrib}
                                CardpersonalInfo={CardpersonalInfo}
                                Subscribe={Subscribe}
                            />
                        )}
                        {Bundles && <Cardbundle data={itemCard} />}
                        {Marketplace && <CardMarketplace data={itemCard} />}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button onClick={handleScrollRight} className='next-arrow'>
                <AiOutlineArrowRight size={30} />
            </button>
        </div>
    );
};

export default SectionCard;
