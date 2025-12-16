import { onBoardUser } from "@/modules/auth/actions";
import LandingPage from "@/modules/home/components/landingPage";
import ProblemCategories from "@/modules/home/components/problemCategories";
import CTA from "@/modules/home/components/CTA";
import Features from "@/modules/home/components/features";

export default async function Home() {
  await onBoardUser();

  return (
    <div className="w-full h-full mt-10">
      {/* LANDING SECTION */}
      <section id="landing">
        <LandingPage />
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-[#111111] rounded-md">
        <Features />
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
