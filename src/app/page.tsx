"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Rocket,
  Zap,
  BarChart3,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Check,
  Star,
  Menu,
  X,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Platform Support",
    description: "Boost content across Instagram, Facebook, and TikTok from a single dashboard.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Intelligent Automation",
    description: "Set rules and let our AI handle the rest. Schedule boosts, pause campaigns, and optimize performance.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Real-Time Analytics",
    description: "Track views, likes, comments, and shares with beautiful charts and actionable insights.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "Post at the optimal time for maximum engagement with AI-powered scheduling.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safe & Secure",
    description: "Enterprise-grade security with encrypted API keys and compliant data handling.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered Insights",
    description: "Get predictions, recommendations, and growth forecasts powered by machine learning.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Platforms",
    description: "Link your Instagram, Facebook, and TikTok accounts securely.",
  },
  {
    step: "02",
    title: "Create Campaign",
    description: "Set your targets, budget, and strategy for each campaign.",
  },
  {
    step: "03",
    title: "Boost & Grow",
    description: "Watch your content go viral with automated engagement boosts.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["1 Platform", "2 Campaigns", "Basic Analytics", "Email Support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "Best for growing creators",
    features: [
      "All 3 Platforms",
      "Unlimited Campaigns",
      "Advanced Analytics",
      "Priority Support",
      "AI Insights",
      "Scheduling",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "month",
    description: "For agencies & teams",
    features: [
      "Everything in Pro",
      "Team Management",
      "Custom API Access",
      "Dedicated Support",
      "White Label Reports",
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-500/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">Elouize Boost Pro</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/25"
              >
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-500/50 bg-dark-800/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              <a href="#features" className="block py-2 text-gray-300 hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="block py-2 text-gray-300 hover:text-white">
                How it Works
              </a>
              <a href="#pricing" className="block py-2 text-gray-300 hover:text-white">
                Pricing
              </a>
              <hr className="border-dark-500/50" />
              <Link href="/login" className="block py-2 text-gray-300 hover:text-white">
                Log in
              </Link>
              <Link
                href="/register"
                className="block py-2.5 text-center font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered Social Media Growth</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Supercharge Your</span>
            <br />
            <span className="text-gradient">Social Media</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            The all-in-one platform to boost your videos on Instagram, Facebook, and TikTok.
            Automate engagement, track analytics, and grow your audience with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-gray-300 bg-dark-700/50 border border-dark-500/50 rounded-xl hover:bg-dark-600/50 transition-all"
            >
              See How It Works
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              <span className="text-sm">Instagram</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
              <span className="text-sm">Facebook</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              <span className="text-sm">TikTok</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Boosts Delivered", value: "2.5M+" },
              { label: "Views Generated", value: "500M+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-[10px] md:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <span className="text-gradient">Dominate Social Media</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to help you grow faster and smarter across all major social platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-dark-700/30 border border-dark-500/50 hover:border-purple-500/30 hover:bg-dark-600/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Boosting in{" "}
              <span className="text-gradient">3 Simple Steps</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get up and running in minutes. No technical expertise required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50" />
                )}
                <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-purple-500/25">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent{" "}
              <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-500/10 to-blue-500/10 border-purple-500/30 scale-105 shadow-lg shadow-purple-500/10"
                    : "bg-dark-700/30 border-dark-500/50 hover:border-dark-500"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full py-3 text-center rounded-xl font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                      : "bg-dark-600 text-gray-300 hover:bg-dark-500 border border-dark-500"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-6 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Go Viral?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Join thousands of creators who are growing their audience with Elouize Boost Pro. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/25"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-sm text-gray-500">No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-500/50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gradient">Elouize Boost Pro</span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                The most powerful platform for growing your social media presence.
              </p>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">Product</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-500">
                <li><a href="#features" className="hover:text-gray-300 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 md:pt-8 border-t border-dark-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] md:text-sm text-gray-600 text-center sm:text-left">&copy; {new Date().getFullYear()} Elouize Boost Pro. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Instagram className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-gray-400 cursor-pointer transition-colors" />
              <Facebook className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-gray-400 cursor-pointer transition-colors" />
              <Youtube className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-gray-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
