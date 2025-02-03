import React, { useEffect, useState } from "react";

function ClockFunc() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center h-full p-1 gap-x-6">
        <h1 className="text-[10rem] font-chintzy antialiased text-white/80">
          {hours}
        </h1>
        <h1 className="text-[10rem] font-chintzy antialiased text-white/80">
          {minutes}
        </h1>
    </div>
  );
}

export default ClockFunc;
