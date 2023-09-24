import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: "Tasks: Manage your routine",
				description: "A simple PWA to manage your routine",
				short_name: "Tasks",
				icons: [
					{
						src: "/pwa-512x512.png",
						type: "image/png",
						sizes: "512x512",
					},
					{
						src: "/pwa-192x192.png",
						type: "image/png",
						sizes: "192x192",
					},
					{
						src: "/pwa-512x512.png",
						type: "image/png",
						sizes: "512x512",
					},
				],
				background_color: "#40bdba",
				display: "standalone",
				start_url: "/",
			},
		}),
	],
});
