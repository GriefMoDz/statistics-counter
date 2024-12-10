import intlLoader from "./scripts/intl-loader.mjs";
import intlTypeGenerator from "./scripts/intl-type-generator.mjs";

export default ({ plugins, ...config }) => {
  return {
    ...config,
    plugins: [...(plugins ?? []), intlTypeGenerator, intlLoader],
  };
};
