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
        document.querySelector('a[href="#header"]').textContent = translations[language]["inicio"];
        document.querySelector('a[href="#about"]').textContent = translations[language]["sobre"];
        document.querySelector('a[href="#skills"]').textContent = translations[language]["habilidades"];
        document.querySelector('a[href="#projects"]').textContent = translations[language]["projetos"];
        document.querySelector('a[href="#footer"]').textContent = translations[language]["contato"];

        document.querySelector(".header_left h1").textContent = translations[language]["ola"];
        document.querySelector(".header_left p").textContent = translations[language]["descricao"];
        document.querySelector(".btn-primary").textContent = translations[language]["saiba_mais"];

        document.querySelector(".about_left h2").textContent = translations[language]["quem_sou"];
        document.querySelector(".about_left p").textContent = translations[language]["conectar"];

        document.querySelector(".skills_content h2").textContent = translations[language]["ferramentas"];
        document.querySelector(".skills_content .description").textContent = translations[language]["desc_ferramentas"];

        document.querySelector(".projects_content h2").textContent = translations[language]["projetos_destaque"];
        document.querySelector(".projects_content p").textContent = translations[language]["desc_projetos"];

        document.querySelector("#footer h2").textContent = translations[language]["contato_titulo"];
        document.querySelector("#footer p").textContent = translations[language]["contato_texto"];
        document.querySelector(".footer_contact span:nth-child(1)").textContent = translations[language]["email"];
        document.querySelector(".footer_contact span:nth-child(2)").textContent = translations[language]["telefone"];
        document.querySelector(".footer_copyright").textContent = translations[language]["direitos"];
        document.querySelector(".about_right h3").textContent = translations[language]["desenvolvedor_titulo"];
        document.querySelector(".about_right p:nth-of-type(1)").textContent = translations[language]["desenvolvedor_desc"];
        document.querySelector(".about_right p:nth-of-type(2)").textContent = translations[language]["programacao_paixao"];

        document.querySelector(".skills_item:nth-of-type(1) h3").textContent = translations[language]["desenvolvimento_web"];
        document.querySelector(".skills_item:nth-of-type(1) p").textContent = translations[language]["desenvolvimento_web_desc"];

        document.querySelector(".skills_item:nth-of-type(2) h3").textContent = translations[language]["web_design"];
        document.querySelector(".skills_item:nth-of-type(2) p").textContent = translations[language]["web_design_desc"];

        document.querySelector(".skills_item:nth-of-type(3) h3").textContent = translations[language]["ux_ui_design"];
        document.querySelector(".skills_item:nth-of-type(3) p").textContent = translations[language]["ux_ui_design_desc"];

        document.querySelector(".skills_item:nth-of-type(4) h3").textContent = translations[language]["programacao_backend"];
        document.querySelector(".skills_item:nth-of-type(4) p").textContent = translations[language]["programacao_backend_desc"];

        document.querySelector(".projects li:nth-of-type(1) .projects_info h3").textContent = translations[language]["tomatos_titulo"];
        document.querySelector(".projects li:nth-of-type(1) .projects_info p").textContent = translations[language]["tomatos_desc"];

        document.querySelector(".projects li:nth-of-type(3) .projects_info h3").textContent = translations[language]["gustaflix_titulo"];
        document.querySelector(".projects li:nth-of-type(3) .projects_info p").textContent = translations[language]["gustaflix_desc"];

        document.querySelector(".projects li:nth-of-type(1) .projects_info a").textContent = translations[language]["leiamais"]
        document.querySelector(".projects li:nth-of-type(2) .projects_info a").textContent = translations[language]["leiamais"]
        document.querySelector(".projects li:nth-of-type(3) .projects_info a").textContent = translations[language]["leiamais"]
    }

    languageToggle.addEventListener("click", function () {
        currentLanguage = currentLanguage === "pt" ? "en" : "pt";
        updateTextContent(currentLanguage);
    });
});
