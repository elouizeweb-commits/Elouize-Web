const chalk = require("chalk");
const ora = require("ora");

class StatusCommand {
  constructor(config) {
    this.config = config;
  }

  async show(options = {}) {
    const spinner = ora("Fetching campaign status...").start();

    try {
      const params = new URLSearchParams();
      if (options.platform) params.set("platform", options.platform.toUpperCase());

      const response = await fetch(`${this.config.apiUrl}/api/campaigns?${params}`, {
        headers: { Authorization: `Bearer ${this.config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (!data.success || !data.data || data.data.length === 0) {
        console.log(chalk.yellow("\n  No campaigns found.\n"));
        return;
      }

      console.log(chalk.bold("\n  Campaign Status\n"));
      console.log(chalk.gray("  " + "─".repeat(80)));
      console.log(
        chalk.gray("  ") +
          chalk.bold("ID".padEnd(12)) +
          chalk.bold("Name".padEnd(25)) +
          chalk.bold("Platform".padEnd(12)) +
          chalk.bold("Status".padEnd(12)) +
          chalk.bold("Views")
      );
      console.log(chalk.gray("  " + "─".repeat(80)));

      data.data.forEach((c) => {
        const statusColor =
          c.status === "ACTIVE" ? chalk.green : c.status === "PAUSED" ? chalk.yellow : chalk.gray;

        console.log(
          chalk.gray("  ") +
            chalk.gray(c.id.slice(0, 8).padEnd(12)) +
            chalk.white(c.name.padEnd(25)) +
            chalk.cyan(c.platform.padEnd(12)) +
            statusColor(c.status.padEnd(12)) +
            chalk.white(String(c.currentViews || 0))
        );
      });

      console.log(chalk.gray("  " + "─".repeat(80)));
      console.log(chalk.gray(`  ${data.data.length} campaign(s)\n`));
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch status"));
    }
  }
}

module.exports = StatusCommand;
