// register.js (or similar)
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Register ts-node/esm to handle .ts files for ESM modules
register("ts-node/esm", pathToFileURL("./"));