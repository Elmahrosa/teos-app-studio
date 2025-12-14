export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<any>;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'building' | 'compliance_check' | 'deployed';
  techStack: string[];
  lastUpdated: string;
  complianceScore: number;
}

export interface Metric {
  name: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export enum AppTemplate {
  FINTECH = 'Fintech Starter',
  ECOMMERCE = 'E-commerce V2',
  SOCIAL = 'Social Graph',
  SAAS = 'SaaS B2B'
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}