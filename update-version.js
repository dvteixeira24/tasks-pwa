import { writeFileSync, readFileSync } from "fs";
import { execSync } from "child_process";

const MAJOR = 0;
const MINOR = 1;

// Get the commit count
const commitCount = execSync("git rev-list --all --count").toString().trim();
const latestCommit = execSync("git rev-parse --short HEAD").toString().trim();

console.log(commitCount);

// read the current package.json
const packageJson = JSON.parse(readFileSync("./package.json", { encoding: "utf-8" }));

packageJson.version = `${MAJOR}.${MINOR}.${commitCount}`;
// process is actually defined for this script...
//eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") packageJson.version += `-${latestCommit}`;

console.log(packageJson.version);

// write the new package.json
writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
