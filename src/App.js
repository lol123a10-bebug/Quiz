import Quiz from "./components/Quiz/Quiz";
import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.App}>
      <Quiz />
    </div>
  );
};

export default App;
