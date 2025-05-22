import {motion} from 'framer-motion'
import { styles } from '../Styles'
import {staggerContainer} from '../utils/Motion'


const SectionWrapper = (Commponent,index,className) => {
return(
  function HOC(){
    return(
  
      <motion.section variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{once:true,amount:0.25}}
      className={`${styles.paddingX} min-h-screen py-10 ${className}`}
      >
        <span className='hash-span ' id={index}>
         &nbsp;
        </span>
        
        <Commponent/>
      </motion.section>
    )
   }
)
}

export default SectionWrapper
