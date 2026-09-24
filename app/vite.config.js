import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		// Оставляем build/, чтобы Dockerfile и nginx-конфиг не менялись.
		outDir: "build",
	},
});
