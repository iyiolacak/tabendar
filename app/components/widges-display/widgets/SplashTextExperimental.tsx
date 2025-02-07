import React from "react";
import "@fontsource/press-start-2p"; // Open-source Press Start 2P font

export default function SplashTextExperimental() {
  return (
    <div className="absolute z-40 ml-24 mt-3 flex items-center justify-center h-20 w-full">
      {/* Shadow text layer */}
      <div
        className="absolute"
        style={{ transform: "translate(3px, 3px)" }} // Offset shadow
      >
        <span
          className="text-black/80 text-md font-bold inline-block"
          style={{
            fontFamily: "'Press Start 2P', sans-serif",
            animation: "splashPulse 2s ease-in-out infinite",
          }}
        >
          Also try Obsidian!
        </span>
      </div>

      {/* Main text layer */}
      <span
        className="relative z-10 text-[#f4ff29]/90 backdrop-shadow-lg text-md font-bold inline-block"
        style={{
          fontFamily: "'Press Start 2P', sans-serif",
          animation: "splashPulse 2s ease-in-out infinite",
        }}
      >
        Also try Obsidian!
      </span>

      {/* Inline CSS for keyframes */}
      <style>{`
        @keyframes splashPulse {
          0% {
            transform: scale(1) rotate(5deg);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
