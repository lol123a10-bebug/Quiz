import Answers from "../Answers/Answers";
import classes from "./Question.module.scss";

const Question = (props) => {
  return (
    <div className={classes.Question}>
      <h2>{props.quest.text}</h2>
      <Answers
        quest={props.quest}
        clicked={props.clicked}
        id={props.quest.id}
      />
    </div>
  );
};

export default Question;
