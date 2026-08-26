"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, Lock, Rocket, Eye, EyeOff, Instagram, Facebook, Youtube } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const csrfRes = await fetch("/api/auth/csrf");
      const { csrfToken } = await csrfRes.json();

      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          password,
          csrfToken,
          redirect: "false",
          json: "true",
        }),
      });

      const data = await res.json();

      if (data.url) {
        router.push(data.url);
        router.refresh();
      } else if (!data.error) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Elouize Boost Pro</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Sign in to your account to continue boosting</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" className="rounded border-dark-500 bg-dark-600" />
                Remember me
              </label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-500/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600/50 border border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500 transition-all">
                <Instagram className="h-4 w-4" />
                <span className="text-sm">Instagram</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600/50 border border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500 transition-all">
                <Facebook className="h-4 w-4" />
                <span className="text-sm">Facebook</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600/50 border border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500 transition-all">
                <Youtube className="h-4 w-4" />
                <span className="text-sm">TikTok</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="relative z-10 text-center p-12 max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Grow Your Audience</h2>
          <p className="text-gray-400 mb-8">
            Access powerful tools to boost your content across Instagram, Facebook, and TikTok. Track analytics, automate campaigns, and go viral.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Views", value: "500M+" },
              { label: "Engagement", value: "+340%" },
              { label: "Campaigns", value: "25K+" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-dark-700/50 border border-dark-500/50">
                <div className="text-xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
