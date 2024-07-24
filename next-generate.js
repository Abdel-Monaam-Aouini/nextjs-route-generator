#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");
const ora = require("ora");
const { getFileExtension } = require("./file-extension");
const { page, layout, routeContent } = require("./content");

const argv = yargs
  .usage("Usage: /<route> -r [options]")
  .command(
    "/<route>",
    "Generate files for the specified route with options:\n" +
      "  -r, --route   Generate route file\n" +
      "  -l, --layout  Generate layout file\n" +
      "  -p, --page    Generate page file",
    (yargs) => {
      return yargs.options({
        page: {
          alias: "p",
          type: "boolean",
          description: "Generate page file",
          default: false,
        },
        layout: {
          alias: "l",
          type: "boolean",
          description: "Generate layout file",
          default: false,
        },
        route: {
          alias: "r",
          type: "boolean",
          description: "Generate route file",
          default: false,
        },
      });
    }
  )
  .check((argv) => {
    if (!argv.p && !argv.l && !argv.r) {
      throw new Error(
        "At least one of --page, --layout, or --route must be specified."
      );
    }
    return true;
  })
  .help()
  .alias("help", "h").argv;

const generateRoute = async (route) => {
  const spinner = ora("Generating route...").start();
  console.log("....");

  try {
    const extensions = getFileExtension();
    const routeParts = route.split("/").filter((part) => part);
    const routePath = path.join("./src/app", ...routeParts);

    // Create the folder structure
    fs.ensureDirSync(routePath);
    spinner.text = "Creating folder structure...";

    if (argv.p) {
      const pagePath = path.join(routePath, `page.${extensions.page}`);
      const pageContent = page(route);

      if (fs.existsSync(pagePath)) {
        console.warn(chalk.bgYellow(`Already Created: ${layoutPath} !`));
      } else {
        fs.writeFileSync(pagePath, pageContent);
        console.log(chalk.green(`Created: ${pagePath}`));
      }
    }

    if (argv.l) {
      const layoutPath = path.join(routePath, `layout.${extensions.layout}`);
      const layoutContent = layout(extensions.layout, route);

      if (fs.existsSync(layoutPath)) {
        console.warn(chalk.bgYellow(`Already Created: ${layoutPath} !`));
      } else {
        fs.writeFileSync(layoutPath, layoutContent);
        console.log(chalk.green(`Created: ${layoutPath}`));
      }
    }

    if (argv.r) {
      const routeTsPath = path.join(routePath, `route.${extensions.route}`);
      const routeTsContent = routeContent(route);

      if (fs.existsSync(routeTsPath)) {
        console.warn(chalk.bgYellow(`Already Created: ${routeTsPath} !`));
      } else {
        fs.writeFileSync(routeTsPath, routeTsContent);
        console.log(chalk.green(`Created: ${routeTsPath}`));
      }
    }

    spinner.succeed(chalk.blue("Route generation completed!"));
  } catch (error) {
    spinner.fail("Route generation failed.");
    console.error(chalk.red(error.message));
  }
};

const validateRoute = (route) => {
  if (!route || typeof route !== "string" || route.trim() === "") {
    throw new Error("Invalid route. Please provide a valid route.");
  }
  return route;
};

try {
  const route = validateRoute(argv._[0]);
  generateRoute(route);
} catch (error) {
  console.error(chalk.red(error.message));
  process.exit(1);
}
