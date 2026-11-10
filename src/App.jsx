import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/layout/Layout";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProjectsPage } from "@/pages/ProjectsPage";

/**
 * Uma única árvore de rotas atende os dois idiomas: "/en" é um segmento
 * opcional. Assim, trocar de idioma mantém a página montada e as paletas
 * viram no lugar, em vez de a página recarregar.
 */
const router = createBrowserRouter([
  {
    path: "/en?",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:slug", element: <ProjectPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
