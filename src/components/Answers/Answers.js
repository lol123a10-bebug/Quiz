import Answer from "./Answer/Answer";
import classes from "./Answers.module.scss";

const Answers = (props) => {
  return (
    <div className={classes.Answers}>
      {props.quest.answerOptions.map((option) => (
        <Answer
          key={option.text}
          onClick={props.clicked.bind(null, option.isCorrect, props.id)}
        >
          {option.text}
        </Answer>
      ))}
    </div>
  );
};

export default Answers;
