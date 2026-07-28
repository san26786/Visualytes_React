
import FeatureGroup from "./FeatureGroup";
import type { MarketingFeature } from "../types";


type FeatureGroupData = {
  title: string;
  items: MarketingFeature[];
};


type PlanFeaturesProps = {
  groups: FeatureGroupData[];
};


export default function PlanFeatures({
  groups,
}: PlanFeaturesProps) {
    
    
    return (
    
    <div
    className="
    flex-1
    border-t
    border-white/10
    p-6
    space-y-8
    "
    >
    
    {
    groups.map(
    (group)=>(
    
    <FeatureGroup
    key={group.title}
    group={group}
    />
    
    ))
    }
    
    </div>
    
    )
    
    }
