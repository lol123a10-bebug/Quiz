import { useSelector } from "react-redux";
import { quizState } from "../../store/quizSlice";
import BoardItem from "./BoardItem";
import classes from "./BoardItems.module.scss";

const BoardItems = () => {
  const state = useSelector(quizState);

  const recrods = [...state.records];
  const recordsState = recrods.sort((a, b) => b.effectRatio - a.effectRatio);

  return (
    <ol className={classes.BoardItems}>
      {recordsState.map((record, index) => (
        <BoardItem
          key={index}
          effect={record.effectRatio}
          time={record.time}
          score={record.score}
        />
      ))}
    </ol>
  );
};

export default BoardItems;
