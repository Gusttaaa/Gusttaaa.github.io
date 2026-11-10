import { useLang } from "@/i18n/lang";

/** Status do projeto em texto. O ponto verde só aparece quando há link público. */
export function StatusTag({ status, long = false }) {
  const { t } = useLang();
  return <span className={status === "live" ? "status live" : "status"}>{long ? t.statusLong[status] : t.status[status]}</span>;
}
