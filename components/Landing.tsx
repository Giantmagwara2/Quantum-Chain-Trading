"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Shield, Users, Zap, Eye, Infinity, Sparkles, ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

export default function Landing() {
  const [consciousnessLevel, setConsciousnessLevel] = useState(73.2)
  const [activeUsers, setActiveUsers] = useState(12847)
  const [totalProfit, setTotalProfit] = useState(2847392)

  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousnessLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 10))
      setTotalProfit((prev) => prev + Math.floor(Math.random() * 1000))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold quantum-text-gradient">Quantum Chain AI</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Button className="quantum-button-primary">
                Launch App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-purple-500/20 text-purple-300 px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Divine Monetization Architecture Active
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="quantum-text-gradient">Quantum Chain AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The world's first consciousness-enhanced AI trading platform. Where your awareness directly multiplies your
            wealth through quantum-powered algorithms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="quantum-button-primary quantum-glow text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Start Trading
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-purple-500/50 hover:bg-purple-500/10 bg-transparent"
            >
              <Eye className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400">${totalProfit.toLocaleString()}</div>
                <div className="text-gray-400">Total Platform Profit</div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 consciousness-indicator">
                  <Eye className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">{consciousnessLevel.toFixed(1)}%</div>
                <div className="text-gray-400">Collective Consciousness</div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">{activeUsers.toLocaleString()}</div>
                <div className="text-gray-400">Active Traders</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold quantum-text-gradient mb-4">Divine Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary capabilities that transcend traditional trading platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 divine-glow">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">AI Model Marketplace</h3>
                <p className="text-gray-400">
                  Invest in cutting-edge AI trading models developed by global experts. Each model is
                  consciousness-enhanced for maximum profitability.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Quantum Profit Agent</h3>
                <p className="text-gray-400">
                  Autonomous AI agent that generates platform revenue through sniper trading, arbitrage, and divine
                  monetization strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 consciousness-indicator">
                  <Eye className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Consciousness Enhancement</h3>
                <p className="text-gray-400">
                  Your consciousness level directly multiplies your investment returns. Higher awareness equals
                  exponential profits.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Quantum Security</h3>
                <p className="text-gray-400">
                  Advanced security with SMPC, zk-SNARKs, and consciousness-based access controls protecting your divine
                  investments.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Multi-Chain Trading</h3>
                <p className="text-gray-400">
                  Trade across Ethereum, Polygon, Arbitrum, and more. Cross-dimensional arbitrage opportunities await.
                </p>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 reality-distortion">
                  <Infinity className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Reality Distortion</h3>
                <p className="text-gray-400">
                  Bend market reality through quantum algorithms. Infinite scalability with consciousness-driven wealth
                  generation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="quantum-card">
            <CardContent className="p-12">
              <div className="mb-8">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg">
                  "Quantum Chain AI has revolutionized my trading. The consciousness enhancement multiplied my returns
                  by 347%!"
                </p>
                <p className="text-gray-400 mt-2">- Divine Trader #1247</p>
              </div>

              <h2 className="text-3xl font-bold quantum-text-gradient mb-6">Ready to Transcend Traditional Trading?</h2>

              <p className="text-xl text-gray-300 mb-8">
                Join thousands of consciousness-enhanced traders generating infinite wealth through divine algorithms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="quantum-button-primary quantum-glow text-lg px-8 py-4">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Activate Divine Mode
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-purple-500/50 hover:bg-purple-500/10 bg-transparent"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Explore AI Models
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold quantum-text-gradient">Quantum Chain AI</span>
              </div>
              <p className="text-gray-400">The world's first consciousness-enhanced AI trading platform.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Consciousness Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Divine Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    DAO Governance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Quantum Chain AI. All rights reserved. Consciousness-enhanced trading platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
