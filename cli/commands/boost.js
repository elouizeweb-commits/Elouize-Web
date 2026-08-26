const chalk = require("chalk");
const ora = require("ora");

class BoostCommand {
  constructor(config) {
    this.config = config;
  }

  async start(campaignId, options = {}) {
    const spinner = ora("Starting boost...").start();

    try {
      const response = await fetch(`${this.config.apiUrl}/api/boost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ campaignId, action: "start" }),
      });

      const data = await response.json();

      if (data.success) {
        spinner.succeed(chalk.green(`Boost started for campaign ${campaignId}`));
        console.log(chalk.cyan(`  ${data.message}`));
      } else {
        spinner.fail(chalk.red(`Failed: ${data.message || data.error}`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Connection failed"));
    }
  }

  async stop(campaignId) {
    const spinner = ora("Stopping boost...").start();

    try {
      const response = await fetch(`${this.config.apiUrl}/api/boost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ campaignId, action: "stop" }),
      });

      const data = await response.json();
      spinner[data.success ? "succeed" : "fail"](
        data.success
          ? chalk.green(`Boost stopped for campaign ${campaignId}`)
          : chalk.red(`Failed: ${data.message}`)
      );
    } catch (error) {
      spinner.fail(chalk.red("Connection failed"));
    }
  }

  async status() {
    const spinner = ora("Fetching queue status...").start();

    try {
      const response = await fetch(`${this.config.apiUrl}/api/boost`, {
        headers: { Authorization: `Bearer ${this.config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (data.success && data.data) {
        const s = data.data;
        console.log(chalk.bold("\n  Boost Queue Status\n"));
        console.log(chalk.gray("  " + "─".repeat(40)));
        console.log(chalk.white("  Total Tasks:     ") + chalk.cyan(s.total));
        console.log(chalk.white("  Pending:         ") + chalk.yellow(s.pending));
        console.log(chalk.white("  In Progress:     ") + chalk.blue(s.inProgress));
        console.log(chalk.white("  Completed:       ") + chalk.green(s.completed));
        console.log(chalk.white("  Failed:          ") + chalk.red(s.failed));
        console.log(chalk.gray("  " + "─".repeat(40)) + "\n");
      }
    } catch (error) {
      spinner.fail(chalk.red("Connection failed"));
    }
  }
}

module.exports = BoostCommand;
