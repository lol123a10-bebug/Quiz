import { useSelector } from "react-redux";
import { quizState } from "../../store/quizSlice";
import BoardItem from "./BoardItem";
import classes from "./BoardItems.module.scss";

const BoardItems = () => {
  const state = useSelector(quizState);

  return (
    <ol className={classes.BoardItems}>
      {state.records.map((record, index) => (
        <BoardItem key={index} time={record.time} score={record.score} />
      ))}
    </ol>
  );
};

export default BoardItems;
