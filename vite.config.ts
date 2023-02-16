import { defineConfig } from "vite";
import * as path from "path";
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "CalculatorLib",
            formats: ["es", "umd"],
            fileName: (format) => `calculator-lib.${format}.js`,
        },
    },
    plugins: [dts()],
});