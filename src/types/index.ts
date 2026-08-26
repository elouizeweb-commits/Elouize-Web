export type PlatformType = "INSTAGRAM" | "FACEBOOK" | "TIKTOK";
export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "CANCELLED";
export type BoostType = "VIEWS" | "LIKES" | "COMMENTS" | "SHARES";
export type BoostTaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED";
export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: UserRole;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  id: string;
  userId: string;
  type: PlatformType;
  accessToken: string;
  refreshToken: string | null;
  accountId: string;
  username: string | null;
  displayName: string | null;
  profileImage: string | null;
  followersCount: number;
  isActive: boolean;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  userId: string;
  platformId: string | null;
  name: string;
  platform: PlatformType;
  videoUrl: string | null;
  contentTitle: string | null;
  targetViews: number;
  targetLikes: number;
  targetComments: number;
  targetShares: number;
  budget: number;
  spentAmount: number;
  status: CampaignStatus;
  startDate: Date | null;
  endDate: Date | null;
  currentViews: number;
  currentLikes: number;
  currentComments: number;
  currentShares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoostTask {
  id: string;
  campaignId: string;
  type: BoostType;
  target: number;
  current: number;
  status: BoostTaskStatus;
  priority: number;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  failedAt: Date | null;
  errorMessage: string | null;
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id: string;
  campaignId: string;
  platform: PlatformType;
  date: Date;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
  impressions: number;
  reach: number;
  createdAt: Date;
}

export interface AutomationRule {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  trigger: string;
  action: string;
  conditions: string | null;
  isActive: boolean;
  lastRunAt: Date | null;
  runCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BoostSimulation {
  campaignId: string;
  platform: PlatformType;
  estimatedViews: number;
  estimatedLikes: number;
  estimatedComments: number;
  estimatedShares: number;
  estimatedEngagement: number;
  estimatedCost: number;
  duration: number;
  confidence: number;
}

export interface BoostReport {
  campaignId: string;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avgEngagement: number;
  peakHour: number;
  growthRate: number;
  topPerformingDay: string;
  recommendations: string[];
}

export interface PlatformMetrics {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  recentGrowth: number;
}

export interface GrowthPrediction {
  date: string;
  views: number;
  likes: number;
  comments: number;
  confidence: number;
}

export interface CampaignWithStats extends Campaign {
  boostTasks: BoostTask[];
  analytics: Analytics[];
  platformData?: Platform;
  completionPercentage: number;
  roi: number;
}

export interface DashboardStats {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalRevenue: number;
  engagementRate: number;
}

export interface QueueStatus {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  failed: number;
  averageProcessingTime: number;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  campaignUpdates: boolean;
  milestoneAlerts: boolean;
  weeklyReport: boolean;
}

export interface AppSettings {
  profile: {
    name: string;
    email: string;
    image: string | null;
  };
  notifications: NotificationPreferences;
  apiKeys: {
    instagram: boolean;
    facebook: boolean;
    tiktok: boolean;
  };
}
