"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, Star } from "lucide-react";
import { useEffect, useRef } from "react";

 type Stat = {
    number: string;
    label: string;
  };


const stats: Stat[] = [
  { number: "50K+", label: "Problems Solved" },
  { number: "10K+", label: "Active Developers" },
  { number: "25+", label: "Programming Languages" },
  { number: "98%", label: "Success Rate" },
];

const LandingPage = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rotated = false;
    let scaled = false;

    const intervalId = setInterval(() => {
      if (ref.current) {
        rotated = !rotated;
        scaled = !scaled;

        // Improved: single transform string
        ref.current.style.transform = `rotateX(${rotated ? 360 : 0}deg) scale(${scaled ? 1 : 0.8})`;
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="w-fit mx-auto">
        <Badge
          variant="secondary"
          className="mb-8 bg-[#e0dbff] dark:bg-[#1b0c4f] text-[#3d0ef6] dark:text-[#bfc5ff] border-[#b3aaff] dark:border-[#2a0f77] hover:bg-[#d6ccff] dark:hover:bg-[#2d0f88]"
        >
          <Star className="w-4 h-4 mr-2" />
          Join Thousands of Developers Driving Innovation
        </Badge>
      </div>

      {/* Main Heading */}
      <h1 className="relative z-10 preserve-3d text-5xl md:text-8xl lg:text-9xl font-black transition-all bg-[radial-gradient(circle_at_center,#b59bff,#8f66ff,#5f3dff)] dark:bg-[radial-gradient(circle_at_center,#7b2ff7,#3d0ef6,#0e0af6)] px-3 md:px-7 py-6 rounded-full overflow-hidden text-white drop-shadow-[0_0_10px_#3d0ef6] dark:drop-shadow-[0_0_17px_#3d0ef6] flex items-center w-fit mx-auto">
        Hello
        <span
          ref={ref}
          className="bg-yellow-400 p-4 rounded-full ml-3 text-white inline-block duration-700"
        >
          Coders
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-center md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 mb-12 leading-relaxed">
        Solve thousands of coding challenges, compete globally, and sharpen your
        skills with real-time feedback and expert solutions — take your coding
        journey to the next level.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Button
          size="lg"
          className="bg-[#3d0ef6] hover:bg-[#5a26ff] dark:bg-[#6d3dff] dark:hover:bg-[#8b5bff] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center"
          aria-label="Start solving coding challenges"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Solving Challenges
          <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-2 border-[#a78bfa] dark:border-[#8b5bff] text-[#5a26ff] dark:text-[#d6ccff] hover:bg-[#f0ebff] dark:hover:bg-[#3a0ef6]/20"
          aria-label="Explore coding problems"
        >
          Explore Problems
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
