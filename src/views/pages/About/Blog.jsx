import BlogCard from "../../../component/BlogCard";
import React, { useState } from "react";
import './Blog.css'
import { ButtonwithAnimation } from "../../../component/ui/Button/button";



const Blog = () => {

  const [likes, setLikes] = useState({});

  const handleIconClick = (id, action) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] === action ? null : action, 
    }));
  };

  const blogData = [
    {
      id: '1' ,
      title: 'Project Study' ,
      desc: 'It takes two flints to make a fire. What services does your development company offer? We offer a range of services including web' ,
      date: 'September 4, 2024'
    },
    {
      id: '2' ,
      title: 'Relational vs non-relational databases, querying data and what product managers really need to know' ,
      desc: 'Welcome to part five of a series of articles covering the technical knowledge that every Product Manager ought to know.' ,
      date: 'April 9, 2023'
    },
    {
      id: '3' ,
      title: 'ChatGPT-4: Taking conversational AI to the next level with the advanced language generation and context-awareness' ,
      desc: 'Over the past few years, conversational AI has been evolving at an unprecedented rate.' ,
      date: 'April 9, 2023'
    },
    {
      id: '4' ,
      title: 'Start and grow your business with AI ultimate upscale — a step-by-step guide: 4 use cases' ,
      desc: 'OpenAI just released the ChatGPT API. Here’s how some companies have powered their products with the ChatGPT API…' ,
      date: 'April 9, 2023'
    },
    {
      id: '5' ,
      title: 'How we upgraded frontend architecture for performance…' ,
      desc: 'Introduction As a company that values user experience, we realized that our…' ,
      date: 'April 3, 2023'
    },
    {
      id: '6' ,
      title: 'How we cut the rate of GPT hallucinations from 20%…' ,
      desc: 'Over the past few years, conversational AI has been evolving at an unprecedented rate, and ChatGPT has been at the forefront of this revolution…' ,
      date: 'April 9, 2023'
    },
    {
      id: '7' ,
      title: 'Start and grow your business with AI ultimate upscale — a step-by-step guide: 4 use cases' ,
      desc: 'OpenAI just released the ChatGPT API. Here’s how some companies have powered their products with the ChatGPT API…' ,
      date: 'April 9, 2023'
    },
    {
      id: '8' ,
      title: 'Building A Retro Draggable Web Component With Lit ar not working' ,
      desc: 'Nancy boy Charles down the pub get stuffed mate easy peasy brown bread car boot squiffy loo, blimey arse over tit it’s your round cup' ,
      date: 'October 12, 2022'
    },
    {
      id: '9' ,
      title: 'Meet Smart Interface Design Patterns Checklists (With 166 Cards)' ,
      desc: 'Nancy boy Charles down the pub get stuffed mate easy peasy brown bread car boot squiffy loo, blimey arse over tit it’s your round cup' ,
      date: 'October 12, 2022'
    },
    {
      id: '10' ,
      title: 'Boost Your Skills Online, On Front-End & Design Basics' ,
      desc: 'Nancy boy Charles down the pub get stuffed mate easy peasy brown bread car boot squiffy loo, blimey arse over tit it’s your round cup' ,
      date: 'October 12, 2022'
    }
    
  ] 
 
    return<>
     <div style={{
                background:"linear-gradient(to right,#280026,#4a004f)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                paddingTop:"30px"
            }}>
            <ButtonwithAnimation>News & Article</ButtonwithAnimation>
            </div>
    

       <div className="blog-wrapper">
      <div className="blog-container">
      {blogData.map((card, index) => (
        <BlogCard
          key={card.id}
          title={card.title}
          desc={card.desc}
          date={card.date}
          id={card.id}
          activeIcon={likes[card.id]} 
          onIconClick={handleIconClick}
          
        />
      ))}
    </div>
    <button className="load-btn">Load More</button>
    <span>No more posts to show</span>
    </div>
    </>
  }
  
  export default Blog
  