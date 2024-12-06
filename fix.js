import fs from "fs";

const p = "./node_modules/@0xpolygonid/js-sdk/package.json";

const pkg = JSON.parse(fs.readFileSync(p));

fs.writeFileSync(
  p,
  JSON.stringify({
    ...pkg,
    module: pkg.main,
    exports: {
      ...pkg.exports,
      ".": {
        ...pkg.exports["."],
        node: {
          ...pkg.exports["."].node,
          import: pkg.exports["."].node.require,
        },
      },
    },
  }, null, 2)
);
