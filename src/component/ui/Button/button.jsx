import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import styles from './ButtonWithAnimation.module.css'; 


export const PrimaryButton = styled(MuiButton)(({ pill }) => ({
  background: "linear-gradient(to bottom right, #640D5F, rgb(199, 113, 238))",
  border: "none",
  padding: "10px 15px",
  borderRadius: pill ? 50 : 15,
  cursor: "pointer",
  width: "auto",
  transition: "background-color 0.3s",
  color: "white",
  minHeight: 50,
  width: 150,
  "&:hover": {
    background: "linear-gradient(to bottom right, #640D5F, rgb(8, 8, 56))",
  },
}));


  

export const ButtonwithAnimation=({children}) => {
return (
  <div className={styles.btnBlock}>
        
  <div className={styles.buttonContainer}>
    <button className={styles.buttonFree}>{children}</button>
    <div className={styles.animatedBackground}></div>
    <div className={styles.innerBlurEffect}></div>
  </div>
</div>
)

}
