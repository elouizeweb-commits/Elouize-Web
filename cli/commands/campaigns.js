const chalk = require("chalk");
const ora = require("ora");

class CampaignsCommand {
  constructor(config) {
    this.config = config;
  }

  async list() {
    const spinner = ora("Fetching campaigns...").start();

    try {
      const response = await fetch(`${this.config.apiUrl}/api/campaigns`, {
        headers: { Authorization: `Bearer ${this.config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (!data.success || !data.data || data.data.length === 0) {
        console.log(chalk.yellow("\n  No campaigns found.\n"));
        return;
      }

      console.log(chalk.bold("\n  Your Campaigns\n"));
      console.log(chalk.gray("  " + "─".repeat(80)));

      data.data.forEach((c) => {
        const progress = c.targetViews > 0 ? Math.round((c.currentViews / c.targetViews) * 100) : 0;
        const progressBar = "█".repeat(Math.floor(progress / 5)) + "░".repeat(20 - Math.floor(progress / 5));

        console.log(chalk.gray("  ") + chalk.white(`[${c.id.slice(0, 8)}]`) + " " + chalk.bold(c.name));
        console.log(chalk.gray("    ") + chalk.cyan(c.platform) + " | " + chalk.yellow(c.status));
        console.log(chalk.gray("    ") + `Views: ${c.currentViews || 0}/${c.targetViews} ` + chalk.blue(progressBar) + ` ${progress}%`);
        console.log(chalk.gray("    ") + `Budget: $${c.spentAmount || 0}/$${c.budget}`);
        console.log("");
      });

      console.log(chalk.gray("  " + "─".repeat(80)));
      console.log(chalk.gray(`  ${data.data.length} campaign(s)\n`));
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch campaigns"));
    }
  }

  async create() {
    const inquirer = require("inquirer");

    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "Campaign name:" },
      {
        type: "list",
        name: "platform",
        message: "Platform:",
        choices: ["INSTAGRAM", "FACEBOOK", "TIKTOK"],
      },
      { type: "input", name: "videoUrl", message: "Video URL:", default: "" },
      { type: "number", name: "targetViews", message: "Target views:", default: 10000 },
      { type: "number", name: "targetLikes", message: "Target likes:", default: 1000 },
      { type: "number", name: "budget", message: "Budget ($):", default: 100 },
    ]);

    const spinner = ora("Creating campaign...").start();

    try {
      const response = await fetch(`${this.config.apiUrl}/api/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (data.success) {
        spinner.succeed(chalk.green("Campaign created!"));
        console.log(chalk.gray(`  ID: ${data.data.id}`));
        console.log(chalk.gray(`  Name: ${data.data.name}`));
        console.log(chalk.gray(`  Platform: ${data.data.platform}`));
        console.log(chalk.gray(`  Status: ${data.data.status}\n`));
      } else {
        spinner.fail(chalk.red(`Failed: ${data.error}`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Connection failed"));
    }
  }
}

module.exports = CampaignsCommand;
