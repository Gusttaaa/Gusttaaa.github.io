import { useRef, useState } from "react";
import { useLang } from "@/i18n/lang";

/** As três frentes de trabalho, em abas: o título à esquerda escolhe o texto à direita. */
export function Services() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const items = t.services.items;

  const select = (index, focus = false) => {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event, index) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (event.key === "Home") select(0, true);
    else if (event.key === "End") select(items.length - 1, true);
    else if (step) select((index + step + items.length) % items.length, true);
    else return;
    event.preventDefault();
  };

  return (
    <section className="sec services" data-scene="services" aria-labelledby="services-title">
      <div className="wrap">
        <h2 id="services-title" className="label">
          {t.services.title}
        </h2>
        <div className="svc">
          <div className="svc-list" role="tablist" aria-label={t.services.tabsLabel} aria-orientation="vertical">
            {items.map((item, i) => (
              <button
                key={i}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`svc-tab-${i}`}
                className="svc-tab"
                aria-selected={i === active}
                aria-controls={`svc-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                onPointerEnter={(event) => event.pointerType === "mouse" && select(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <svg className="svc-mark" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 1.5 18.5 10 10 18.5 1.5 10z" />
                  <path className="in" d="M10 7l3 3-3 3-3-3z" />
                </svg>
                {item.title}
              </button>
            ))}
          </div>

          <div className="svc-panels">
            {items.map((item, i) => (
              <div
                key={i}
                role="tabpanel"
                id={`svc-panel-${i}`}
                className="svc-panel"
                aria-labelledby={`svc-tab-${i}`}
                hidden={i !== active}
              >
                <p>{item.text}</p>
                <ul className="pills">
                  {item.tags.map((tag, n) => (
                    <li key={tag} style={{ "--n": n + 2 }}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
