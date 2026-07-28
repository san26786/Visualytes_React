export interface PlanFeature {
  name: string;
  enabled: boolean;
  value?: string | null;
}
 
export interface PlanFeatureGroup {
  title: string;
  items: PlanFeature[];
}

export interface MarketingPlan {
  name: string;
  price: number;
  productId: string;
  keywords: PlanFeature[];
  contentMarketing: PlanFeature[];
  onPageSeo: PlanFeature[];
  offPageOptimization: PlanFeature[];
  socialMediaMarketing: PlanFeature[];
  adwordsManagement: PlanFeature[];
  reviewManagement: PlanFeature[];
  additionalInclusion: PlanFeature[];
  /** Same features as above, grouped for display in PlanFeatures */
  groups: PlanFeatureGroup[];
}
 
  
  
  export type MarketingGroup = {
    title: string;
    items: MarketingFeature[];
  };
  
  
  export type MarketingFeature = {
    name: string;
    enabled: boolean;
    value?: string | null;
  };
  
  