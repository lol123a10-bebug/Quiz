import BoardItems from "./BoardItems";
import Button from "../UI/Button";

const Leaderboard = (props) => {
  return (
    <>
      <p>
        Your scored - {props.score} out of {props.length}
      </p>
      <p>Your time - {props.timer}</p>
      <BoardItems />
      <Button onClick={props.reset}>Try again</Button>
    </>
  );
};

export default Leaderboard;
