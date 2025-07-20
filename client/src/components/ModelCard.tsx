import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    developerId: string;
    assetClass: string;
    currentRoi: string;
    sharpeRatio: string;
    totalInvestors: number;
    minInvestment: string;
    riskLevel: string;
  };
  onInvest?: (modelId: string) => void;
}

export default function ModelCard({ model, onInvest }: ModelCardProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-[var(--quantum-emerald)]/20 text-[var(--quantum-emerald)]';
      case 'medium': return 'bg-[var(--quantum-amber)]/20 text-[var(--quantum-amber)]';
      case 'high': return 'bg-[var(--quantum-red)]/20 text-[var(--quantum-red)]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAssetClassColor = (assetClass: string) => {
    switch (assetClass.toLowerCase()) {
      case 'cryptocurrency': return 'bg-[var(--quantum-blue)]/20 text-[var(--quantum-blue)]';
      case 'stocks': return 'bg-[var(--quantum-amber)]/20 text-[var(--quantum-amber)]';
      case 'forex': return 'bg-[var(--quantum-purple)]/20 text-[var(--quantum-purple)]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="quantum-gradient-border">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-[var(--quantum-emerald)]" />
              </div>
              <div>
                <h4 className="font-semibold">{model.name}</h4>
                <p className="text-sm text-gray-400">by @{model.developerId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[var(--quantum-emerald)] font-bold">+{parseFloat(model.currentRoi).toFixed(1)}%</p>
              <p className="text-xs text-gray-400">ROI</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Sharpe Ratio</span>
              <span className="text-sm">{parseFloat(model.sharpeRatio).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Investors</span>
              <span className="text-sm">{model.totalInvestors}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Min Investment</span>
              <span className="text-sm">${model.minInvestment}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <Badge className={getAssetClassColor(model.assetClass)}>
              {model.assetClass}
            </Badge>
            <Badge className={getRiskColor(model.riskLevel)}>
              {model.riskLevel} Risk
            </Badge>
          </div>
          
          <Button 
            className="w-full quantum-button-primary"
            onClick={() => onInvest?.(model.id)}
          >
            Invest Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
