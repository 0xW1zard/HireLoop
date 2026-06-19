import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero"));
const JobSection = dynamic(() => import("@/components/home/JobSection"));
const FeaturesSection = dynamic(() => import("@/components/home/FeaturesSection"));
const PricingSection = dynamic(() => import("@/components/home/PricingSection"));
const CtaSection = dynamic(() => import("@/components/home/CtaSection"));

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
