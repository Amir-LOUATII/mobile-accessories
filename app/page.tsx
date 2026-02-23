import { Header } from "@/components/header";
import CategoriesSection from "@/components/home/categories-section";
import { CtaSection } from "@/components/home/cta-section";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import TrustStatsBar from "@/components/home/trust-stats-bar";
import {
  BatteryCharging,
  Cable,
  Headphones,
  Shield,
  Smartphone,
  Zap
} from "lucide-react";

const FEATURED_CATEGORIES = [
  {
    name: "Coques & Étuis",
    icon: Smartphone,
    count: "1200+",
    gradient: "from-indigo-500/15 to-violet-500/5",
  },
  {
    name: "Chargeurs",
    icon: Zap,
    count: "450+",
    gradient: "from-amber-500/15 to-orange-500/5",
  },
  {
    name: "Câbles",
    icon: Cable,
    count: "800+",
    gradient: "from-blue-500/15 to-cyan-500/5",
  },
  {
    name: "Audio",
    icon: Headphones,
    count: "350+",
    gradient: "from-purple-500/15 to-fuchsia-500/5",
  },
  {
    name: "Batteries",
    icon: BatteryCharging,
    count: "200+",
    gradient: "from-emerald-500/15 to-green-500/5",
  },
  {
    name: "Protections",
    icon: Shield,
    count: "900+",
    gradient: "from-rose-500/15 to-pink-500/5",
  },
];



export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero Section ── */}
       <Hero/>
        {/* ── Trust Stats Bar ── */}
       <TrustStatsBar/>
        {/* ── Categories Section ── */}
       <CategoriesSection/>
        {/* ── Features Section ── */}
       <FeaturesSection/>

        {/* ── CTA Section ── */}
       <CtaSection/>

        {/* ── Footer ── */}
        <Footer/>
      </main>
    </>
  );
}
