import CtaSection from "@/components/home/CtaSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Hero from "@/components/home/Hero";
import JobSection from "@/components/home/JobSection";
import PricingSection from "@/components/home/PricingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero></Hero>
      <JobSection></JobSection>
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection>
      <CtaSection></CtaSection>
    </div>
  );
}
