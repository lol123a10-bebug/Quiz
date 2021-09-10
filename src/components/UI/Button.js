import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button className={classes.Button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
