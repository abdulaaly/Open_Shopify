import React from "react";
import { HeroSection } from "../components/HeroSection";
import { MetricsTicker } from "../components/MetricsTicker";
import { OmnichannelShowcase } from "../components/OmnichannelShowcase";
import { PricingComparison } from "../components/PricingComparison";
import { DeveloperPlayground } from "../components/DeveloperPlayground";

export default function MarketingPage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <MetricsTicker />
      <OmnichannelShowcase />
      <PricingComparison />
      <DeveloperPlayground />
    </div>
  );
}
