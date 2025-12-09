import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onBoardUser } from "@/modules/auth/actions";
import LandingPage from "@/modules/home/components/landingPage";
import { Code2, Trophy, Users, Zap } from "lucide-react";
import { JSX } from "react";
import ProblemCategories from "@/modules/home/components/problemCategories";
import CTA from "@/modules/home/components/CTA";

export default async function Home() {
  await onBoardUser();

  type Feature = {
    icon: JSX.Element;
    title: string;
    description: string;
  };

  const features: Feature[] = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Hands-On Coding Practice",
      description:
        "Solve real-world challenges with instant evaluations designed to sharpen your problem-solving skills.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Progress That Matters",
      description:
        "Track your improvement with meaningful analytics, milestones, and achievement metrics.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Developer Community",
      description:
        "Connect with global developers, share solutions, and learn collaboratively.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Feedback Loop",
      description:
        "Receive real-time feedback with actionable insights to help you iterate and improve quickly.",
    },
  ];


  return (
    <div className="w-full h-full mt-10">
      {/* LANDING SECTION */}
      <section id="landing">
        <div className="absolute inset-0 -z-10 w-full h-screen bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-repeat bg-size-[16px_16px] dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-repeat dark:bg-size- dark:bg-top-left" />
        <LandingPage />
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-[#111111] rounded-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Tools to Help You{" "}
              <span className="text-[#3d0ef6]">
                Level Up
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A powerful platform built for developers who want to learn smarter,
              practice consistently, and grow with measurable progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${index % 2 === 0
                        ? "bg-amber-100 dark:bg-amber-900"
                        : "bg-indigo-100 dark:bg-indigo-900"
                      } rounded-xl flex items-center justify-center ${index % 2 === 0
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-indigo-600 dark:text-indigo-400"
                      } mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM CATEGORIES */}
      <section id="problems" className="py-24">
        <ProblemCategories />
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-linear-to-r from-[#5A25FF] to-purple-300 dark:from-amber-600 dark:to-indigo-600 rounded-md">
        <CTA />
      </section>

    </div>
  );
}
