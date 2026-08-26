const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", ".boost-config.json");

class ConfigCommand {
  constructor() {
    this.config = this.load();
  }

  load() {
    try {
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, "utf-8"));
      }
    } catch (e) {}
    return { apiUrl: "http://localhost:3000", apiKey: "" };
  }

  save() {
    fs.writeFileSync(configPath, JSON.stringify(this.config, null, 2));
  }

  set(key, value) {
    const validKeys = ["apiUrl", "apiKey"];
    if (!validKeys.includes(key)) {
      console.log(chalk.red(`  Invalid key: ${key}`));
      console.log(chalk.gray(`  Valid keys: ${validKeys.join(", ")}`));
      return;
    }

    this.config[key] = value;
    this.save();

    const displayValue = key === "apiKey" ? "••••••••" : value;
    console.log(chalk.green(`  ${key} set to ${displayValue}`));
  }

  get(key) {
    if (this.config[key] !== undefined) {
      const value = key === "apiKey" ? "••••••••" : this.config[key];
      console.log(chalk.cyan(`  ${key}: ${value}`));
    } else {
      console.log(chalk.red(`  Unknown key: ${key}`));
    }
  }

  list() {
    console.log(chalk.bold("\n  Configuration\n"));
    console.log(chalk.gray("  " + "─".repeat(40)));
    Object.entries(this.config).forEach(([key, value]) => {
      const displayValue = key === "apiKey" ? (value ? "••••••••" : "(not set)") : value;
      console.log(chalk.white(`  ${key.padEnd(12)}`) + chalk.cyan(displayValue));
    });
    console.log(chalk.gray("  " + "─".repeat(40)) + "\n");
  }

  reset() {
    this.config = { apiUrl: "http://localhost:3000", apiKey: "" };
    this.save();
    console.log(chalk.green("  Configuration reset to defaults"));
  }
}

module.exports = ConfigCommand;
