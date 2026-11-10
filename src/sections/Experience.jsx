import { Reveal } from "@/components/Reveal";
import { abroad, experience, skills } from "@/data/profile";
import { pick, useLang } from "@/i18n/lang";

/** A trajetória, um cargo por linha: cargo e empresa, o que foi feito, quando. */
export function Experience() {
  const { lang, t } = useLang();

  const rows = experience.flatMap((job) =>
    job.roles.map((role) => ({
      key: `${job.org}-${role.title.pt}`,
      title: pick(role.title, lang),
      org: job.org,
      period: pick(role.period ?? job.period, lang),
      points: pick(role.points, lang),
    })),
  );

  return (
    <section id="experience" className="sec xp-sec" data-scene="rest" aria-labelledby="experience-title">
      <div className="wrap grid">
        <h2 id="experience-title" className="label">
          {t.experience.title}
        </h2>
        <div className="col">
          <ol className="xp">
            {rows.map((row) => (
              <Reveal as="li" key={row.key} className="xp-row">
                <div className="xp-head">
                  <h3>{row.title}</h3>
                  <p>{row.org}</p>
                </div>
                <ul className="xp-text">
                  {row.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="xp-when">{row.period}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal as="dl" className="facts">
            <div>
              <dt>{t.experience.education}</dt>
              <dd>
                {t.experience.degree}
                <span>{t.experience.school}</span>
              </dd>
            </div>
            <div>
              <dt>{t.experience.languages}</dt>
              <dd>{t.experience.languagesValue}</dd>
            </div>
            <div>
              <dt>{t.experience.abroad}</dt>
              <dd>
                {pick(abroad.title, lang)}
                <span>{pick(abroad.detail, lang)}</span>
              </dd>
            </div>
          </Reveal>

          <Reveal className="skills">
            <h3 className="label">{t.experience.skills}</h3>
            <dl>
              {skills.map((group) => {
                const items = lang === "en" && group.itemsEn ? group.itemsEn : group.items;
                return (
                  <div key={group.title.pt}>
                    <dt>{pick(group.title, lang)}</dt>
                    <dd>{items.join(", ")}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>
      {/* Até aqui a cena 3D fica apagada; ela volta logo antes do contato. */}
      <span className="scene-mark" data-scene="rest" aria-hidden="true" />
    </section>
  );
}
