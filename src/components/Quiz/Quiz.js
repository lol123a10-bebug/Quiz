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
  fullReset,
  boardClicked,
} from "../../store/quizSlice";

import Question from "../Question/Question";
import Card from "../UI/Card";
import classes from "./Quiz.module.scss";
import QuizHeader from "./QuizHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import QuizButton from "./QuizButton";

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

  const resetQuestionsHandler = () => {
    setCurrentCount(0);
    setShowScore(false);
  };

  const leaderboardButtonHandler = () => {
    dispatch(boardClicked(true));
    setShowScore(true);
  };

  const resetHandler = () => {
    dispatch(resetTimer());
    dispatch(boardClicked());
    resetQuestionsHandler();
  };

  const fullResetHandler = () => {
    dispatch(fullReset());
    dispatch(boardClicked());
    resetQuestionsHandler();
  };

  const quizButtonHandler = () => {
    return showScore ? resetHandler() : leaderboardButtonHandler();
  };

  const currrentQuestion = state.questions[state.randomNumber];

  let content = (
    <>
      <QuizHeader
        timer={state.timer}
        length={state.questionMaxLength}
        current={currentCount}
      />
      <Question quest={currrentQuestion} clicked={answerClickHandler} />
    </>
  );

  if (showScore) {
    content = <Leaderboard reset={resetHandler} fullReset={fullResetHandler} />;
  }

  return (
    <Card className={classes.Quiz}>
      {content}
      <QuizButton showScore={showScore} clicked={quizButtonHandler} />
    </Card>
  );
};

export default Quiz;
