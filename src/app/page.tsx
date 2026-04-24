import { Hero } from "@/components/Hero";
import { Subscription } from "@/components/Subscription";
import { Audience } from "@/components/Audience";
import { Consultant } from "@/components/Consultant";
import { Team } from "@/components/Team";
import { UniversoIdee } from "@/components/UniversoIdee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ValueLabCard } from "@/components/ValueLabCard";
import { getValueLab } from "@/lib/contentful";

export default async function Home() {
  const lab = await getValueLab();
  return (
    <main>
      <ValueLabCard lab={lab} />
      <Hero />
      <ScrollReveal>
        <Subscription />
      </ScrollReveal>
      <ScrollReveal>
        <Audience />
      </ScrollReveal>
      <ScrollReveal>
        <Consultant />
      </ScrollReveal>
      <ScrollReveal>
        <Team />
      </ScrollReveal>
      <ScrollReveal>
        <UniversoIdee />
      </ScrollReveal>
    </main>
  );
}
