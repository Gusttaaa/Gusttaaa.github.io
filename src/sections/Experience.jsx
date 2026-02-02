
const experiences = [
    {
        period: "2025 - 2025",
        role: "Work & Travel",
        company: "The Highlands at Harbor Springs",
        description: "Participation in an exchange program in the United States, with various activities outside the technology field. This opportunity directly contributed to English fluency, as well as the development of interpersonal, cultural, and adaptability skills in new environments.",
        technologies: ["English", "Customer Service", "Adaptability"],
        current: false,
    },
    {
        period: "2024 - 2025",
        role: "Junior Developer",
        company: "Ninja Studios + Level 8 ",
        description: "Specialized in Unreal Engine 5 multiplayer development at Ninja Studios + Level 8. I architected and optimized key features like Season Pass systems and Boss mechanics from the ground up. My role focused on delivering clean, performant code, resolving complex integration conflicts, and ensuring a polished final product for players.",
        technologies: ["Verse", "Unreal Engine 5", "C++", "Git", "JavaScript"],
        current: false,
    },
    {
        period: "2024 - 2024",
        role: "Junior Developer",
        company: "Tomatos MetaVerse",
        description: "As a core LUA developer for Tomatos, I was responsible for creating and optimizing gameplay systems on the GTA V FiveM platform. I developed numerous scripts for core multiplayer mechanics, including a complex hospital system, vehicle mechanics, and other essential roleplay features. My work in structuring and optimizing the LUA codebase was essential for improving the server's operational efficiency and overall service quality for the players.",
        technologies: ["LUA", "FiveM", "Git", "JavaScript", "MySQL"],
        current: false,
    },
    {
        period: "2021 - 2023",
        role: "Internship Developer",
        company: "Portal Lubes",
        description: "Inserting and editing news on the website using WordPress, with customization in HTML, CSS, and JavaScript. First professional experience, contributing significantly to the development of responsibility, organization, and communication in the work environment.",
        technologies: ["React", "WordPress", "HTML", "CSS", "JavaScript"],
        current: false,
    },
    
]

export const Experience = () => {
    return (
        <section id="experience" className="py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"/>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <span className=" text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">Career Journey</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Experience that <span className="font-serif italic font-normal text-white"> makes a difference.</span>
                    </h2>

                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        Over the years, I've had the privilege of working on diverse projects that have honed my skills and expanded my expertise. Each experience has contributed to my growth as a developer and shaped my approach to creating impactful digital solutions.
                    </p>
                </div>

                {/* Timeline */}

                <div className="relative">
                    <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]"/>

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.map((exp, idx) => (
                           <div key={idx} className="relative grid md:grid-cols-2 gap-8 animate-fade-in" style={{animationDelay: `${(idx + 1) * 150}ms`}}>
        
                            {/* Time line dot */}
                            <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                                {exp.current && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"/>}
                            </div>

                            {/* Content */}

                            <div className={`pl-8 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                                <div className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500 `}>
                                    <span className="text-sm text-primary font-medium">{exp.period}</span>
                                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                                    <p className="text-muted-foreground ">{exp.company}</p>
                                    <p className="text-sm text-muted-foreground mt-4">{exp.description}</p>
                                    <div className={`flex flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "md:justify-end" : ""}`}>{exp.technologies.map((tech, techIdx) => (
                                        <span key={techIdx} className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground">{tech}</span>
                                    ))}</div>
                                </div>
                            </div>

                           </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}