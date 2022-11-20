import solid from "solid-start/vite";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
});
