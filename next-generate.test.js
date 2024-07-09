const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const runCLI = (args) => {
  execSync(`node ./next-generate.js ${args}`, { stdio: "inherit" });
};

const cleanUp = (dir) => {
  fs.removeSync(dir);
};

describe("next-generate CLI", () => {
  const outputDir = path.join(__dirname, "src/app");

  beforeAll(() => {
    cleanUp(outputDir);
  });

  afterAll(() => {
    cleanUp(outputDir);
  });

  test("should generate page.jsx", () => {
    runCLI('"posts" -p');
    const pagePath = path.join(outputDir, "posts/page.jsx");
    expect(fs.existsSync(pagePath)).toBe(true);
  });

  test("should generate layout.jsx", () => {
    runCLI('"posts" -l');
    const layoutPath = path.join(outputDir, "posts/layout.jsx");
    expect(fs.existsSync(layoutPath)).toBe(true);
  });

  test("should generate route.js", () => {
    runCLI('"posts" -r');
    const routeTsPath = path.join(outputDir, "posts/route.js");
    expect(fs.existsSync(routeTsPath)).toBe(true);
  });

  test("should generate all files", () => {
    runCLI('"posts/[id]" -p -l -r');
    const pagePath = path.join(outputDir, "posts/[id]/page.jsx");
    const layoutPath = path.join(outputDir, "posts/[id]/layout.jsx");
    const routeTsPath = path.join(outputDir, "posts/[id]/route.js");
    expect(fs.existsSync(pagePath)).toBe(true);
    expect(fs.existsSync(layoutPath)).toBe(true);
    expect(fs.existsSync(routeTsPath)).toBe(true);
  });
});
