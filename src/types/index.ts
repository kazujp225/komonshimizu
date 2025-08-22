// Company and IPO Types
export interface Company {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  foundedDate: string;
  ipoDate: string;
  ipoPrice: number;
  currentPrice: number;
  marketCap: number;
  employees: number;
  revenue2023: number;
  profitMargin: number;
  description: string;
  ceoAge: number;
  founderStory: string;
  businessModel: string;
  competitiveAdvantage: string;
  growthRate: number;
  tags: string[];
}

// Assessment Types
export interface AssessmentQuestion {
  id: string;
  type: 'single' | 'multiple';
  category: string;
  question: string;
  options: AssessmentOption[];
  weight: number;
}

export interface AssessmentOption {
  value: string;
  label: string;
  score: number;
}

export interface AssessmentSection {
  sectionId: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  range: string;
  minScore: number;
  maxScore: number;
  title: string;
  subtitle: string;
  description: string;
  probability: number;
  color: string;
  icon: string;
  recommendations: string[];
  nextSteps: string[];
  timeline: string;
}

// Pricing Types
export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  category: 'Good' | 'Better' | 'Best';
  targetAudience: string;
  pricing: {
    monthly: number;
    quarterly: number;
    annually: number;
    setup_fee: number;
  };
  originalPrice?: {
    monthly: number;
    quarterly: number;
    annually: number;
  };
  discount?: {
    percentage: number;
    validUntil: string;
    reason: string;
  };
  popular: boolean;
  features: FeatureGroup[];
  limitations?: string[];
  bonuses?: string[];
  cta: string;
  guarantee: string;
}

export interface FeatureGroup {
  category: string;
  items: string[];
}

// Customer Types
export interface Customer {
  id: string;
  profile: {
    name: string;
    age: number;
    gender: string;
    location: string;
    avatar: string;
  };
  company: {
    name: string;
    industry: string;
    foundedDate: string;
    employeeCount: number;
    businessModel: string;
    currentRevenue: number;
    targetRevenue: number;
  };
  subscription: {
    plan: string;
    startDate: string;
    status: string;
    monthlyValue: number;
    totalLifetimeValue: number;
    churnRisk: string;
  };
  assessment: {
    score: number;
    category: string;
    lastAssessment: string;
    improvementAreas: string[];
  };
  engagement: {
    consultationsSoFar: number;
    lastLogin: string;
    responseRate: number;
    satisfactionScore: number;
    npsScore: number;
  };
  milestones: Milestone[];
  tags: string[];
}

export interface Milestone {
  date: string;
  achievement: string;
  impact: string;
  amount?: number;
}

// Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt: string;
  status: string;
  category: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    targetKeywords: string[];
  };
  engagement: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    readingCompletionRate: number;
  };
  cta: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  createdAt: string;
  publishedAt: string;
  status: string;
  category: string;
  tags: string[];
  platform: {
    youtube?: PlatformMetrics;
    tiktok?: PlatformMetrics;
    instagram?: PlatformMetrics;
  };
  script: ScriptSection[];
  performance: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    engagementRate: number;
    watchTimeRetention: number;
    clickThroughRate: number;
  };
  cta: {
    text: string;
    url: string;
    clicks: number;
  };
}

export interface PlatformMetrics {
  videoId: string;
  views: number;
  likes: number;
  comments: number;
  shares?: number;
  saves?: number;
  subscribers_gained?: number;
}

export interface ScriptSection {
  timestamp: string;
  text: string;
  scene: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  company: {
    name: string;
    industry: string;
    founded: string;
    ipoDate: string;
    currentMarketCap: number;
    logo: string;
  };
  founder: {
    name: string;
    ageAtFounding: number;
    ageAtIPO: number;
    background: string;
    photo: string;
  };
  challenge: {
    title: string;
    description: string;
    specificChallenges: string[];
  };
  solution: {
    title: string;
    approach: string;
    keyInitiatives: Initiative[];
  };
  results: {
    title: string;
    timeline: TimelineEvent[];
    keyMetrics: Record<string, string | number>;
  };
  lessons: {
    title: string;
    successFactors: SuccessFactor[];
    quote: string;
    quotee: string;
  };
  impact: {
    businessImpact: string[];
    socialImpact: string[];
  };
  publishedAt: string;
  lastUpdated: string;
  status: string;
  views: number;
  downloads: number;
  shares: number;
}

export interface Initiative {
  initiative: string;
  description: string;
  timeline: string;
  impact: string;
}

export interface TimelineEvent {
  date: string;
  milestone: string;
  amount?: number;
  marketCap?: number;
  details: string;
}

export interface SuccessFactor {
  factor: string;
  description: string;
}

// KPI and Analytics Types
export interface KPIData {
  lastUpdated: string;
  period: string;
  revenue: RevenueMetrics;
  pipeline: PipelineMetrics;
  marketing: MarketingMetrics;
  operations: OperationalMetrics;
  forecasting: ForecastingMetrics;
  benchmarks: BenchmarkMetrics;
  alerts: Alert[];
}

export interface RevenueMetrics {
  monthly: {
    current: MonthlyRevenue;
    target: MonthlyRevenue;
    variance: Record<string, number>;
  };
  yearly: Record<string, YearlyRevenue>;
  trending: TrendData[];
}

export interface MonthlyRevenue {
  mrr: number;
  arr: number;
  newCustomers: number;
  churnedCustomers: number;
  netRevenue: number;
  averageDealSize: number;
  churnRate: number;
}

export interface YearlyRevenue {
  totalRevenue: number;
  newCustomerRevenue: number;
  expansionRevenue: number;
  churnedRevenue: number;
  netRevenueRetention: number;
}

export interface TrendData {
  month: string;
  value: number;
}

export interface PipelineMetrics {
  current: CurrentPipeline;
  targets: PipelineTargets;
  stages: PipelineStage[];
  funnel: Record<string, number>;
}

export interface CurrentPipeline {
  qualifiedLeads: number;
  opportunitiesInPipeline: number;
  totalPipelineValue: number;
  averageDealSize: number;
  salesCycleLength: number;
  winRate: number;
  lostRate: number;
  activelyNegotiating: number;
}

export interface PipelineTargets {
  qualifiedLeads: number;
  winRate: number;
  averageDealSize: number;
  salesCycleLength: number;
}

export interface PipelineStage {
  stage: string;
  count: number;
  value: number;
  averageTimeInStage: number;
  conversionRate: number;
}

export interface MarketingMetrics {
  website: WebsiteMetrics;
  targets: Record<string, number>;
  leadSources: LeadSource[];
  content: ContentMetrics;
  campaigns: Campaign[];
}

export interface WebsiteMetrics {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  averageSessionDuration: number;
  conversionRate: number;
  organicTraffic: number;
  paidTraffic: number;
}

export interface LeadSource {
  source: string;
  leads: number;
  percentage: number;
}

export interface ContentMetrics {
  blogPosts: number;
  videos: number;
  whitepapers: number;
  caseStudies: number;
  totalViews: number;
  totalShares: number;
  totalDownloads: number;
}

export interface Campaign {
  name: string;
  status: string;
  budget: number;
  spent: number;
  leads: number;
  cpl: number;
  roi: number;
}

export interface OperationalMetrics {
  customerSuccess: CustomerSuccessMetrics;
  team: TeamMetrics;
  efficiency: EfficiencyMetrics;
}

export interface CustomerSuccessMetrics {
  nps: number;
  csat: number;
  churnRate: number;
  expansionRate: number;
  supportTickets: number;
  averageResponseTime: number;
  firstCallResolution: number;
}

export interface TeamMetrics {
  totalEmployees: number;
  sales: number;
  marketing: number;
  product: number;
  customerSuccess: number;
  admin: number;
}

export interface EfficiencyMetrics {
  revenuePerEmployee: number;
  salesVelocity: number;
  marketingCostPerLead: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  ltvToCacRatio: number;
}

export interface ForecastingMetrics {
  next3Months: Record<string, MonthlyForecast>;
  yearEnd2025: YearEndForecast;
}

export interface MonthlyForecast {
  predictedMrr: number;
  predictedNewCustomers: number;
  confidence: number;
}

export interface YearEndForecast {
  targetArr: number;
  requiredGrowthRate: number;
  probabilityOfSuccess: number;
  keyRisks: string[];
}

export interface BenchmarkMetrics {
  industry: Record<string, number>;
  performance: Record<string, number>;
}

export interface Alert {
  type: string;
  metric: string;
  message: string;
  severity: string;
  actionRequired: boolean;
}