import { createSlice } from "@reduxjs/toolkit";
import { Questions } from "../dummy-data";
import convertTime from "../utility/convertTime";
import randomNumber from "../utility/randomNumber";

const initialState = {
  timer: "",
  timerMs: "",
  initTime: "",
  score: 0,
  records: [],
  isOn: false,
  questions: Questions,
  questionMaxLength: 5,

  boardBeforeStart: false,

  randomNumber: randomNumber(Questions.length - 1),
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    incrementScore(state) {
      state.score = state.score + 1;
    },

    used(state, action) {
      const index = state.questions.findIndex(
        (item) => item.id === action.payload
      );
      state.questions.splice(index, 1);
    },

    random(state) {
      state.randomNumber = randomNumber(state.questions.length - 1);
    },

    tick(state, action) {
      state.timer = convertTime(action.payload);
      state.timerMs = action.payload;
    },

    startTimer(state) {
      state.initTime = new Date().getTime();
      state.isOn = true;
    },

    ceaseLap(state) {
      state.records.push({
        time: state.timer,
        score: state.score,
        effectRatio: state.score > 0 ? state.score / state.timerMs : 0,
      });

      state.isOn = false;
    },

    resetTimer(state) {
      state.timer = "";
      state.score = 0;
      state.questions = Questions;
    },

    fullReset(state) {
      state.records = [];
      quizSlice.caseReducers.resetTimer(state);
    },

    boardClicked(state, { payload = false }) {
      state.boardBeforeStart = payload;
    },
  },
});

export const {
  random,
  resetTimer,
  ceaseLap,
  incrementScore,
  startTimer,
  tick,
  used,
  fullReset,
  boardClicked,
} = quizSlice.actions;

export const quizState = (state) => state.quiz;

export const sortedRecords = (state) =>
  state.quiz.records.sort((a, b) => a.effectRatio - b.effectRatio);

export default quizSlice.reducer;
