import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsCards from "@/components/StatsCards";
import PerformanceChart from "@/components/PerformanceChart";
import LeaderboardTable from "@/components/LeaderboardTable";
import MultiAgentStatus from "@/components/MultiAgentStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Users, ServerCog, Shield, Zap, Rocket, Brain } from "lucide-react";

export default function Dashboard() {
  const { data: agentStatus } = useQuery({
    queryKey: ['/api/agents/status'],
    refetchInterval: 5000,
  });

  const { data: qpaStatus } = useQuery({
    queryKey: ['/api/qpa/status'],
    refetchInterval: 10000,
  });

  const { data: qpaRevenue } = useQuery({
    queryKey: ['/api/qpa/revenue'],
    refetchInterval: 15000,
  });

  const { data: platformPerformance } = useQuery({
    queryKey: ['/api/analytics/platform-performance'],
    refetchInterval: 30000,
  });

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'market': return BarChart3;
      case 'risk': return Shield;
      case 'evaluation': return ServerCog;
      case 'portfolio': return Users;
      case 'qpa': return Zap;
      default: return Brain;
    }
  };

  const getAgentName = (type: string) => {
    switch (type) {
      case 'market': return 'Market Analysis Agent';
      case 'risk': return 'Risk Assessment Agent';
      case 'evaluation': return 'Model Evaluation Agent';
      case 'portfolio': return 'Portfolio Optimization Agent';
      case 'qpa': return 'Quantum Profit Agent';
      default: return type;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-6">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--quantum-blue)]/10 to-[var(--quantum-purple)]/10 border border-[var(--quantum-purple)]/20 p-8">
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4 quantum-text-gradient">
                  Revolutionary AI Trading Platform
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Invest in AI trading models and create a new asset class with quantum-powered insights
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="quantum-button-primary quantum-glow">
                    <Rocket className="w-4 h-4 mr-2" />
                    Start Trading
                  </Button>
                  <Button className="quantum-button-secondary">
                    <Brain className="w-4 h-4 mr-2" />
                    Upload Model
                  </Button>
                </div>
              </div>
              
              {/* Quantum Particles */}
              <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
                <div className="particle animate-float" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
                <div className="particle animate-float" style={{ top: '30%', left: '60%', animationDelay: '0.5s' }}></div>
                <div className="particle animate-float" style={{ top: '60%', left: '30%', animationDelay: '1s' }}></div>
                <div className="particle animate-float" style={{ top: '80%', left: '70%', animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Quantum Profit Agent Status */}
          {qpaStatus && (
            <div className="mb-8">
              <Card className="quantum-card border-[var(--quantum-emerald)]/30 bg-gradient-to-r from-[var(--quantum-emerald)]/5 to-[var(--quantum-blue)]/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-[var(--quantum-emerald)]" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--quantum-emerald)]">Quantum Profit Agent</CardTitle>
                        <p className="text-sm text-gray-400">Autonomous Revenue Generation System</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
                      <span className="text-[var(--quantum-emerald)] font-medium">ACTIVE</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--quantum-emerald)]">
                        ${qpaRevenue?.totalRevenue?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-gray-400">24h Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--quantum-blue)]">
                        {qpaStatus.totalTrades || 0}
                      </p>
                      <p className="text-sm text-gray-400">Total Trades</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--quantum-purple)]">
                        {(qpaStatus.successRate * 100)?.toFixed(1) || '0.0'}%
                      </p>
                      <p className="text-sm text-gray-400">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--quantum-coral)]">
                        {qpaStatus.currentStrategy?.type || 'Scanning'}
                      </p>
                      <p className="text-sm text-gray-400">Strategy</p>
                    </div>
                  </div>
                  {qpaRevenue?.revenueStreams?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Revenue Streams</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {qpaRevenue.revenueStreams.slice(0, 3).map((stream: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-[var(--quantum-dark)]/30 rounded">
                            <span className="text-sm text-gray-300">{stream.description}</span>
                            <span className="text-sm font-medium text-[var(--quantum-emerald)]">
                              +${stream.amount?.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Cards */}
          <div className="mb-8">
            <StatsCards />
          </div>

          {/* Multi-Agent System Overview & Performance Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)]">Multi-Agent System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentStatus?.map((agent: any) => {
                    const Icon = getAgentIcon(agent.type);
                    return (
                      <div key={agent.type} className="flex items-center justify-between p-3 bg-[var(--quantum-dark)]/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[var(--quantum-emerald)]" />
                          </div>
                          <div>
                            <p className="font-medium">{getAgentName(agent.type)}</p>
                            <p className="text-sm text-gray-400">{agent.activity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-3 h-3 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
                          <p className="text-xs text-[var(--quantum-emerald)] mt-1">Active</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)]">Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Models */}
          <Card className="quantum-card mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[var(--quantum-purple)]">Top Performing AI Models</CardTitle>
              <Button variant="ghost" className="text-[var(--quantum-blue)] hover:text-[var(--quantum-blue)]/80">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              <LeaderboardTable />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[var(--quantum-blue)]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-[var(--quantum-blue)]" />
                </div>
                <h3 className="font-semibold mb-2">Explore Marketplace</h3>
                <p className="text-sm text-gray-400 mb-4">Browse and invest in AI trading models</p>
                <Button className="quantum-button-primary w-full">
                  Browse Models
                </Button>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[var(--quantum-purple)]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-[var(--quantum-purple)]" />
                </div>
                <h3 className="font-semibold mb-2">Upload Your Model</h3>
                <p className="text-sm text-gray-400 mb-4">Share your AI model and earn from investors</p>
                <Button className="quantum-button-secondary w-full">
                  Upload Model
                </Button>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-[var(--quantum-emerald)]" />
                </div>
                <h3 className="font-semibold mb-2">Learn & Collaborate</h3>
                <p className="text-sm text-gray-400 mb-4">Access educational resources and join projects</p>
                <Button className="bg-[var(--quantum-emerald)] hover:bg-[var(--quantum-emerald)]/80 w-full">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
