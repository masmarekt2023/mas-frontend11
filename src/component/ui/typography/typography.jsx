import './typography.css'
export default function Typography({ component, children, className,onClickFun }) {
  return (
 
      
        <div
          className={`${className ? className : ""} ${component}`}
          
          onClick={onClickFun}
        >
          {children}
        </div>
    

  );
}


