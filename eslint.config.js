import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
];
