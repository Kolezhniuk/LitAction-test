import { build } from "esbuild";
build({
  entryPoints: ["./src/privado.js"],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: "./privado.ID.lit.js",
  // sourceRoot: "./src",
  platform: "browser",
  metafile: false,
  external: ["ethers"],
  // inject: ["./esbuild-shims.js"],
  plugins: [
  ],
}).catch((err) => {
  console.error(err);
  return process.exit(1);
});
