import { Projects } from "@/sections/Projects";

/**
 * Página dedicada de projetos — reutiliza a mesma seção da home,
 * com espaço extra no topo por causa do navbar fixo.
 */
export function ProjectsPage() {
  return (
    <div className="pt-24">
      <Projects />
    </div>
  );
}
