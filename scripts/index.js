AOS.init();
const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.navbar_mobile');
const button = document.querySelector('.burguer');

button.addEventListener('click', function(){
    mobileNavbar.classList.toggle('active');
});

window.addEventListener('scroll', function(){
    if (this.window.pageYOffset > 0) return navbar.classList.add('active');

    return navbar.classList.remove('active');
    
})


document.getElementById("language-toggle").addEventListener("click", function () {
    this.classList.toggle("active");

    if (document.documentElement.lang === "pt-BR") {
        document.documentElement.lang = "en";
        console.log("Idioma alterado para inglês");
    } else {
        document.documentElement.lang = "pt-BR";
        console.log("Idioma alterado para português");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const languageToggle = document.getElementById("language-toggle");
    let currentLanguage = "pt";

    function updateTextContent(language) {
        // --- NAVBAR (DESKTOP) ---
        document.querySelector('.navbar_links a[href="#header"]').textContent = translations[language]["inicio"];
        document.querySelector('.navbar_links a[href="#about"]').textContent = translations[language]["sobre"];
        document.querySelector('.navbar_links a[href="#skills"]').textContent = translations[language]["habilidades"];
        document.querySelector('.navbar_links a[href="#projects"]').textContent = translations[language]["projetos"];
        document.querySelector('.navbar_links a[href="#footer"]').textContent = translations[language]["contato"];
        
        // --- NAVBAR (MOBILE) ---
        document.querySelector('.mobile_links a[href="#header"]').textContent = translations[language]["inicio"];
        document.querySelector('.mobile_links a[href="#about"]').textContent = translations[language]["sobre"];
        document.querySelector('.mobile_links a[href="#skills"]').textContent = translations[language]["habilidades"];
        document.querySelector('.mobile_links a[href="#projects"]').textContent = translations[language]["projetos"];
        document.querySelector('.mobile_links a[href="#footer"]').textContent = translations[language]["contato"];
    
        // --- HEADER ---
        document.querySelector(".header_left h1").textContent = translations[language]["ola"];
        document.querySelector(".header_left p").textContent = translations[language]["descricao"];
        document.querySelector(".btn-primary").textContent = translations[language]["saiba_mais"];
    
        // --- ABOUT ---
        document.querySelector(".about_left h2").textContent = translations[language]["quem_sou"];
        document.querySelector(".about_left p").textContent = translations[language]["conectar"];
        document.querySelector(".about_right h3").textContent = translations[language]["desenvolvedor_titulo"];
        document.querySelector(".about_right p:nth-of-type(1)").textContent = translations[language]["desenvolvedor_desc"];
        document.querySelector(".about_right p:nth-of-type(2)").textContent = translations[language]["programacao_paixao"];
    
        // --- SKILLS ---
        document.querySelector(".skills_content h2").textContent = translations[language]["ferramentas"];
        document.querySelector(".skills_content .description").textContent = translations[language]["desc_ferramentas"];
        document.querySelector(".skills_item:nth-of-type(1) h3").textContent = translations[language]["desenvolvimento_web"];
        document.querySelector(".skills_item:nth-of-type(1) p").textContent = translations[language]["desenvolvimento_web_desc"];
        document.querySelector(".skills_item:nth-of-type(2) h3").textContent = translations[language]["web_design"];
        document.querySelector(".skills_item:nth-of-type(2) p").textContent = translations[language]["web_design_desc"];
        document.querySelector(".skills_item:nth-of-type(3) h3").textContent = translations[language]["ux_ui_design"];
        document.querySelector(".skills_item:nth-of-type(3) p").textContent = translations[language]["ux_ui_design_desc"];
        document.querySelector(".skills_item:nth-of-type(4) h3").textContent = translations[language]["programacao_backend"];
        document.querySelector(".skills_item:nth-of-type(4) p").textContent = translations[language]["programacao_backend_desc"];
        
        // --- PROJECTS ---
        // Usamos .innerHTML aqui para manter a tag <span> que estiliza a palavra "Projetos"
        document.querySelector("#projects .heading").innerHTML = translations[language]["meus_projetos_html"];
        
        // Card 1: Ninja Studios
        document.querySelector(".project-card.featured .project-layer h4").textContent = translations[language]["ninja_titulo"];
        document.querySelector(".project-card.featured .project-layer p").textContent = translations[language]["ninja_desc"];
    
        // Card 2: Chatbot Imobiliária
        document.querySelector(".project-card.small-1 .project-layer h4").textContent = translations[language]["chatbot_titulo"];
        document.querySelector(".project-card.small-1 .project-layer p").textContent = translations[language]["chatbot_desc"];
    
        // Card 3: Gustaflix
        document.querySelector(".project-card.small-2 .project-layer h4").textContent = translations[language]["gustaflix_titulo"];
        document.querySelector(".project-card.small-2 .project-layer p").textContent = translations[language]["gustaflix_desc"];
        
        // Card 4: Tomatos Meta-verso
        document.querySelector(".project-card.small-3 .project-layer h4").textContent = translations[language]["tomatos_titulo"];
        document.querySelector(".project-card.small-3 .project-layer p").textContent = translations[language]["tomatos_desc"];
    
        // Card 5: CataLendas
        document.querySelector(".project-card.small-4 .project-layer h4").textContent = translations[language]["catalendas_titulo"];
        document.querySelector(".project-card.small-4 .project-layer p").textContent = translations[language]["catalendas_desc"];
    
        // --- FOOTER ---
        document.querySelector("#footer h2").textContent = translations[language]["contato_titulo"];
        // O seletor abaixo é mais específico para evitar conflito com o copyright
        document.querySelector("#footer .footer_content > p.mb-m").textContent = translations[language]["contato_texto"];
        document.querySelector(".footer_contact span:nth-child(1)").textContent = translations[language]["email"];
        document.querySelector(".footer_contact span:nth-child(2)").textContent = translations[language]["telefone"];
        document.querySelector(".footer_copyright").textContent = translations[language]["direitos"];
    }

    languageToggle.addEventListener("click", function () {
        currentLanguage = currentLanguage === "pt" ? "en" : "pt";
        updateTextContent(currentLanguage);
    });
});
