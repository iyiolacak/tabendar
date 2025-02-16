import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // For Next.js 13+ with the new output system; otherwise, use "next export" CLI
  reactStrictMode: false, // optional
};

export default MillionLint.next({
  enabled: true,
  rsc: true
})(nextConfig);
