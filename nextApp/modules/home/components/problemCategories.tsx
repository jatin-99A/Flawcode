import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProblemCategory } from "@/types/types";


const ProblemCategories = () => {

    const problemCategories: IProblemCategory[] = [
        {
            level: "Beginner",
            title: "Easy Problems",
            description:
                "Build a solid foundation with beginner friendly problems focused on core concepts and syntax clarity.",
            count: "500+ Problems",
            color: "amber",
        },
        {
            level: "Intermediate",
            title: "Medium Problems",
            description:
                "Enhance your DSA fundamentals with structured challenges that require strategic thinking.",
            count: "800+ Problems",
            color: "indigo",
        },
        {
            level: "Advanced",
            title: "Hard Problems",
            description:
                "Master complex algorithms and prepare yourself for competitive programming and top tier interviews.",
            count: "300+ Problems",
            color: "amber",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Pick Your{" "}
                    <span className="text-[#3d0ef6] dark:text-indigo-400">
                        Next Challenge
                    </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Whether you're starting out or preparing for advanced interviews,
                    choose problems that push your limits.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {problemCategories.map((category, index) => (
                    <Card
                        key={index}
                        className={`border-2 hover:shadow-lg transition-all duration-200 ${category.color === "amber"
                            ? "bg-amber-50 dark:bg-amber-950/30 backdrop-blur-sm border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700"
                            : "bg-indigo-50 dark:bg-indigo-950/30 backdrop-blur-sm bg border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                            }`}
                    >
                        <CardHeader>
                            <Badge
                                variant="secondary"
                                className={`w-fit ${category.color === "amber"
                                    ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
                                    : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                                    }`}
                            >
                                {category.level}
                            </Badge>
                            <CardTitle className="text-gray-900 dark:text-white">
                                {category.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <CardDescription className="text-gray-600 dark:text-gray-300">
                                {category.description}
                            </CardDescription>
                            <div
                                className={`font-semibold ${category.color === "amber"
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-indigo-600 dark:text-indigo-400"
                                    }`}
                            >
                                {category.count}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ProblemCategories