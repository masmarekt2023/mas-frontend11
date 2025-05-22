
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaThumbsUp } from "react-icons/fa";


  

const BlogCard = ({ title, desc, date, id, activeIcon, onIconClick }) => {



const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

    return(
        <div className="blog-center">
        <div
      ref={ref}
      className={`blog-card ${inView ? 'animate' : ''}`}
    >
     <span className="blog-card-title">{title}</span>
     <p className="blog-card-desc">{desc}</p>
     <div className="lower-blog">
     <span className='blog-card-date'>{date}</span>
     <div className="blog-icons">
     <FaThumbsUp
              className={`${activeIcon === 'like' ? 'active' : ''}`}
              onClick={() => onIconClick(id, 'like')}
              style={{ color: activeIcon === 'like' ? '#9c9797' : '#c053ff', cursor: 'pointer' , fontSize:"25px"}}
            ></FaThumbsUp>
     
    

     </div>
     </div>
    </div>
    </div>
        
    )


}

export default BlogCard