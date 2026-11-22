import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import * as sass from "sass";

const SOURCE_DIR = "src";
const HEX_COLOR = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi;

// Blank lines, spacing and hex color case differ between compilers and formatters.
function normalizeCss(css) {
  return css
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join("\n")
    .replace(HEX_COLOR, (color) => color.toLowerCase());
}

function findProblem(scssPath) {
  const cssPath = scssPath.replace(/\.scss$/, ".css");

  if (!existsSync(cssPath)) {
    return "missing .css file";
  }

  try {
    const compiled = sass.compile(scssPath, { style: "expanded" }).css;
    const current = readFileSync(cssPath, "utf8");
    return normalizeCss(compiled) === normalizeCss(current) ? null : "content differs";
  } catch (error) {
    return `cannot compile: ${error.message.split("\n")[0]}`;
  }
}

const scssFiles = readdirSync(SOURCE_DIR, { recursive: true })
  .filter((file) => file.endsWith(".module.scss"))
  .map((file) => path.join(SOURCE_DIR, file))
  .sort();

const problems = scssFiles
  .map((file) => ({ file, problem: findProblem(file) }))
  .filter(({ problem }) => problem);

if (problems.length > 0) {
  console.error(`${problems.length} of ${scssFiles.length} SCSS files are out of sync:`);
  problems.forEach(({ file, problem }) => console.error(`  ${file}: ${problem}`));
  process.exitCode = 1;
} else {
  console.log(`All ${scssFiles.length} SCSS files match their .module.css files.`);
}
