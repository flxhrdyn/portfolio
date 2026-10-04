import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".superpowers/**",
      ".impeccable/**",
      ".playwright-mcp/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },
  ...nextConfig,
];

export default eslintConfig;
