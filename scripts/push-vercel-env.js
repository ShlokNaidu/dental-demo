const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) {
  console.error(".env.local not found!");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const lines = envContent.split("\n");

const environments = ["production", "preview", "development"];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;

  const equalIndex = trimmed.indexOf("=");
  if (equalIndex === -1) continue;

  const key = trimmed.slice(0, equalIndex).trim();
  const value = trimmed.slice(equalIndex + 1).trim();

  if (key && value && !key.startsWith("VERCEL_")) {
    console.log(`Adding ${key}...`);
    for (const env of environments) {
      try {
        execSync(`npx vercel env add ${key} ${env}`, {
          input: value,
          encoding: "utf8",
          stdio: ["pipe", "pipe", "pipe"],
        });
        console.log(`  ✅ Added ${key} to ${env}`);
      } catch (err) {
        // If already exists or error
        console.log(`  ℹ️ Note for ${key} in ${env}: ${err.stdout || err.message}`);
      }
    }
  }
}

console.log("Environment sync complete!");
