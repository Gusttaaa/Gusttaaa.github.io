import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/** Usar `/#secao` para âncoras funcionarem a partir de qualquer rota (ex.: /projects). */
const navLinks = [
    { to: "/#about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/#experience", label: "Experience" },
    { to: "/#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
    const navigate = useNavigate();
    const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const[isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <header className={`fixed top-0 left-0 right-0 bg-transparent transition-all duration-500 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"} py-5 z-50`}>
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-light hover:text-primary">
                    GFB<span className="text-primary">.</span>
                </Link>


                <div className="hidden md:flex items-center gap-1 ">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <Link to={link.to} key={index} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface ">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link to="/#contact">
                        <Button size="sm">
                            Contact Me
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button (hamburger icon) */}
                <button className="md:hidden p-2 text-foreground cursor-pointer" onClick={() => setIsMobileMenuOpen((prev) => !prev) }>
                   {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>

                {/* Mobile menu */}        
                {isMobileMenuOpen && (
                    <div className="md:hidden glass-strong absolute top-full left-0 right-0 animate-fade-in">
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                            <Link to={link.to} key={index} onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-muted-foreground hover:text-foreground py-2">
                                {link.label}
                            </Link>
                            ))}

                            <Button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigate("/#contact");
                                }}
                            >
                                Contact Me
                            </Button>
                        </div>
                </div>
                )}
            </nav>
        </header>
    );
}