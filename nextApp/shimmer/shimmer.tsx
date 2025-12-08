"use client";
import { ShimmerCategoryList } from "react-shimmer-effects";

const Shimmer = () => {
    return <div className="absolute inset-0 z-50 dark:bg-gray-800">
        <ShimmerCategoryList title items={6} categoryStyle="STYLE_SEVEN"   />
    </div>
}

export default Shimmer;
