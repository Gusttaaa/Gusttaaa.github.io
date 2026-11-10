import { OrbitStage } from "@/components/OrbitStage";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLang } from "@/i18n/lang";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Featured } from "@/sections/Featured";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";

export function Home() {
  const { t } = useLang();
  usePageMeta(t.meta.title, t.meta.description);

  return (
    <>
      <OrbitStage label={t.hero.sceneAlt} />
      <Hero />
      <About />
      <Services />
      <Featured />
      <Experience />
      <Contact />
    </>
  );
}
