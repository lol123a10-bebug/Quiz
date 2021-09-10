import Button from "../../UI/Button";

const Answer = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default Answer;
