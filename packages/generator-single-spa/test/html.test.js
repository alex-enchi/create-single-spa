const path = require("path");
const generator = require("../src/generator-single-spa");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

describe("generator-single-spa-html", () => {
  let runContext;
  const generateRunContext = (prompts) =>
    helpers
      .run(generator)
      .withOptions({
        framework: "html",
      })
      .withPrompts({
        packageManager: "npm",
        orgName: "org",
        projectName: "html-project",
        ...prompts,
      });

  afterEach(() => {
    runContext.cleanTestDirectory();
  });

  it("handles yarn option properly", () => {
    runContext = generateRunContext({
      packageManager: "yarn",
    });

    return runContext.then((dir) => {
      assert.file(path.join(dir, "package.json"));
      assert.jsonFileContent(path.join(dir, "package.json"), {
        name: "@org/html-project",
      });
    });
  });

  it("handles npm option properly", () => {
    runContext = generateRunContext();

    return runContext.then((dir) => {
      assert.file(path.join(dir, "package.json"));
      assert.jsonFileContent(path.join(dir, "package.json"), {
        name: "@org/html-project",
      });
    });
  });

  it("copies the correct files over", () => {
    runContext = generateRunContext();

    return runContext.then((dir) => {
      assert.file(path.join(dir, ".babelrc"));
      assert.file(path.join(dir, "jest.config.js"));
      assert.file(path.join(dir, "postcss.config.js"));
      assert.file(path.join(dir, "webpack.config.js"));
      assert.file(path.join(dir, "src/template.html"));
      assert.file(path.join(dir, "src/styles.css"));
      assert.file(path.join(dir, "src/org-html-project.js"));
    });
  });
});
