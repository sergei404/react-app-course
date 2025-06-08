import classes from "./Button.module.css";

export const Button = ({onClick, isActive, isDisabled, children}) => {
  return (
    <button onClick={onClick} className={`${classes.btn} ${isActive ? classes.active : ""}`} disabled={isDisabled}>
      {children}
    </button>
  );
};
