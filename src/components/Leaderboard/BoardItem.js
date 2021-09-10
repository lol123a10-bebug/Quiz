const BoardItem = (props) => {
  return (
    <li>
      <span>Time: {props.time}</span> - <span>Score: {props.score}</span>
    </li>
  );
};

export default BoardItem;
