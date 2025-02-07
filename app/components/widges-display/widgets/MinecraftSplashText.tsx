import { useEffect, useState } from "react";
import "@fontsource/press-start-2p"; // This font closely matches Minecraft's style

export default function SplashText() {
  const [opacity, setOpacity] = useState(1);
  const [direction, setDirection] = useState(-0.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => {
        if (prev <= 0.5 || prev >= 1) setDirection(-direction);
        return prev + direction * 0.1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="relative flex items-center justify-center h-20 w-full">
      <span
        className="text-yellow-400 text-2xl md:text-4xl font-bold"
        style={{ fontFamily: "'Press Start 2P', sans-serif", opacity }}
      >
        Try Obsidian too!
      </span>
    </div>
  );
}
