"use client";

export default function GlassPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/wallpaper.png")`, // Add `url()`
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="glass-container">
        <div className="glass-square" />
      </div>
    </div>
  );
}
