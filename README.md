# Portfólio de Gustavo Fontenelle Belmiro

Site pessoal publicado em https://gusttaaa.github.io/. Fundo preto, tipografia leve e uma cena 3D na página inicial: um anel de telas dos projetos gira em volta do retrato, e a câmera muda de posição conforme a página rola.

Feito com React 19, Vite, Tailwind CSS v4, react-router e three.js.

## Rodar no computador

```bash
npm install
npm run dev
```

O site abre em http://localhost:5173.

## Publicar

Todo push na branch `main` publica o site pelo GitHub Actions (`.github/workflows/deploy.yml`).

### Formulário de contato

O formulário envia pelo [EmailJS](https://www.emailjs.com/). As três chaves precisam estar cadastradas no repositório, em **Settings > Secrets and variables > Actions**:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

O template do EmailJS recebe os campos `name`, `email` e `message`.

Para testar o envio no computador, crie um arquivo `.env` na raiz com as mesmas três chaves. Sem elas, o formulário avisa que não conseguiu enviar e oferece um link que abre o e-mail com a mensagem pronta.

## Onde mexer

| Para mudar | Arquivo |
| --- | --- |
| Projetos (textos, imagens, links, ordem) | `src/data/projects.js` |
| Experiência, competências, contatos e currículos | `src/data/profile.js` |
| Textos da interface em PT e EN | `src/i18n/strings.js` |
| Cores, fontes e animações | `src/index.css` |
| Cena 3D (anel de telas, poses da câmera) | `src/scene/orbitScene.js` |
| Imagens dos projetos | `public/work/` |
| Telas que giram no anel 3D | `public/tiles/` |
| Foto do topo | `public/gustavo.webp` |
| Currículos em PDF | `public/cv/` |

Todo texto existe em português e em inglês. Ao adicionar um projeto, preencha os dois idiomas.

### Adicionar um projeto

1. Coloque a imagem em `public/work/` (de preferência em WebP).
2. Copie um dos objetos de `src/data/projects.js` e ajuste os campos.
3. `featured: true` faz o projeto aparecer na seção de destaque da página inicial.
4. `status` aceita `live` (com link público), `internal`, `shipped` ou `video`.
5. `media.shot` define como a câmera percorre a imagem na página do projeto: `push` (aproxima), `crane` (desce por uma página alta) ou `truck` (percorre uma imagem larga).
6. Para o projeto aparecer no anel 3D, salve um recorte 800x500 da imagem em `public/tiles/<slug>.webp` e inclua o slug na lista de `src/components/OrbitStage.jsx`.

### Trocar a foto

A foto do topo é `public/gustavo.webp`: um recorte com fundo transparente, em pé (proporção 276:718). Para trocar, salve outra imagem com o mesmo nome e a mesma proporção. Se a proporção mudar, ajuste `FIGURE.ratio` em `src/scene/orbitScene.js`.

## Idiomas e endereços

- Português: `/`, `/projects`, `/projects/<slug>`
- Inglês: `/en`, `/en/projects`, `/en/projects/<slug>`

Na primeira visita, quem usa o navegador em outro idioma é levado para a versão em inglês. Depois disso vale a escolha feita no botão PT/EN.

O GitHub Pages não tem reescrita de rotas, então o build copia `index.html` para `404.html`. É isso que faz um link direto como `/projects/somnia-arcana` abrir.

## Acessibilidade e movimento

As animações (cena 3D no scroll, entradas, troca de página) só rodam quando o sistema não pede movimento reduzido. Com `prefers-reduced-motion` ativado, a cena fica parada no topo e o conteúdo aparece direto e completo.

O three.js é baixado em um arquivo separado, depois que a página já abriu. Em navegadores sem WebGL, o retrato entra como imagem comum.
