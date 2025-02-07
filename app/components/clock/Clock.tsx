import React, { useEffect, useMemo, useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = useMemo(
    () => time.getHours().toString().padStart(2, "0"),
    [time]
  );
  const minutes = useMemo(
    () => time.getMinutes().toString().padStart(2, "0"),
    [time]
  );
  const dateString = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(time);
  }, [time]);

  return (
    <div className="flex flex-col items-center z-30">
      <p className="text-xl font-medium text-white/80 -mb-8">{dateString}</p>
      <div className="flex items-center justify-center gap-x-6">
        <h1 className="text-[11rem] font-chintzy antialiased text-white/60">
          {hours}
        </h1>
        <h1 className="text-[11rem] font-chintzy antialiased text-white/60">
          {minutes}
        </h1>
      </div>
    </div>
  );
};

export default Clock;
