import { createServer, defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Bakes the portfolio markup into index.html at build time, so search engines and
// link previews read the full page without running JavaScript. main.tsx hydrates it.
function prerenderPortfolio(): Plugin {
  let root = '';
  return {
    name: 'prerender-portfolio',
    apply: 'build',
    configResolved(config) {
      root = config.root;
    },
    async transformIndexHtml(html) {
      const server = await createServer({
        configFile: false,
        root,
        logLevel: 'silent',
        appType: 'custom',
        server: { middlewareMode: true, hmr: false },
      });
      try {
        const { portfolioMarkup } = (await server.ssrLoadModule('/src/portfolioMarkup.ts')) as {
          portfolioMarkup: string;
        };
        const mount = '<div id="root"></div>';
        if (!html.includes(mount)) throw new Error('prerender-portfolio: #root mount point not found');
        // Same shape App renders, so hydration adopts the DOM as-is.
        return html.replace(mount, () => `<div id="root"><div>${portfolioMarkup}</div></div>`);
      } finally {
        await server.close();
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prerenderPortfolio()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
