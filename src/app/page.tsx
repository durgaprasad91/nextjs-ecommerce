import Hero from "./components/HeroSection/Hero";
import DealsOfTheDay from "./components/HeroSection/DealsOfTheDay";
import TrendingCategories from "./components/HeroSection/TrendingCategories";
import BestSellerSlider from "./components/HeroSection/BestSellerSlider";
import FeaturedProducts from "./components/HeroSection/FeaturedProducts";
import BigPromoBanner from "./components/HeroSection/BigPromoBanner";
import BrandsSection from "./components/HeroSection/BrandsSection";
import CollectionsSection from "./components/HeroSection/CollectionsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <DealsOfTheDay />
      <TrendingCategories />
      <BestSellerSlider />
      <FeaturedProducts />
      <BigPromoBanner />
      <BrandsSection />
      <CollectionsSection />
    </>
  );
}
