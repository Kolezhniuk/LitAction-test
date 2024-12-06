import { build, analyzeMetafile } from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import commonjsPlugin from '@chialab/esbuild-plugin-commonjs';

build({
  entryPoints: ["./src/createDID.js"],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: "./bundled.js",
  // sourceRoot: "./src",
  platform: "node",
  metafile: true,
  external: ["ethers", "ky", "ky-universal", "@walletconnect/modal"],
  // inject: ["./esbuild-shims.js"],
  plugins: [
    // esbuildPluginTsc({
    //   force: true,
    // }),
    commonjsPlugin(),
  ],
}).catch((err) => {
  console.error(err);
  return process.exit(1);
});
