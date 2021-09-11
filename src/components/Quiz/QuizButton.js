import { useSelector } from "react-redux";
import { quizState } from "../../store/quizSlice";
import Button from "../UI/Button";

const QuizButton = (props) => {
  const state = useSelector(quizState);
  return (
    <>
      {state.records.length > 0 && (
        <Button onClick={props.clicked}>
          {props.showScore ? "Quiz" : "Leaderboard"}
        </Button>
      )}
    </>
  );
};

export default QuizButton;
