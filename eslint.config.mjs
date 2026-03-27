import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
    },
  },

  {
    files: ["scripts*.ts"],
    rules: {
      "no-console": "off",
    },
  },

  {
    files: ["src/page-builder/elements/ElementImage.tsx"],
    rules: {
      // Intrinsic/hug sizing branch intentionally uses a native <img>.
      "@next/next/no-img-element": "off",
    },
  },

  {
    files: ["**/3d-scene/**"],
    rules: {
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|^HeroModel$|^BobblingCamera$",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    ".claude/**",

    ".dead/**",

    // Figma plugin compiled output — esbuild target ES2017 emits var declarations
    "tools/figma-plugin/dist/**",
    // Vendor copies of third-party libraries
    "tools/figma-plugin/vendor/**",
    // Figma widget compiled output
    "tools/figma-widget/dist/**",
    // Vendor copy of liquidGL runtime
    "public/scripts/**",
  ]),
]);

export default eslintConfig;
