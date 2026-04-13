import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/layout/Navbar";
import { About } from "@/sections/About";
import { Projects, HOME_PROJECTS_LIMIT } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { ProjectsPage } from "@/projects/ProjectsPage";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ScrollToTop } from "@/components/ScrollToTop";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects maxItems={HOME_PROJECTS_LIMIT} />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
