import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IFeatures } from "@/types/types";
import { Code2, Trophy, Users, Zap } from "lucide-react";



const Features = () => {

    const features: IFeatures[] = [
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
    )
}

export default Features