import {
  database,
  generateTypeDefinitions,
  isMessageDefinitionsFile,
} from "@discord/intl-loader-core";
import chalk from "chalk";

let isFirstRun = true;

/**
 * Rewritten for esbuild. 1:1 copy of the original plugin, except doesn't generate types during watch mode.
 * @link https://github.com/discord/discord-intl
 * @copyright 2024 Discord, Inc.
 * @license MIT
 */
export default {
  name: "intlTypeGenerator",
  setup(build) {
    const generateTypeDefinitionsFile = (filePath) => {
      const start = performance.now();
      generateTypeDefinitions(filePath, undefined);
      const end = performance.now();

      return end - start;
    };

    const generateAllTypes = () => {
      const paths = database.getAllSourceFilePaths();
      let totalDuration = 0;

      for (const path of paths) {
        if (isMessageDefinitionsFile(path)) {
          totalDuration += generateTypeDefinitionsFile(path);
        }
      }

      console.log(
        `🌍 ${chalk.green(`Updated all intl type definitions (${paths.length} files, ${totalDuration.toFixed(3)}ms)`)}`,
      );
    };

    build.onEnd(() => {
      if (isFirstRun) {
        generateAllTypes();
        isFirstRun = false;
      }
    });
  },
};
