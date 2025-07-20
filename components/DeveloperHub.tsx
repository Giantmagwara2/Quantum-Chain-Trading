"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Code,
  Upload,
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  Sparkles,
  Cpu,
  Network,
  Target,
  Activity,
} from "lucide-react"

export default function DeveloperHub() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [modelData, setModelData] = useState({
    name: "",
    description: "",
    assetClass: "",
    strategy: "",
    blockchain: "ethereum",
    minInvestment: "10",
    privacyLevel: "standard",
    automaticTrading: false,
  })

  const { data: userModels } = useQuery({
    queryKey: ["/api/models/user"],
    refetchInterval: 30000,
  })

  const createModelMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create model")
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Model Created Successfully",
        description: "Your consciousness-enhanced AI model has been submitted for evaluation!",
      })
      setModelData({
        name: "",
        description: "",
        assetClass: "",
        strategy: "",
        blockchain: "ethereum",
        minInvestment: "10",
        privacyLevel: "standard",
        automaticTrading: false,
      })
      queryClient.invalidateQueries({ queryKey: ["/api/models/user"] })
    },
    onError: () => {
      toast({
        title: "Creation Failed",
        description: "There was an error creating your model. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!modelData.name || !modelData.description || !modelData.assetClass) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    createModelMutation.mutate(modelData)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold quantum-text-gradient">Developer Hub</h1>
                <p className="text-gray-400 mt-2">Create consciousness-enhanced AI trading models</p>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-purple-500/20 text-purple-300 px-4 py-2">
                  <Brain className="w-4 h-4 mr-2" />
                  AI-Powered IDE
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Quantum Security
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="create">Create Model</TabsTrigger>
              <TabsTrigger value="models">My Models</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Model Creation Form */}
                <div className="lg:col-span-2">
                  <Card className="quantum-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-purple-400">
                        <Code className="w-5 h-5 mr-2" />
                        Create AI Trading Model
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-300">
                              Model Name *
                            </Label>
                            <Input
                              id="name"
                              value={modelData.name}
                              onChange={(e) => setModelData({ ...modelData, name: e.target.value })}
                              placeholder="e.g., Quantum Momentum Trader"
                              className="quantum-input mt-2"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="assetClass" className="text-gray-300">
                              Asset Class *
                            </Label>
                            <Select
                              value={modelData.assetClass}
                              onValueChange={(value) => setModelData({ ...modelData, assetClass: value })}
                            >
                              <SelectTrigger className="quantum-input mt-2">
                                <SelectValue placeholder="Select asset class" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                                <SelectItem value="stocks">Stock Market</SelectItem>
                                <SelectItem value="forex">Forex</SelectItem>
                                <SelectItem value="commodities">Commodities</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-gray-300">
                            Description *
                          </Label>
                          <Textarea
                            id="description"
                            value={modelData.description}
                            onChange={(e) => setModelData({ ...modelData, description: e.target.value })}
                            placeholder="Describe your AI model's strategy and capabilities..."
                            className="quantum-input mt-2 min-h-[100px]"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="strategy" className="text-gray-300">
                              Trading Strategy
                            </Label>
                            <Select
                              value={modelData.strategy}
                              onValueChange={(value) => setModelData({ ...modelData, strategy: value })}
                            >
                              <SelectTrigger className="quantum-input mt-2">
                                <SelectValue placeholder="Select strategy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="momentum">Momentum Trading</SelectItem>
                                <SelectItem value="arbitrage">Arbitrage</SelectItem>
                                <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                                <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                                <SelectItem value="defi">DeFi Strategies</SelectItem>
                                <SelectItem value="sniper">Sniper Trading</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="blockchain" className="text-gray-300">
                              Blockchain
                            </Label>
                            <Select
                              value={modelData.blockchain}
                              onValueChange={(value) => setModelData({ ...modelData, blockchain: value })}
                            >
                              <SelectTrigger className="quantum-input mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                <SelectItem value="polygon">Polygon</SelectItem>
                                <SelectItem value="arbitrum">Arbitrum</SelectItem>
                                <SelectItem value="base">Base</SelectItem>
                                <SelectItem value="avalanche">Avalanche</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="minInvestment" className="text-gray-300">
                              Min Investment ($)
                            </Label>
                            <Input
                              id="minInvestment"
                              type="number"
                              value={modelData.minInvestment}
                              onChange={(e) => setModelData({ ...modelData, minInvestment: e.target.value })}
                              className="quantum-input mt-2"
                              min="10"
                            />
                          </div>

                          <div>
                            <Label htmlFor="privacyLevel" className="text-gray-300">
                              Privacy Level
                            </Label>
                            <Select
                              value={modelData.privacyLevel}
                              onValueChange={(value) => setModelData({ ...modelData, privacyLevel: value })}
                            >
                              <SelectTrigger className="quantum-input mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="smpc">SMPC Enhanced</SelectItem>
                                <SelectItem value="zk">zk-SNARKs</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="automaticTrading"
                            checked={modelData.automaticTrading}
                            onChange={(e) => setModelData({ ...modelData, automaticTrading: e.target.checked })}
                            className="w-4 h-4 text-purple-600 bg-slate-700 border-gray-600 rounded focus:ring-purple-500"
                          />
                          <Label htmlFor="automaticTrading" className="text-gray-300">
                            Enable Automatic Trading
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          disabled={createModelMutation.isPending}
                          className="w-full quantum-button-primary quantum-glow"
                        >
                          {createModelMutation.isPending ? (
                            <>
                              <Zap className="w-4 h-4 mr-2 animate-spin" />
                              Creating Model...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Create Consciousness-Enhanced Model
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhancement Features */}
                <div className="space-y-6">
                  <Card className="quantum-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-amber-400">
                        <Eye className="w-5 h-5 mr-2" />
                        Consciousness Enhancement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Awareness Integration</span>
                        <Badge className="bg-amber-500/20 text-amber-300">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Intuition Algorithms</span>
                        <Badge className="bg-purple-500/20 text-purple-300">Enhanced</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Quantum Coherence</span>
                        <Badge className="bg-cyan-500/20 text-cyan-300">Optimized</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="quantum-card">
                    <CardHeader>
                      <CardTitle className="flex items-center text-emerald-400">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Divine Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Network className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Federated Learning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">Quantum Security</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-gray-300">Auto-Optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-gray-300">Reality Distortion</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userModels?.map((model: any) => (
                  <Card key={model.id} className="quantum-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white">{model.name}</h3>
                        <Badge
                          className={
                            model.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : model.status === "pending"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-red-500/20 text-red-300"
                          }
                        >
                          {model.status}
                        </Badge>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{model.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ROI</span>
                          <span className="text-emerald-400 font-bold">
                            +{Number.parseFloat(model.currentRoi).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Investors</span>
                          <span className="text-white">{model.totalInvestors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Investment</span>
                          <span className="text-cyan-400">
                            ${Number.parseFloat(model.totalInvestment).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 quantum-button-primary">
                        <Activity className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {(!userModels || userModels.length === 0) && (
                  <Card className="quantum-card col-span-full">
                    <CardContent className="p-8 text-center">
                      <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Models Yet</h3>
                      <p className="text-gray-400 mb-4">
                        Create your first consciousness-enhanced AI trading model to get started.
                      </p>
                      <Button className="quantum-button-primary">
                        <Code className="w-4 h-4 mr-2" />
                        Create Your First Model
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="collaboration">
              <Card className="quantum-card">
                <CardContent className="p-8 text-center">
                  <Network className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Federated Learning Hub</h3>
                  <p className="text-gray-400 mb-4">
                    Collaborate with other developers to create consciousness-enhanced models through federated
                    learning.
                  </p>
                  <Button className="quantum-button-primary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Collaboration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="quantum-card">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-gray-400 mb-4">
                    Deep insights into your model performance, consciousness enhancement metrics, and divine
                    multipliers.
                  </p>
                  <Button className="quantum-button-primary">
                    <Activity className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
