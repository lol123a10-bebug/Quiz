import classes from "./Button.module.scss";

const Button = (props) => {
  const buttonClasses = `${classes.Button} ${props.className}`;

  return (
    <button {...props} className={buttonClasses}>
      {props.children}
    </button>
  );
};

export default Button;
