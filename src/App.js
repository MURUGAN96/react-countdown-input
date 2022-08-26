import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [givenMin, setGivenMin] = useState(0);
  const [givenSec, setGivenSec] = useState(0);
  const [pause, setPause] = useState(false);

  let id;

  useEffect(() => {
    if (pause) return;
    id = setInterval(() => {
      console.log('16: ' +givenSec, givenMin);
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
    //display in valid minutes and seconds
    // setPause()
    const realSec = sec % 60;
    const realMin = Number(min) + Math.trunc(min / 60);
    setGivenSec(realSec);
    setGivenMin(realMin);
  };

  const pauseTime = () => {
    console.log('stop');
    setPause(true);
    clearInterval(id);
  };

  const resetTime = () => {
    const minn = document.querySelector('.min');
    const secc = document.querySelector('.sec');
    minn.value = '00';
    secc.value = '00';
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
        <input className="min" onChange={(e) => getMinutes(e)} type="number" />
        Minutes
      </label>
      <label>
        <input className="sec" onChange={(e) => getSeconds(e)} type="number" />
        Seconds
      </label>

      <button onClick={startTime}>START</button>
      <button onClick={pause == true ? resumeTime : pauseTime}>
        PAUSE / RESUME
      </button>
      <button onClick={resetTime}>RESET</button>

      <h1 className="result" data-testid="running-clock">
        {givenMin < 10 ? 0 + `${givenMin}` : `${givenMin}`}:
        {givenSec < 10 ? 0 + `${givenSec}` : `${givenSec}`}
      </h1>
    </Fragment>
  );
}

export default App;
