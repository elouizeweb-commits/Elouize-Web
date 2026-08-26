"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { Zap, Plus, Clock, Play, Pause, Trash2, Settings, Activity } from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
  lastRun: string;
  runCount: number;
}

const defaultRules: AutomationRule[] = [
  { id: "1", name: "Auto-boost on milestone", trigger: "Views reach 10K", action: "Increase boost budget by 20%", isActive: true, lastRun: "2 hours ago", runCount: 12 },
  { id: "2", name: "Pause low engagement", trigger: "Engagement drops below 1%", action: "Pause campaign and send notification", isActive: true, lastRun: "1 day ago", runCount: 3 },
  { id: "3", name: "Daily analytics report", trigger: "Every day at 9:00 AM", action: "Generate and email analytics report", isActive: false, lastRun: "3 days ago", runCount: 28 },
  { id: "4", name: "Weekend boost boost", trigger: "Every Saturday at 10:00 AM", action: "Increase all campaign budgets by 50%", isActive: true, lastRun: "5 days ago", runCount: 8 },
];

const templates = [
  { name: "Milestone Booster", description: "Auto-increase budget when milestones are hit", icon: <Zap className="h-5 w-5" /> },
  { name: "Engagement Monitor", description: "Pause campaigns with low engagement", icon: <Activity className="h-5 w-5" /> },
  { name: "Schedule Manager", description: "Automate posting schedules", icon: <Clock className="h-5 w-5" /> },
];

export default function AutomationPage() {
  const [rules, setRules] = useState(defaultRules);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", trigger: "", action: "" });

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Automation</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Create rules to automate your campaign management</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => setShowCreateModal(true)} className="self-start">
          Create Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {templates.map((template, i) => (
          <Card key={i} hover className="cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                {template.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-200">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Active Rules</h3>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 md:p-4 rounded-xl bg-dark-600/30 border border-dark-500/30 hover:border-dark-500/50 transition-all group">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`w-10 h-6 rounded-full transition-all relative shrink-0 ${rule.isActive ? "bg-emerald-500" : "bg-dark-500"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${rule.isActive ? "left-5" : "left-1"}`} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-200 truncate">{rule.name}</h4>
                    <Badge variant={rule.isActive ? "success" : "default"} size="sm">
                      {rule.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1 text-[10px] md:text-xs text-gray-500">
                    <span className="truncate">
                      <strong className="text-gray-400">Trigger:</strong> {rule.trigger}
                    </span>
                    <span className="truncate">
                      <strong className="text-gray-400">Action:</strong> {rule.action}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-[10px] md:text-xs text-gray-500">Last run: {rule.lastRun}</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Runs: {rule.runCount}</p>
                </div>

                <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-dark-500 text-gray-500 hover:text-gray-300 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-300">Recent Execution Logs</h3>
        </div>
        <div className="space-y-2">
          {[
            { time: "2 min ago", rule: "Auto-boost on milestone", status: "success", details: "Increased budget for Summer Collection by 20%" },
            { time: "1 hour ago", rule: "Weekend boost boost", status: "success", details: "Applied 50% budget increase to 3 campaigns" },
            { time: "1 day ago", rule: "Pause low engagement", status: "triggered", details: "Paused 'Winter Promo' campaign - engagement at 0.8%" },
            { time: "2 days ago", rule: "Daily analytics report", status: "failed", details: "Email service temporarily unavailable" },
          ].map((log, i) => (
            <div key={i} className="flex items-start sm:items-center gap-2 sm:gap-3 py-2 border-b border-dark-500/30 last:border-0">
              <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 sm:mt-0 ${log.status === "success" ? "bg-emerald-400" : log.status === "triggered" ? "bg-yellow-400" : "bg-red-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] md:text-xs text-gray-300">
                  <strong>{log.rule}</strong> - {log.details}
                </p>
              </div>
              <span className="text-[10px] md:text-xs text-gray-500 shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Automation Rule"
        description="Define a trigger and action for your automation"
      >
        <form className="space-y-4">
          <Input
            label="Rule Name"
            placeholder="e.g., Auto-boost on milestone"
            value={newRule.name}
            onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trigger</label>
            <select className="w-full bg-dark-600 border border-dark-500 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50">
              <option>Select a trigger...</option>
              <option>Views reach target</option>
              <option>Engagement drops below threshold</option>
              <option>Specific time of day</option>
              <option>Campaign status changes</option>
              <option>Budget threshold reached</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Action</label>
            <select className="w-full bg-dark-600 border border-dark-500 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50">
              <option>Select an action...</option>
              <option>Increase budget</option>
              <option>Pause campaign</option>
              <option>Send notification</option>
              <option>Generate report</option>
              <option>Start new campaign</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button onClick={() => setShowCreateModal(false)}>Create Rule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
