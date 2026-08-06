import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Native flat config exports, not FlatCompat: eslint-config-next's plugins
// (eslint-plugin-react in particular) now embed self-references that crash
// FlatCompat's legacy JSON-based config validator with "Converting circular
// structure to JSON" on every run. See vercel/next.js#85244, eslint/eslint#20237.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
