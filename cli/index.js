#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, ".boost-config.json");

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    }
  } catch (e) {}
  return { apiUrl: "http://localhost:3000", apiKey: "" };
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

const program = new Command();

program
  .name("boost")
  .description("Social Boost Pro CLI - Manage your social media campaigns from the terminal")
  .version("1.0.0");

program
  .command("start <campaignId>")
  .description("Start boosting a campaign")
  .option("-t, --type <type>", "Boost type (views, likes, comments, shares)", "views")
  .action(async (campaignId, options) => {
    const config = loadConfig();
    const ora = (await import("ora")).default;
    const spinner = ora("Starting boost...").start();

    try {
      const response = await fetch(`${config.apiUrl}/api/boost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ campaignId, action: "start" }),
      });

      const data = await response.json();

      if (data.success) {
        spinner.succeed(chalk.green(`Boost started for campaign ${campaignId}`));
        console.log(chalk.cyan(`  Message: ${data.message}`));
      } else {
        spinner.fail(chalk.red(`Failed to start boost: ${data.message || data.error}`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to connect to the server"));
      console.log(chalk.gray("  Make sure the server is running on " + config.apiUrl));
    }
  });

program
  .command("stop <campaignId>")
  .description("Stop boosting a campaign")
  .action(async (campaignId) => {
    const config = loadConfig();
    const ora = (await import("ora")).default;
    const spinner = ora("Stopping boost...").start();

    try {
      const response = await fetch(`${config.apiUrl}/api/boost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ campaignId, action: "stop" }),
      });

      const data = await response.json();

      if (data.success) {
        spinner.succeed(chalk.green(`Boost stopped for campaign ${campaignId}`));
      } else {
        spinner.fail(chalk.red(`Failed to stop boost: ${data.message || data.error}`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to connect to the server"));
    }
  });

program
  .command("status")
  .description("Show status of all campaigns")
  .option("-p, --platform <platform>", "Filter by platform")
  .action(async (options) => {
    const config = loadConfig();
    const ora = (await import("ora")).default;
    const spinner = ora("Fetching campaign status...").start();

    try {
      const params = new URLSearchParams();
      if (options.platform) params.set("platform", options.platform.toUpperCase());

      const response = await fetch(`${config.apiUrl}/api/campaigns?${params}`, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (data.success && data.data) {
        const campaigns = data.data;

        if (campaigns.length === 0) {
          console.log(chalk.yellow("\n  No campaigns found.\n"));
          return;
        }

        console.log(chalk.bold("\n  Campaign Status\n"));
        console.log(chalk.gray("  " + "─".repeat(80)));
        console.log(
          chalk.gray("  ") +
            chalk.bold("Name".padEnd(25)) +
            chalk.bold("Platform".padEnd(12)) +
            chalk.bold("Status".padEnd(12)) +
            chalk.bold("Views".padEnd(12)) +
            chalk.bold("Progress")
        );
        console.log(chalk.gray("  " + "─".repeat(80)));

        campaigns.forEach((c) => {
          const progress = c.targetViews > 0 ? Math.round((c.currentViews / c.targetViews) * 100) : 0;
          const statusColor =
            c.status === "ACTIVE" ? chalk.green : c.status === "PAUSED" ? chalk.yellow : chalk.gray;

          console.log(
            chalk.gray("  ") +
              chalk.white(c.name.padEnd(25)) +
              chalk.cyan(c.platform.padEnd(12)) +
              statusColor(c.status.padEnd(12)) +
              chalk.white(String(c.currentViews).padEnd(12)) +
              chalk.blue(`${progress}%`)
          );
        });

        console.log(chalk.gray("  " + "─".repeat(80)));
        console.log(chalk.gray(`  Total: ${campaigns.length} campaigns\n`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch campaign status"));
    }
  });

program
  .command("campaigns")
  .description("Manage campaigns")
  .command("list")
  .description("List all campaigns")
  .action(async () => {
    const config = loadConfig();
    const ora = (await import("ora")).default;
    const spinner = ora("Fetching campaigns...").start();

    try {
      const response = await fetch(`${config.apiUrl}/api/campaigns`, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (data.success && data.data) {
        data.data.forEach((c) => {
          console.log(
            chalk.gray(`  [${c.id.slice(0, 8)}]`) +
              chalk.white(` ${c.name}`) +
              chalk.gray(` - ${c.platform} - ${c.status}`)
          );
        });
        console.log(chalk.gray(`\n  ${data.data.length} campaign(s) found\n`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch campaigns"));
    }
  });

program
  .command("campaigns create")
  .description("Create a new campaign")
  .action(async () => {
    const inquirer = (await import("inquirer")).default;
    const config = loadConfig();

    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "Campaign name:" },
      {
        type: "list",
        name: "platform",
        message: "Platform:",
        choices: ["INSTAGRAM", "FACEBOOK", "TIKTOK"],
      },
      { type: "input", name: "videoUrl", message: "Video URL (optional):", default: "" },
      { type: "number", name: "targetViews", message: "Target views:", default: 10000 },
      { type: "number", name: "budget", message: "Budget ($):", default: 100 },
    ]);

    const ora = (await import("ora")).default;
    const spinner = ora("Creating campaign...").start();

    try {
      const response = await fetch(`${config.apiUrl}/api/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (data.success) {
        spinner.succeed(chalk.green("Campaign created successfully!"));
        console.log(chalk.gray(`  ID: ${data.data.id}`));
        console.log(chalk.gray(`  Name: ${data.data.name}`));
        console.log(chalk.gray(`  Platform: ${data.data.platform}`));
      } else {
        spinner.fail(chalk.red(`Failed to create campaign: ${data.error}`));
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to connect to the server"));
    }
  });

program
  .command("analytics")
  .description("Show analytics overview")
  .action(async () => {
    const config = loadConfig();
    const ora = (await import("ora")).default;
    const spinner = ora("Fetching analytics...").start();

    try {
      const response = await fetch(`${config.apiUrl}/api/analytics?view=dashboard`, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
      });

      const data = await response.json();
      spinner.stop();

      if (data.success && data.data) {
        const s = data.data;
        console.log(chalk.bold("\n  Analytics Dashboard\n"));
        console.log(chalk.gray("  " + "─".repeat(50)));
        console.log(chalk.white("  Total Views:      ") + chalk.cyan(s.totalViews.toLocaleString()));
        console.log(chalk.white("  Total Likes:      ") + chalk.cyan(s.totalLikes.toLocaleString()));
        console.log(chalk.white("  Total Comments:   ") + chalk.cyan(s.totalComments.toLocaleString()));
        console.log(chalk.white("  Total Shares:     ") + chalk.cyan(s.totalShares.toLocaleString()));
        console.log(chalk.white("  Active Campaigns: ") + chalk.green(s.activeCampaigns));
        console.log(chalk.white("  Completed:        ") + chalk.blue(s.completedCampaigns));
        console.log(chalk.white("  Revenue:          ") + chalk.yellow(`$${s.totalRevenue.toLocaleString()}`));
        console.log(chalk.white("  Engagement Rate:  ") + chalk.magenta(`${s.engagementRate.toFixed(1)}%`));
        console.log(chalk.gray("  " + "─".repeat(50)) + "\n");
      }
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch analytics"));
    }
  });

program
  .command("config")
  .description("Configure CLI settings")
  .command("set <key> <value>")
  .description("Set a configuration value (apiUrl, apiKey)")
  .action((key, value) => {
    const config = loadConfig();

    if (key === "apiUrl" || key === "apiKey") {
      config[key] = value;
      saveConfig(config);
      console.log(chalk.green(`  ${key} set to ${key === "apiKey" ? "••••••••" : value}`));
    } else {
      console.log(chalk.red(`  Unknown config key: ${key}`));
      console.log(chalk.gray("  Available keys: apiUrl, apiKey"));
    }
  });

program
  .command("config")
  .description("Configure CLI settings")
  .command("get <key>")
  .description("Get a configuration value")
  .action((key) => {
    const config = loadConfig();
    if (config[key] !== undefined) {
      const value = key === "apiKey" ? "••••••••" : config[key];
      console.log(chalk.cyan(`  ${key}: ${value}`));
    } else {
      console.log(chalk.red(`  Unknown config key: ${key}`));
    }
  });

program.parse();
