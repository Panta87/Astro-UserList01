import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  adapters: {
    node: true,
    output: "server"
  },
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), react()]
});