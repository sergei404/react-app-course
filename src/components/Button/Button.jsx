import classes from './Button.module.css'

const isPrimary = true

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`${classes.btn} ${isPrimary ? classes.primary : ""}`}>{props.children}</button>
    // <button className={isPrimary ? classes.primary : classes.btn}>кнопка</button>
  )
}