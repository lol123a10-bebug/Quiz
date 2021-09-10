const convertTime = (milliseconds) => {
  const m = Math.floor((milliseconds / 1000 / 60) % 60);
  const s = Math.floor((milliseconds / 1000) % 60);
  const ms = milliseconds % 1000;

  const mm = m <= 9 ? "0" + m : m;
  const ss = s <= 9 ? "0" + s : s;
  const mss = ms < 100 ? "0" + ms : ms;

  return `${mm}:${ss}:${mss}`;
};

export default convertTime;
