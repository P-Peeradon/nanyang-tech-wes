import { Glob } from "bun";

// 1. Create a scanner pattern
const folderGlob = new Glob("./{db,middleware,routes,model,utility,controller}/*.ts");
const rootGlob = new Glob("./{index,nanyang}.ts"); // Only files in the root

const entrypoints: string[] = [];

// Scan Root
for await (const file of rootGlob.scan(".")) {
  entrypoints.push(file);
}

// Scan Folders
for await (const file of folderGlob.scan(".")) {
  entrypoints.push(file);
}

console.log("Building files:", entrypoints);

await Bun.build({
  entrypoints: entrypoints,
  outdir: "./dist",
  target: "node",
  // Optional: keeps the folder structure in /dist
  root: ".", 
  external: ['*']
});