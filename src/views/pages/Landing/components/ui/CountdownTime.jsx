import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const CountUpTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => calculateNewTime(prevTime));
    }, 1000);

    return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء تثبيت المكون
  }, []);

  function calculateNewTime(prevTime) {
    let { days, hours, minutes, seconds } = prevTime;

    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }
    if (hours >= 24) {
      hours = 0;
      days += 1;
    }

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="flex flex-wrap gap-5 my-2 mb-10">
      <div className="text-white bg-[#17023C] py-1 shadow-md px-10 rounded-md my-2 flex flex-col items-center justify-center">
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.days}</Typography>
        <Typography className="text-white">Days</Typography>
      </div>
      <div className="text-white bg-[#17023C] shadow-md px-10 rounded-md my-2 flex flex-col items-center justify-center">
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.hours}</Typography>
        <Typography className="text-white">Hours</Typography>
      </div>
      <div className="text-white bg-[#17023C] shadow-md px-10 rounded-md my-2 flex flex-col items-center justify-center">
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.minutes}</Typography>
        <Typography className="text-white">Minutes</Typography>
      </div>
      <div className="text-white bg-[#17023C] shadow-md px-10 rounded-md my-2 flex flex-col items-center justify-center">
        <Typography variant="h5" className="text-white text-xl">{timeElapsed.seconds}</Typography>
        <Typography className="text-white">Seconds</Typography>
      </div>
    </div>
  );
};

export default CountUpTimer;

