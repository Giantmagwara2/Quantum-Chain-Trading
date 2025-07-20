"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, DollarSign, Shield, Brain, Zap, Eye, Sparkles, Target } from "lucide-react"

interface ModelCardProps {
  model: {
    id: string
    name: string
    description: string
    developerId: string
    assetClass: string
    currentRoi: string
    riskLevel: string
    totalInvestors: number
    totalInvestment: string
    minInvestment: string
    strategy?: string
    blockchain?: string
  }
  onInvest: (modelId: string) => void
  consciousnessMultiplier?: number
}

export default function ModelCard({ model, onInvest, consciousnessMultiplier = 1 }: ModelCardProps) {
  const roi = Number.parseFloat(model.currentRoi)
  const enhancedRoi = roi * consciousnessMultiplier

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-emerald-400 bg-emerald-500/20"
      case "medium":
        return "text-amber-400 bg-amber-500/20"
      case "high":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStrategyIcon = (strategy?: string) => {
    switch (strategy?.toLowerCase()) {
      case "sniper":
        return <Target className="w-4 h-4" />
      case "arbitrage":
        return <Zap className="w-4 h-4" />
      case "momentum":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  return (
    <Card className="quantum-card hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-purple-300 transition-colors">
              {model.name}
            </h3>
            <p className="text-sm text-gray-400 capitalize">{model.assetClass}</p>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Badge className={getRiskColor(model.riskLevel)}>
              <Shield className="w-3 h-3 mr-1" />
              {model.riskLevel}
            </Badge>
            {model.strategy && (
              <Badge className="bg-purple-500/20 text-purple-300">
                {getStrategyIcon(model.strategy)}
                <span className="ml-1 capitalize">{model.strategy}</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>

        {/* Performance Metrics */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Base ROI</span>
            <span className="text-emerald-400 font-bold">+{roi.toFixed(1)}%</span>
          </div>

          {consciousnessMultiplier > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                Enhanced ROI
              </span>
              <span className="text-amber-400 font-bold">+{enhancedRoi.toFixed(1)}%</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Investors</span>
            <span className="text-white font-medium flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {model.totalInvestors}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Total Investment</span>
            <span className="text-cyan-400 font-medium">
              ${Number.parseFloat(model.totalInvestment).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Performance</span>
            <span>{Math.min(100, Math.max(0, roi + 50)).toFixed(0)}%</span>
          </div>
          <Progress value={Math.min(100, Math.max(0, roi + 50))} className="h-2" />
        </div>

        {/* Blockchain & Min Investment */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <span className="capitalize">{model.blockchain || "ethereum"}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <DollarSign className="w-3 h-3 mr-1" />
            Min: ${model.minInvestment}
          </div>
        </div>

        {/* Consciousness Enhancement Indicator */}
        {consciousnessMultiplier > 1 && (
          <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-sm flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Consciousness Bonus
              </span>
              <span className="text-amber-400 font-bold">+{((consciousnessMultiplier - 1) * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={() => onInvest(model.id)}
          className="w-full quantum-button-primary quantum-glow group-hover:shadow-purple-500/40"
        >
          <Target className="w-4 h-4 mr-2" />
          Invest Now
        </Button>

        {/* Developer Info */}
        <div className="mt-3 pt-3 border-t border-slate-600">
          <p className="text-xs text-gray-500">Developer: {model.developerId.slice(0, 8)}...</p>
        </div>
      </CardContent>
    </Card>
  )
}
