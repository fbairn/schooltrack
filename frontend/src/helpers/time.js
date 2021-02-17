export const secondsToTime = (timeInSeconds) => {
  const hours = lpad(Math.floor(timeInSeconds / 3600));
  const minutes = lpad((Math.floor(timeInSeconds % 3600 / 60)));
  const seconds = lpad((Math.floor(timeInSeconds % 3600 % 60)));

  return hours + ':' + minutes + ':' + seconds;
}

const lpad = (num) => {
  const s = '0' + num;
  return s.substr(s.length - 2);
}