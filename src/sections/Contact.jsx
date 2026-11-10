import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { contact, cv } from "@/data/profile";
import { useLang } from "@/i18n/lang";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", message: "" };

/** As chaves do EmailJS entram no build pelos secrets do repositório (ver README). */
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function validate(values, t) {
  const errors = {};
  if (!values.name.trim()) errors.name = t.contact.errName;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = t.contact.errEmail;
  if (!values.message.trim()) errors.message = t.contact.errMessage;
  return errors;
}

function mailtoHref(values, t) {
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const { t } = useLang();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const formRef = useRef(null);
  const sentRef = useRef(null);

  // Leva o foco para a confirmação, para leitores de tela anunciarem o envio.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  const writeAgain = () => {
    setStatus("idle");
    window.requestAnimationFrame(() => formRef.current?.elements.name?.focus());
  };

  const setField = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // Depois de um erro, corrige a mensagem enquanto a pessoa digita.
    if (errors[field]) setErrors(validate(next, t));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values, t);
    setErrors(found);
    const firstInvalid = ["name", "email", "message"].find((field) => found[field]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    setStatus("sending");
    try {
      const { serviceId, templateId, publicKey } = emailConfig;
      if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS is not configured");
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() },
        publicKey,
      );
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      // A mensagem digitada fica no formulário e vira um e-mail pronto.
      setStatus("failed");
    }
  };

  const field = (name, label, props) => {
    const shared = {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: setField(name),
      "aria-invalid": errors[name] ? "true" : undefined,
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
      ...props,
    };
    return (
      <div className="field">
        <label htmlFor={`contact-${name}`}>{label}</label>
        {props.rows ? <textarea {...shared} /> : <input {...shared} />}
        {errors[name] && (
          <p id={`contact-${name}-error`} className="field-error">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const external = (href, label) => (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
      <span className="sr-only"> ({t.footer.external})</span>
    </a>
  );

  return (
    <section id="contact" className="sec contact" data-scene="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal as="h2" id="contact-title" className="display">
          {t.contact.title}
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-side">
            <p className="contact-intro">{t.contact.intro}</p>
            <h3 className="sr-only">{t.contact.direct}</h3>
            <dl className="direct">
              <div>
                <dt>{t.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>{t.contact.phoneLabel}</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>{t.contact.networks}</dt>
                <dd className="links">
                  {external(contact.linkedin, "LinkedIn")}
                  {external(contact.github, "GitHub")}
                  {external(contact.instagram, "Instagram")}
                </dd>
              </div>
              <div>
                <dt>{t.contact.cvTitle}</dt>
                <dd className="links">
                  <a href={cv.pt} download>
                    {t.contact.cvPt}
                  </a>
                  <a href={cv.en} download>
                    {t.contact.cvEn}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="contact-form">
            {status === "sent" ? (
              <div className="sent" role="status" tabIndex={-1} ref={sentRef}>
                <p className="sent-title">{t.contact.sentTitle}</p>
                <p>{t.contact.sent}</p>
                <button type="button" className="btn ghost" onClick={writeAgain}>
                  {t.contact.again}
                </button>
              </div>
            ) : (
              <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
                {field("name", t.contact.name, {
                  type: "text",
                  autoComplete: "name",
                  placeholder: t.contact.namePlaceholder,
                })}
                {field("email", t.contact.email, {
                  type: "email",
                  autoComplete: "email",
                  inputMode: "email",
                  placeholder: t.contact.emailPlaceholder,
                })}
                {field("message", t.contact.message, {
                  rows: 4,
                  placeholder: t.contact.messagePlaceholder,
                })}

                <button type="submit" className="btn" disabled={status === "sending"}>
                  {status === "sending" ? t.contact.sending : t.contact.send}
                  {status === "sending" && <span className="spinner" aria-hidden="true" />}
                </button>

                <div role="alert">
                  {status === "failed" && (
                    <div className="form-alert">
                      <p>{t.contact.failed}</p>
                      <a className="btn ghost" href={mailtoHref(values, t)}>
                        {t.contact.mailto}
                      </a>
                    </div>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
