import "./FAQ.css"
import FAQmodel from "../../../component/FAQmodel";
import { useInView } from 'react-intersection-observer';
import { ButtonwithAnimation } from "../../../component/ui/Button/button";



export default function FAQ() {
    
    const { ref: ref3,inView: inView3 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
      });
    
      const { ref: ref4,inView: inView4 } = useInView({
        threshold: 0.01, 
        triggerOnce: true,  
      });



return(
    <>
    <div style={{
                background:"linear-gradient(to right,#280026,#4a004f)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                paddingTop:"30px"
            }}>
            <ButtonwithAnimation>FAQ</ButtonwithAnimation>
            </div>
   
   <div className="faq-sec">
      <div className={`faq-top ${inView3 ? 'animate' : ''}`} ref={ref3}>
        <span className='faq-title2'>Frequently Ask Questions.</span>
        <span className='faq-desc'>here some questions that you ask a lot about</span>
        <img className='questimg' src="\assets\Images\creator2.jpg" alt="" />
      </div>
      <div className={`faq-bottom ${inView4 ? 'animate' : ''}`} ref={ref4}>
<FAQmodel/>
   </div>
   </div>
  
    </>
)

}