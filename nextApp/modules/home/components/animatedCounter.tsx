"use client"

import { useEffect, useState } from "react";

const AnimatedNumber = ({ end }: { end: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 3000; 
    const stepTime = 20;   
    const increment = end / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [end]);

  return <>{value}</>;
};

export default AnimatedNumber
