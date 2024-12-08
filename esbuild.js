import { build, analyzeMetafile } from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import commonjsPlugin from '@chialab/esbuild-plugin-commonjs';

build({
  entryPoints: ["./src/privado.js"],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: "./privado.ID.lit.js",
  // sourceRoot: "./src",
  platform: "browser",
  metafile: true,
  external: ["ethers", "ky", "ky-universal", "@walletconnect/modal"],
  // inject: ["./esbuild-shims.js"],
  plugins: [
    // esbuildPluginTsc({
    //   force: true,
    // }),
    // commonjsPlugin(),
  ],
}).catch((err) => {
  console.error(err);
  return process.exit(1);
});
