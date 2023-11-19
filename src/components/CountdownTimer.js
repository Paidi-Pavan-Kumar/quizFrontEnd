
import React, { useState, useEffect } from 'react';

function CountdownTimer(props){
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(props.targetTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = calculateTimeRemaining(props.targetTime);
      setTimeRemaining(remainingTime);

      if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        props.getState(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.targetTime]);

  function calculateTimeRemaining(targetTime) {
    const now = new Date().getTime();
    const difference = props.targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      <h4>Remaining Time</h4>
      <div>
        <span>{timeRemaining.days}d </span>
        <span>{timeRemaining.hours}h </span>
        <span>{timeRemaining.minutes}m </span>
        <span>{timeRemaining.seconds}s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;

