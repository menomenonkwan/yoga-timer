import React from 'react';

const Move = (arr, from, to) => {
  const newLocation = from + to;
  const item = arr.splice(from, 1);
  arr.splice(newLocation, 0, item[0]);

  return arr;
}

const GetTotalSeconds = (mins, secs, hrs = 0) => {
  const hours = parseInt(hrs) * 60 * 60;
  const minutes = parseInt(mins) * 60;
  const seconds = parseInt(secs) * 1;
  const totalSeconds = (hours ? hours : 0) + (minutes ? minutes : 0) + (seconds ? seconds : 0);

  return totalSeconds;
}

const AddToTime = (time) => {
  const reducedTime = time.reduce((a, b) => ({duration: a.duration + b.duration}));
  const totalTime = reducedTime.duration;
  const hrs = Math.floor(totalTime / 3600);
  const min = Math.floor(totalTime / 60) % 60;
  const sec = totalTime % 60;
  const newTime = {
    duration: totalTime,
    hours: hrs,
    minutes: min,
    seconds: sec,
  };

  return newTime;
}

const DisplayTime = (duration) => {
  return (
    <React.Fragment>
      {Math.floor(duration / 3600) > 0 ? `${Math.floor(duration / 3600)}:` : ''}{('0' + Math.floor(duration / 60) % 60).slice(-2)}:{('0' + duration % 60).slice(-2)}
    </React.Fragment>
  );
}

export { Move, GetTotalSeconds, AddToTime, DisplayTime };