const fs = require("fs-extra");
const path = require("path");

module.exports.getFileExtension = () => {
  if (fs.existsSync(path.join(process.cwd(), "tsconfig.json"))) {
    return {
      page: "tsx",
      layout: "tsx",
      route: "ts",
    };
  } else {
    return {
      page: "jsx",
      layout: "jsx",
      route: "js",
    };
  }
};
