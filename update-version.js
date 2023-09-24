import { fs } from "fs";
import { execSync } from "child_process";
import { default as packageJson } from "package-json";

// Get the commit count
const commitCount = execSync("git rev-list --all --count").toString().trim();

const packageJsonPath = "./package.json";

// Update the version field
packageJson.version = `0.0.${commitCount}`;

// Write the updated package.json back to the file system
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
