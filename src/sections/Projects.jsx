import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const projects = [
    {
        title: "Ninja Studios + Level 8",
        description: "Specialized in Unreal Engine 5 multiplayer development at Ninja Studios + Level 8. I architected and optimized key features like Season Pass systems and Boss mechanics from the ground up. My role focused on delivering clean, performant code, resolving complex integration conflicts, and ensuring a polished final product for players.",
        image: "/projects/DinoFort.png",
        tags: ["Verse", "JavaScript", "Unreal Engine 5"],
        link: "https://www.youtube.com/watch?v=pxXDWfB2y80",
        githublink: "#",
    },
    {
        title: "Real Estate Chatbot with n8n",
        description: "Customer service automation for the real estate sector with WhatsApp, qualifying leads and scheduling visits.",
        image: "/projects/n8n.png",
        tags: ["N8N", "JavaScript", "Automation"],
        link: "#",
        githublink: "#",
    },
    {
        title: "Gustaflix",
        description: "A responsive React application that simulates a premium streaming experience. Users can browse real-time Top 10 charts fetched from an external API and manage their own library by adding or removing titles seamlessly.",
        image: "/projects/GustaFlix.png",
        tags: ["React", "Node.js", "CSS", "API Integration"],
        link: "https://gustaflix.netlify.app/",
        githublink: "https://github.com/Gusttaaa/Gusta-Flix-React-JS",
    },
    {
        title: "Tomatos Metaverse",
        description: "As a Junior Developer, I played a key role in building the Tomatos MetaVerse ecosystem on FiveM (GTA RP). I developed custom scripts and gameplay features from scratch, focusing on solid programming logic and maintaining a clean, scalable project structure.",
        image: "/projects/Tomatos.png",
        tags: ["LUA", "React", "FiveM", "MySQL", "JavaScript"],
        link: "#",
        githublink: "#",
    },
];

export const Projects = () => {
    return (
        <section id="projects" className="py-32 relative overflow-hidden ">
            {/* Background Effects */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">Featured Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Projects that
                        <span className="font-serif italic font-normal text-white"> make an impact.</span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        Here are some of the projects I've worked on recently. Each one reflects my commitment to quality, innovation, and delivering real value through code.
                    </p>
                </div>

                {/* Projects Grid */}

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx} className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1" style={{animationDelay: `${(idx + 1) * 100}ms`}}>
                            {/* Image */}
                            <div className="relative overflow-hidden aspect-video">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                                {/* Overlay Links */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href={project.link} className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                                        <ArrowUpRight className="w-5 h-5"/>
                                    </a>
                                    <a href={project.githublink} className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Github className="w-5 h-5"/>
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4 ">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
                                </div>
                                <p className="text-muted-foreground text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2 ">{project.tags.map((tag, tagIdx) => (
                                    <span key={tagIdx} className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300">{tag}</span>
                                ))}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12 animate-fade-in animation-delay-500">
                    <AnimatedBorderButton >
                        View All Projects
                        <ArrowUpRight className="w-5 h-5"/>
                    </AnimatedBorderButton>
                </div>

            </div>
            
        </section>
    );
}