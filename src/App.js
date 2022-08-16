import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';

function Solution() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [givenMin, setGivenMin] = useState(0);
  const [givenSec, setGivenSec] = useState(0);
  const [pause, setPause] = useState(false);
  let id;

  useEffect(() => {
    if (pause) return;
    id = setInterval(() => {
      if (givenSec > 0) {
        setGivenSec(givenSec - 1);
      }
      if (givenSec == 0 && givenMin > 0) {
        setGivenMin(givenMin - 1);
        setGivenSec(59);
      }
      if (givenSec == 0 && givenMin == 0) {
        clearInterval(id);
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });

  const getMinutes = (e) => {
    setMin(e.target.value);
  };
  const getSeconds = (e) => {
    setSec(e.target.value);
  };

  const startTime = () => {
    console.log('34: ' + min, sec);
    setGivenSec(sec);
    setGivenMin(min);
  };

  const pauseTime = () => {
    console.log('stop');
    setPause(true);
    clearInterval(id);
  };

  const resetTime = () => {
    setGivenSec(0);
    setGivenMin(0);
  };

  const resumeTime = () => {
    console.log('resume');
    setPause(false);
  };

  return (
    <Fragment>
      <label>
        <input onChange={(e) => getMinutes(e)} type="number" />
        Minutes
      </label>
      <label>
        <input onChange={(e) => getSeconds(e)} type="number" />
        Seconds
      </label>

      <button onClick={startTime}>START</button>
      <button onClick={pause == true ? resumeTime : pauseTime}>
        PAUSE / RESUME
      </button>
      <button onClick={resetTime}>RESET</button>

      <h1 data-testid="running-clock">{`${givenMin}:${givenSec}`}</h1>
    </Fragment>
  );
}

export default Solution;
