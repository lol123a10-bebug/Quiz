import BoardItems from "./BoardItems";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { quizState } from "../../store/quizSlice";
import classes from "./Leaderboard.module.scss";

const Leaderboard = (props) => {
  const state = useSelector(quizState);

  return (
    <div className={classes.Leaderboard}>
      {!state.boardBeforeStart && (
        <>
          <p>
            Your scored - {state.score} out of {state.questionMaxLength}
          </p>
          <p>Your time - {state.timer}</p>
        </>
      )}
      <BoardItems />
      <div className={classes.actions}>
        {!state.boardBeforeStart && (
          <Button onClick={props.reset}>Try again</Button>
        )}
        <Button onClick={props.fullReset}>Full Reset</Button>
      </div>
    </div>
  );
};

export default Leaderboard;
