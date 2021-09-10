import classes from "./QuizHeader.module.scss";

const QuizHeader = (props) => {
  return (
    <div className={classes.QuizHeader}>
      <p>
        <strong>
          Question {props.current + 1}/{props.length}
        </strong>
        <span>Timer: {props.timer ? props.timer : "00:00:000"}</span>
      </p>
    </div>
  );
};

export default QuizHeader;
