import { Code2, Rocket, Users, Lightbulb } from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Clean Code",
        description: "Building robust architectures with a focus on long-term maintainability."
    },
    {
        icon: Rocket,
        title: "Performance",
        description: "Maximizing efficiency and reducing load times for high-performing apps."
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working closely with cross-functional teams to turn ideas into reality."
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Delivering creative solutions using the latest tools and frameworks."
    },
]

export const About = () => {
    return (
        <section id="about" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/*Left Column */}
                    <div className="space-y-8 ">
                        <div className="animate-fade-in">
                            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">About me</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
                            Building the future, 
                            <span className="font-serif italic font-normal text-white"> one line of code at a time.</span>
                        </h2>
 
                        <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
                            <p>
                                I'm a passionate developer specialized in web technologies and automation. I love bridging the gap between clean code and creative solutions, from dynamic websites to immersive game scripting.
                            </p>
                            <p>
                                When I'm not coding, you'll find me training Muay Thai, grinding in competitive FPS games, or exploring the latest in game development tech.
                            </p>
                            <p>
                                Feel free to reach out if you'd like to discuss potential collaborations, share ideas, or just chat about all things tech!
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
                            <p className="text-lg font-medium italic text-foreground">
                                My mission is to simplify complexity through code, leveraging automation and modern web technologies to create products that solve real problems and elevate the user experience.
                            </p>
                        </div>
                    </div>
                    {/*Right Column - Highlights */}

                    <div className="grid sm:grid-cols-2 gap-6">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="glass p-6 rounded-2xl animate-fade-in" style={{animationDelay: `${(idx + 1) * 100}ms`}}>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20"><item.icon className="w-6 h-6 text-primary" /></div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};