import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ceaseLap,
  incrementScore,
  random,
  resetTimer,
  used,
  startTimer,
  tick,
  quizState,
} from "../../store/quizSlice";

import Question from "../Question/Question";
import Card from "../UI/Card";
import classes from "./Quiz.module.scss";
import QuizHeader from "./QuizHeader";
import Leaderboard from "../Leaderboard/Leaderboard";

const Quiz = () => {
  const state = useSelector(quizState);
  const dispatch = useDispatch();

  const [currentCount, setCurrentCount] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (state.isOn) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const actualTime = currentTime - state.initTime;
        dispatch(tick(actualTime));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [dispatch, state.initTime, state.isOn, state.timer]);

  const answerClickHandler = (isCorrect, id) => {
    const nextQuestion = currentCount + 1;
    dispatch(used(id));

    if (!state.isOn) {
      dispatch(startTimer());
    }

    if (isCorrect) {
      dispatch(incrementScore());
    }

    if (nextQuestion >= state.questionMaxLength) {
      dispatch(ceaseLap());
      setShowScore(true);
    } else {
      dispatch(random());
      setCurrentCount((prevV) => prevV + 1);
    }
  };

  const reset = () => {
    dispatch(resetTimer());
    setCurrentCount(0);
    setShowScore(false);
  };

  const curQ = state.questions[state.randomNumber];

  let content = <Question quest={curQ} clicked={answerClickHandler} />;

  if (showScore) {
    content = (
      <Leaderboard
        timer={state.timer}
        score={state.score}
        length={state.questionMaxLength}
        reset={reset}
      />
    );
  }

  return (
    <Card className={classes.Quiz}>
      <QuizHeader
        timer={state.timer}
        length={state.questionMaxLength}
        current={currentCount}
      />
      {content}
    </Card>
  );
};

export default Quiz;
