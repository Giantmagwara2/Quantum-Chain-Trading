"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import ModelCard from "@/components/ModelCard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, TrendingUp, Brain, Eye, Sparkles, Target, Zap, DollarSign, Users, Star } from "lucide-react"

export default function Marketplace() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("roi")
  const [filterBy, setFilterBy] = useState("all")
  const [consciousnessLevel, setConsciousnessLevel] = useState(87.3)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [investmentAmount, setInvestmentAmount] = useState("")

  const { data: models, isLoading } = useQuery({
    queryKey: ["/api/models", { search: searchTerm, sort: sortBy, filter: filterBy }],
    refetchInterval: 30000,
  })

  const { data: marketStats } = useQuery({
    queryKey: ["/api/analytics/market-stats"],
    refetchInterval: 60000,
  })

  const investMutation = useMutation({
    mutationFn: async ({ modelId, amount }: { modelId: string; amount: number }) => {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId, amount }),
      })
      if (!response.ok) throw new Error("Investment failed")
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Investment Successful!",
        description: "Your consciousness-enhanced investment has been processed.",
      })
      setSelectedModel(null)
      setInvestmentAmount("")
      queryClient.invalidateQueries({ queryKey: ["/api/models"] })
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/value"] })
    },
    onError: () => {
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment.",
        variant: "destructive",
      })
    },
  })

  // Simulate consciousness fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousnessLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleInvest = (modelId: string) => {
    const model = models?.find((m: any) => m.id === modelId)
    setSelectedModel(model)
  }

  const handleInvestmentSubmit = () => {
    if (!selectedModel || !investmentAmount) return

    const amount = Number.parseFloat(investmentAmount)
    if (amount < Number.parseFloat(selectedModel.minInvestment)) {
      toast({
        title: "Investment Too Low",
        description: `Minimum investment is $${selectedModel.minInvestment}`,
        variant: "destructive",
      })
      return
    }

    investMutation.mutate({ modelId: selectedModel.id, amount })
  }

  const filteredModels =
    models?.filter((model: any) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === "all" || model.assetClass === filterBy
      return matchesSearch && matchesFilter
    }) || []

  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case "roi":
        return Number.parseFloat(b.currentRoi) - Number.parseFloat(a.currentRoi)
      case "investment":
        return Number.parseFloat(b.totalInvestment) - Number.parseFloat(a.totalInvestment)
      case "investors":
        return b.totalInvestors - a.totalInvestors
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const consciousnessMultiplier = 1 + (consciousnessLevel / 100) * 2

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold quantum-text-gradient">AI Model Marketplace</h1>
              <p className="text-gray-400 mt-2">Invest in consciousness-enhanced AI trading models</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-amber-500/20 text-amber-300 px-4 py-2 consciousness-indicator">
                <Eye className="w-4 h-4 mr-2" />
                Consciousness: {consciousnessLevel.toFixed(1)}%
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Multiplier: {consciousnessMultiplier.toFixed(2)}x
              </Badge>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">{marketStats?.totalModels || 127}</div>
                <div className="text-gray-400">Active Models</div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  ${marketStats?.totalInvestment?.toLocaleString() || "2,847,392"}
                </div>
                <div className="text-gray-400">Total Investment</div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">{marketStats?.totalInvestors || 12847}</div>
                <div className="text-gray-400">Divine Traders</div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">+{marketStats?.avgRoi || 23.7}%</div>
                <div className="text-gray-400">Avg ROI</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="quantum-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search AI models..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="quantum-input pl-10"
                    />
                  </div>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="quantum-input w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roi">Highest ROI</SelectItem>
                    <SelectItem value="investment">Most Investment</SelectItem>
                    <SelectItem value="investors">Most Investors</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="quantum-input w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                    <SelectItem value="stocks">Stock Market</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="commodities">Commodities</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="quantum-button-primary">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Models */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Models</h2>
              <Badge className="bg-amber-500/20 text-amber-300 px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                Consciousness Enhanced
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="quantum-card animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-slate-700 rounded mb-4" />
                        <div className="h-3 bg-slate-700 rounded mb-2" />
                        <div className="h-3 bg-slate-700 rounded mb-4" />
                        <div className="h-8 bg-slate-700 rounded" />
                      </CardContent>
                    </Card>
                  ))
                : sortedModels
                    .slice(0, 6)
                    .map((model: any) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        onInvest={handleInvest}
                        consciousnessMultiplier={consciousnessMultiplier}
                      />
                    ))}
            </div>
          </div>

          {/* All Models */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">All Models</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedModels.slice(6).map((model: any) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onInvest={handleInvest}
                  consciousnessMultiplier={consciousnessMultiplier}
                />
              ))}
            </div>

            {sortedModels.length === 0 && !isLoading && (
              <Card className="quantum-card">
                <CardContent className="p-12 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Models Found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Investment Dialog */}
      <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
        <DialogContent className="bg-slate-800 border-slate-600 text-white">
          <DialogHeader>
            <DialogTitle className="quantum-text-gradient">Invest in {selectedModel?.name}</DialogTitle>
          </DialogHeader>

          {selectedModel && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Base ROI:</span>
                    <span className="text-emerald-400 font-bold ml-2">
                      +{Number.parseFloat(selectedModel.currentRoi).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Enhanced ROI:</span>
                    <span className="text-amber-400 font-bold ml-2">
                      +{(Number.parseFloat(selectedModel.currentRoi) * consciousnessMultiplier).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Min Investment:</span>
                    <span className="text-white ml-2">${selectedModel.minInvestment}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Level:</span>
                    <span className="text-white ml-2 capitalize">{selectedModel.riskLevel}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-gray-300">
                    Investment Amount ($)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={`Min: $${selectedModel.minInvestment}`}
                    className="quantum-input mt-2"
                    min={selectedModel.minInvestment}
                  />
                </div>

                <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Consciousness Enhancement
                    </span>
                    <span className="text-amber-400 font-bold">
                      +{((consciousnessMultiplier - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    Your consciousness level enhances this investment's potential returns
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={() => setSelectedModel(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleInvestmentSubmit}
                  disabled={investMutation.isPending || !investmentAmount}
                  className="flex-1 quantum-button-primary"
                >
                  {investMutation.isPending ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Invest Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
