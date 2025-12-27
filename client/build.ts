// build.ts
import vue from "@eckidevs/bun-plugin-vue";

await Bun.build({
  entrypoints: ["./index.html"],
  outdir: "./dist",
  minify: true,
  plugins: [vue()],
});

console.log("Build complete!");
