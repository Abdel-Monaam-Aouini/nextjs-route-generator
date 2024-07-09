#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");
const ora = require("ora");
const { getFileExtension } = require("./file-extension");

const argv = yargs
  .command("generate <route>", "Generate a new route", {
    page: {
      alias: "p",
      type: "boolean",
      description: "Generate page.tsx file",
      default: false,
    },
    layout: {
      alias: "l",
      type: "boolean",
      description: "Generate layout.tsx file",
      default: false,
    },
    route: {
      alias: "r",
      type: "boolean",
      description: "Generate route.ts file",
      default: false,
    },
  })
  .help()
  .alias("help", "h").argv;

const generateRoute = async (route) => {
  const spinner = ora("Generating route...").start();

  try {
    const extensions = getFileExtension();
    const routeParts = route.split("/").filter((part) => part);
    const routePath = path.join("./src/app", ...routeParts);

    // Create the folder structure
    fs.ensureDirSync(routePath);
    spinner.text = "Creating folder structure...";

    if (argv.p) {
      const pagePath = path.join(routePath, `page.${extensions.page}`);
      const pageContent = `import React from 'react';

const Page = () => {
  return <div>Welcome to ${route} page</div>;
};

export default Page;`;

      fs.writeFileSync(pagePath, pageContent);
      console.log(chalk.green(`Created: ${pagePath}`));
    }

    if (argv.l) {
      const layoutPath = path.join(routePath, `layout.${extensions.layout}`);
      const layoutContent = `import React ${
        extensions.layout === "tsx" ? ", {ReactNode}" : ""
      } from 'react';

const Layout = ({ children }${
        extensions.layout === "tsx" ? ": {children: ReactNode}" : ""
      }) => {
  return <div>
    <h1>Layout for ${route}</h1>
    {children}
  </div>;
};

export default Layout;`;

      fs.writeFileSync(layoutPath, layoutContent);
      console.log(chalk.green(`Created: ${layoutPath}`));
    }

    if (argv.r) {
      const routeTsPath = path.join(routePath, `route.${extensions.route}`);
      const routeTsContent = `import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ route: "${route}" });
};`;

      fs.writeFileSync(routeTsPath, routeTsContent);
      console.log(chalk.green(`Created: ${routeTsPath}`));
    }

    spinner.succeed(chalk.blue("Route generation completed!"));
  } catch (error) {
    spinner.fail("Route generation failed.");
    console.error(chalk.red(error.message));
  }
};

const route = argv._[0];
if (route) {
  generateRoute(route);
} else {
  console.error(chalk.red("Please provide a route."));
}
