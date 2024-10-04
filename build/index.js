import { rollup } from "rollup";
import path from "node:path";
import { access, constants, rm } from "node:fs/promises";
import typescripPlugin from "rollup-plugin-typescript2";
import typescript from "typescript";
import resolvePlugin from "@rollup/plugin-node-resolve";
import commonjsPlugin from "@rollup/plugin-commonjs";

const root = process.cwd();
const inputPath = path.resolve(root, "src/index.ts");
const outputPath = path.resolve(root, "dist");

const cleanDistPath = async () => {
  try {
    await access(outputPath, constants.F_OK);
    await rm(outputPath, { recursive: true });
    return true;
  } catch (error) {
    return false;
  }
};

const outputOptions = [
  {
    file: path.resolve(outputPath, "index.cjs.js"), // 输出文件
    format: "cjs", // 输出格式：amd、cjs、es、iife、umd
  },
  {
    file: path.resolve(outputPath, "index.esm.js"), // 输出文件
    format: "es", // 输出格式：amd、cjs、es、iife、umd
  },
];

const build = async () => {
  try {
    cleanDistPath();

    const bundle = await rollup({
      input: inputPath,
      plugins: [
        typescripPlugin({
          typescript,
        }),
        resolvePlugin(),
        commonjsPlugin(),
      ],
    });

    await Promise.all(outputOptions.map(bundle.write));

    await bundle.close();
  } catch (error) {
    console.error(error);
  }
};

build();
