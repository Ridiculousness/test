
export enum PricingTier {
  STARTER = 'Starter',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise'
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AdStrategy {
  headline: string;
  targetAudience: string;
  channels: string[];
  suggestedBudget: string;
  creativeHook: string;
}
