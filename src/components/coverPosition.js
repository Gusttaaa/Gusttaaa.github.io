/** Onde ancorar a imagem de um projeto quando ela é cortada para um quadro 16:9. */
export function coverPosition(media) {
  if (media.shot === "truck") return "0% 0%";
  return `${media.focus?.[0] ?? "50%"} 0%`;
}
