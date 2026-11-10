import { copyFileSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * O GitHub Pages não reescreve rotas de SPA: um link direto como
 * /projects/somnia-arcana cairia no 404 do GitHub. Publicando o próprio
 * index.html também como 404.html, o app carrega e o roteador abre a página certa.
 */
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      copyFileSync(path.resolve(outDir, 'index.html'), path.resolve(outDir, '404.html'))
      // As notas de origem das imagens (*.webp.json) são só do repositório.
      for (const file of readdirSync(outDir, { recursive: true })) {
        if (String(file).endsWith('.webp.json')) rmSync(path.resolve(outDir, String(file)))
      }
    },
  }
}

/**
 * O título do topo entra assim que a página abre, então a fonte precisa chegar
 * junto com o JavaScript: o arquivo latino da Geist entra como preload no HTML.
 */
function preloadFont() {
  return {
    name: 'preload-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle ?? {}).find((name) =>
          /(^|\/)geist-latin-wght-normal[^/]*\.woff2$/.test(name),
        )
        if (!file) return html
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: '' },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback(), preloadFont()],
  base: '/',

  build: {
    // O three.js fica num arquivo só dele (~150 kB comprimido), baixado depois que a página abre.
    chunkSizeWarningLimit: 700,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
