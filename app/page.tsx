import Hero from "@/components/home/Hero";
import BrandRibbon from "@/components/home/BrandRibbon";
import CategoryIndex from "@/components/home/CategoryIndex";
import StoryBand from "@/components/home/StoryBand";
import FeaturedRanges from "@/components/home/FeaturedRanges";
import BrandPlates from "@/components/home/BrandPlates";
import EnquiryBand from "@/components/home/EnquiryBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandRibbon />
      <CategoryIndex />
      <StoryBand />
      <FeaturedRanges />
      <BrandPlates />
      <EnquiryBand />
    </>
  );
}
