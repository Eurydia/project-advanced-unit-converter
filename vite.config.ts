import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigpath from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), tsconfigpath()],
	build: {
		sourcemap: true,
		manifest: true,
		cssMinify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.search("node_modules") >= 0) {
						const vendors = [
							"@mui/material",
							"@mui/icons-material",
							"katex",
						];
						for (const vendor of vendors) {
							if (id.search(vendor) !== -1) {
								return encodeURIComponent(
									`vendor_${vendor}`,
								);
							}
						}
						return "vendor";
					}
				},
			},
		},
	},
});
