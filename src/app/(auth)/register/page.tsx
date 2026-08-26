"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, Lock, User, Rocket, Eye, EyeOff, Instagram, Facebook, Youtube } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 text-center p-12 max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Growth Journey</h2>
          <p className="text-gray-400 mb-8">
            Join 50,000+ creators who trust Elouize Boost Pro to grow their social media presence across multiple platforms.
          </p>
          <div className="flex items-center justify-center gap-8">
            {[
              { icon: <Instagram className="h-8 w-8" />, label: "Instagram" },
              { icon: <Facebook className="h-8 w-8" />, label: "Facebook" },
              { icon: <Youtube className="h-8 w-8" />, label: "TikTok" },
            ].map((platform) => (
              <div key={platform.label} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-dark-700/50 border border-dark-500/50 flex items-center justify-center text-gray-400">
                  {platform.icon}
                </div>
                <span className="text-xs text-gray-500">{platform.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Elouize Boost Pro</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-gray-400 mb-8">Get started with your free account today</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="h-4 w-4" />}
              required
            />
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
              placeholder="Min. 8 characters"
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
            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-dark-500 bg-dark-600" required />
              <span className="text-sm text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </span>
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              Create Account
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
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600/50 border border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500 transition-all">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600/50 border border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500 transition-all">
                <Youtube className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
