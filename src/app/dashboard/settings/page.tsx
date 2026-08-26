"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { User, Bell, Key, CreditCard, Shield, Save, Eye, EyeOff, Check } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "api-keys", label: "API Keys", icon: <Key className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-100">Settings</h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Manage your account preferences and configurations</p>
      </div>

      {/* Mobile: horizontal scrollable tabs */}
      <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-1 p-1 bg-dark-700/50 rounded-xl border border-dark-500/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
              activeTab === tab.id
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Desktop sidebar tabs */}
        <div className="hidden lg:block lg:col-span-1">
          <Card padding="none">
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                      : "text-gray-400 hover:text-gray-200 hover:bg-dark-600/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4 md:space-y-6">
          {activeTab === "profile" && (
            <Card>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-4 md:mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl md:text-2xl font-bold text-white shrink-0">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input label="First Name" placeholder="John" defaultValue="John" />
                  <Input label="Last Name" placeholder="Doe" defaultValue="Doe" />
                </div>
                <Input label="Email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                <Input label="Bio" placeholder="Tell us about yourself..." defaultValue="Social media enthusiast and content creator." />
                <div className="flex justify-end">
                  <Button icon={saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />} onClick={handleSave}>
                    {saved ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-4 md:mb-6">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: "Email Notifications", description: "Receive updates via email", checked: true },
                  { label: "Campaign Updates", description: "Get notified about campaign status changes", checked: true },
                  { label: "Milestone Alerts", description: "Celebrate when you hit targets", checked: true },
                  { label: "Weekly Reports", description: "Receive weekly performance summaries", checked: false },
                  { label: "Push Notifications", description: "Browser notifications for important events", checked: true },
                  { label: "Marketing Emails", description: "Tips, product updates, and special offers", checked: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-dark-600/30 border border-dark-500/30 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200">{pref.label}</p>
                      <p className="text-[10px] md:text-xs text-gray-500">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-dark-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 peer-checked:after:bg-white" />
                    </label>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button icon={<Save className="h-4 w-4" />}>Save Preferences</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "api-keys" && (
            <Card>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-4 md:mb-6">API Keys</h3>
              <div className="space-y-3">
                {[
                  { platform: "Instagram API", key: "ig_live_abc123def456ghi789jkl012", status: "active" },
                  { platform: "Facebook API", key: "fb_live_xyz789abc012def345ghi678", status: "active" },
                  { platform: "TikTok API", key: "", status: "not_configured" },
                ].map((api, i) => (
                  <div key={i} className="p-3 md:p-4 rounded-xl bg-dark-600/30 border border-dark-500/30">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-gray-200 truncate">{api.platform}</span>
                        <Badge variant={api.status === "active" ? "success" : "warning"} size="sm">
                          {api.status === "active" ? "Active" : "Not Configured"}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0">{api.status === "active" ? "Regenerate" : "Add Key"}</Button>
                    </div>
                    {api.key && (
                      <div className="flex items-center gap-2">
                        <code className="text-[10px] md:text-xs text-gray-400 bg-dark-700 px-2 md:px-3 py-1.5 rounded-lg flex-1 truncate">
                          {showApiKey ? api.key : "••••••••••••••••••••••••••••••••"}
                        </code>
                        <button onClick={() => setShowApiKey(!showApiKey)} className="p-1.5 rounded-lg hover:bg-dark-600 text-gray-500 shrink-0">
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-4 md:mb-6">Billing & Subscription</h3>
              <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base md:text-lg font-semibold text-white">Pro Plan</h4>
                      <Badge variant="purple">Current</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">$29/month - Renews on July 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start">Manage Subscription</Button>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-300">Payment Method</h4>
                <div className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-dark-600/30 border border-dark-500/30 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-200">Visa ending in 4242</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">Update</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-4 md:mb-6">Security Settings</h3>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Change Password</h4>
                  <div className="space-y-3 max-w-md">
                    <Input label="Current Password" type="password" placeholder="Enter current password" />
                    <Input label="New Password" type="password" placeholder="Enter new password" />
                    <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
                    <Button size="sm" icon={<Save className="h-4 w-4" />}>Update Password</Button>
                  </div>
                </div>
                <hr className="border-dark-500/50" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-dark-600/30 border border-dark-500/30 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-200">Authenticator App</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Use an authenticator app to generate one-time codes</p>
                    </div>
                    <Badge variant="warning" className="shrink-0">Not Enabled</Badge>
                  </div>
                </div>
                <hr className="border-dark-500/50" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Active Sessions</h4>
                  <div className="space-y-2">
                    {[
                      { device: "Chrome on Windows", location: "New York, US", current: true, lastActive: "Now" },
                      { device: "Safari on iPhone", location: "New York, US", current: false, lastActive: "2 hours ago" },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-dark-600/30 gap-3">
                        <div className="min-w-0">
                          <p className="text-sm text-gray-200">
                            {session.device}
                            {session.current && <Badge variant="success" size="sm" className="ml-2">Current</Badge>}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-500">{session.location} - Last active: {session.lastActive}</p>
                        </div>
                        {!session.current && (
                          <Button variant="danger" size="sm" className="shrink-0">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
