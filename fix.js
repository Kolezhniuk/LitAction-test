import fs from "fs";

const p = "./node_modules/@0xpolygonid/js-sdk/package.json";

const pkg = JSON.parse(fs.readFileSync(p));

fs.writeFileSync(
  p,
  JSON.stringify(
    {
      ...pkg,
      module: pkg.main,
      exports: {
        ...pkg.exports,
        ".": {
          ...pkg.exports["."],
          node: {
            require: pkg.exports['.'].browser,
            import: pkg.exports['.'].browser,
          },
        },
      },
    },
    null,
    2
  )
);
