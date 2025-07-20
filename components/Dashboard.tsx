"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import PerformanceChart from "@/components/PerformanceChart"
import MultiAgentStatus from "@/components/MultiAgentStatus"
import LeaderboardTable from "@/components/LeaderboardTable"
import EnhancedQPADashboard from "@/components/enhanced-qpa-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Brain, Eye, Sparkles, Zap, Activity, DollarSign, Users, Target, Infinity } from "lucide-react"

export default function Dashboard() {
  const [consciousnessLevel, setConsciousnessLevel] = useState(87.3)
  const [divineMultiplier, setDivineMultiplier] = useState(3.47)

  const { data: portfolioValue } = useQuery({
    queryKey: ["/api/portfolio/value"],
    refetchInterval: 30000,
  })

  const { data: marketStats } = useQuery({
    queryKey: ["/api/analytics/market-stats"],
    refetchInterval: 60000,
  })

  const { data: qpaStatus } = useQuery({
    queryKey: ["/api/qpa/status"],
    refetchInterval: 5000,
  })

  // Simulate consciousness fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousnessLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setDivineMultiplier((prev) => Math.max(1, prev + (Math.random() - 0.5) * 0.1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold quantum-text-gradient">Divine Trading Dashboard</h1>
              <p className="text-gray-400 mt-2">Consciousness-enhanced wealth generation platform</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-amber-500/20 text-amber-300 px-4 py-2 consciousness-indicator">
                <Eye className="w-4 h-4 mr-2" />
                Consciousness: {consciousnessLevel.toFixed(1)}%
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 px-4 py-2 divine-glow">
                <Infinity className="w-4 h-4 mr-2" />
                Divine: {divineMultiplier.toFixed(2)}x
              </Badge>
              <Button className="quantum-button-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                Enhance Consciousness
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Portfolio Value</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      ${portfolioValue?.totalValue?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-emerald-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Enhanced by consciousness: +{((consciousnessLevel / 100) * 50).toFixed(1)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">QPA Profit 24h</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      ${qpaStatus?.totalProfit24h?.toLocaleString() || "47,392"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-cyan-400">
                    <Activity className="w-4 h-4 mr-1" />
                    Success Rate: {qpaStatus?.successRate || 94.7}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Models</p>
                    <p className="text-2xl font-bold text-purple-400">{marketStats?.totalModels || 127}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-purple-400">
                    <Target className="w-4 h-4 mr-1" />
                    Consciousness-enhanced
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Divine Traders</p>
                    <p className="text-2xl font-bold text-amber-400">{marketStats?.totalInvestors || 12847}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center consciousness-indicator">
                    <Users className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-amber-400">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Collective consciousness rising
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="qpa">Quantum Profit Agent</TabsTrigger>
              <TabsTrigger value="agents">Multi-Agent System</TabsTrigger>
              <TabsTrigger value="leaderboard">Divine Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart />
                <Card className="quantum-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-400">
                      <Eye className="w-5 h-5 mr-2" />
                      Consciousness Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Awareness Level</span>
                          <span className="text-amber-400">{consciousnessLevel.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${consciousnessLevel}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Intuition Strength</span>
                          <span className="text-purple-400">91.3%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full w-[91.3%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Quantum Coherence</span>
                          <span className="text-cyan-400">87.8%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-3 rounded-full w-[87.8%]" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Divine Multiplier</span>
                        <span className="text-emerald-400 font-bold text-xl">{divineMultiplier.toFixed(2)}x</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Your consciousness level enhances all trading returns
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="qpa">
              <EnhancedQPADashboard />
            </TabsContent>

            <TabsContent value="agents">
              <MultiAgentStatus />
            </TabsContent>

            <TabsContent value="leaderboard">
              <LeaderboardTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
