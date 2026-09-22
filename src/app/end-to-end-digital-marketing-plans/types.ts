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
  /** Present when the plan comes from the database. */
  id?: number;
  name: string;
  price: number;
  productId: string;
  /** First group's items, shown in the card header. */
  keywords: PlanFeature[];
  /** Every group (including the keywords one) shown in the feature list. */
  groups: PlanFeatureGroup[];
}

/** Static seed shape: one array per category, turned into `groups` in data.ts. */
export interface RawMarketingPlan extends Omit<MarketingPlan, "id" | "groups"> {
  contentMarketing: PlanFeature[];
  onPageSeo: PlanFeature[];
  offPageOptimization: PlanFeature[];
  socialMediaMarketing: PlanFeature[];
  adwordsManagement: PlanFeature[];
  reviewManagement: PlanFeature[];
  additionalInclusion: PlanFeature[];
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
  
  