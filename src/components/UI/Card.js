import classes from "./Card.module.scss";

const Card = (props) => {
  const classNames = `${classes.Card} ${props.className}`;
  return <div className={classNames}>{props.children}</div>;
};

export default Card;
