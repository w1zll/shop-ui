import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface PackageJson {
  exports: Record<string, unknown>;
  peerDependencies: Record<string, string>;
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
}

const rootDir = process.cwd();

function readPackageJson() {
  return JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8")) as PackageJson;
}

describe("package metadata", () => {
  it("exposes public entrypoints", () => {
    const packageJson = readPackageJson();

    expect(packageJson.exports).toHaveProperty(".");
    expect(packageJson.exports).toHaveProperty("./contracts");
    expect(packageJson.exports).toHaveProperty("./styles.css");
  });

  it("keeps React as peer dependencies", () => {
    const packageJson = readPackageJson();

    expect(packageJson.peerDependencies.react).toBe("19.2.7");
    expect(packageJson.peerDependencies["react-dom"]).toBe("19.2.7");
    expect(packageJson.dependencies.react).toBeUndefined();
    expect(packageJson.dependencies["react-dom"]).toBeUndefined();
  });

  it("has a valid CSS entrypoint for consumers", () => {
    const packageJson = readPackageJson();
    const cssExport = packageJson.exports["./styles.css"];

    expect(cssExport).toBe("./src/styles/styles.css");
    expect(existsSync(join(rootDir, "src/styles/styles.css"))).toBe(true);
  });

  it("documents and checks package dry-run", () => {
    const packageJson = readPackageJson();

    expect(packageJson.scripts["pack:dry-run"]).toBe("pnpm build && pnpm pack --dry-run");
  });
});
