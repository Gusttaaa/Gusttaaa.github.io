import { ArrowDownToLine } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { cv } from "@/data/profile";
import { useLang } from "@/i18n/lang";

export function About() {
  const { lang, t } = useLang();

  return (
    <section id="about" className="sec about" data-scene="about" aria-labelledby="about-title">
      <div className="wrap grid">
        <h2 id="about-title" className="label">
          {t.about.title}
        </h2>
        <div className="col">
          <ScrollWords className="big" text={t.about.lead} />

          <ul className="stats">
            {t.about.stats.map((stat, i) => (
              <Reveal as="li" key={stat.label} delay={i}>
                <p className="stat-n">
                  {stat.prefix}
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="stat-l">{stat.label}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="about-more">
            <p>{t.about.more}</p>
            <a className="more" href={cv[lang]} download>
              {t.about.cv}
              <ArrowDownToLine aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
