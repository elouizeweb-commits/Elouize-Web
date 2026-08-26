"use client";

import { useState, useCallback } from "react";
import { DashboardStats, GrowthPrediction, BoostReport, PlatformType } from "@/types";

interface UseAnalyticsReturn {
  stats: DashboardStats | null;
  predictions: GrowthPrediction[];
  report: BoostReport | null;
  platformComparison: Record<PlatformType, { followers: number; engagement: number; campaigns: number }> | null;
  recentActivity: any[];
  loading: boolean;
  error: string | null;
  fetchDashboardStats: () => Promise<void>;
  fetchPredictions: (campaignId: string, days: number) => Promise<void>;
  fetchReport: (campaignId: string) => Promise<void>;
  fetchPlatformComparison: () => Promise<void>;
  fetchRecentActivity: () => Promise<void>;
  exportData: (format: string) => Promise<any>;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [predictions, setPredictions] = useState<GrowthPrediction[]>([]);
  const [report, setReport] = useState<BoostReport | null>(null);
  const [platformComparison, setPlatformComparison] = useState<Record<PlatformType, { followers: number; engagement: number; campaigns: number }> | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics?view=dashboard");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPredictions = useCallback(async (campaignId: string, days: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?view=predictions&campaignId=${campaignId}&days=${days}`);
      if (!res.ok) throw new Error("Failed to fetch predictions");
      const data = await res.json();
      setPredictions(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReport = useCallback(async (campaignId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?view=report&campaignId=${campaignId}`);
      if (!res.ok) throw new Error("Failed to fetch report");
      const data = await res.json();
      setReport(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlatformComparison = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics?view=platforms");
      if (!res.ok) throw new Error("Failed to fetch platform comparison");
      const data = await res.json();
      setPlatformComparison(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecentActivity = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics?view=activity");
      if (!res.ok) throw new Error("Failed to fetch recent activity");
      const data = await res.json();
      setRecentActivity(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const exportData = useCallback(async (format: string) => {
    try {
      const res = await fetch(`/api/analytics?view=export&format=${format}`);
      if (!res.ok) throw new Error("Failed to export data");
      return await res.json();
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  }, []);

  return {
    stats,
    predictions,
    report,
    platformComparison,
    recentActivity,
    loading,
    error,
    fetchDashboardStats,
    fetchPredictions,
    fetchReport,
    fetchPlatformComparison,
    fetchRecentActivity,
    exportData,
  };
}
