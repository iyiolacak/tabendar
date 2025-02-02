"use client";

export default function GlassPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline // Prevents issues on mobile devices
        />
      </div>

      <div className="glass-container">
        <div className="glass-square" />
      </div>
    </div>
  );
}
