import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const LIB_NAME = "ExtendedClickOutside";

export default [
  {
    input: "./index.js",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: LIB_NAME,
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: ["./node_modules/**", "./qa/**"],
        plugins: [
          "@babel/plugin-transform-arrow-functions",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-classes",
          "transform-imports",
        ],
      }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: "types/index.d.ts",
    output: {
      file: "dist/types/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
