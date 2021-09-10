import { createSlice } from "@reduxjs/toolkit";
import { Questions } from "../dummy-data";
import convertTime from "../utility/convertTime";
import randomBetween from "../utility/randomBetween";

const initialState = {
  questions: Questions,
  timer: "",
  score: 0,
  records: [],
  initTime: "",
  isOn: false,
  questionMaxLength: 5,

  randomNumber: 0,
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
      state.randomNumber = randomBetween(state.questions.length - 1);
    },

    tick(state, action) {
      state.timer = convertTime(action.payload);
    },

    startTimer(state) {
      state.initTime = new Date().getTime();
      state.isOn = true;
    },

    ceaseLap(state) {
      state.records.push({ timer: state.timer, score: state.score });
      state.isOn = false;
    },

    resetTimer(state) {
      state.timer = "";
      state.score = 0;
      state.questions = Questions;
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
} = quizSlice.actions;

export const quizState = (state) => state.quiz;

export default quizSlice.reducer;
