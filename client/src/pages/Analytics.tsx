import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Activity, Users, Brain, DollarSign, Target, Zap } from "lucide-react";

export default function Analytics() {
  const { data: marketStats } = useQuery({
    queryKey: ['/api/analytics/market-stats'],
  });

  const { data: topModels } = useQuery({
    queryKey: ['/api/analytics/top-models'],
  });

  const { data: agentActivities } = useQuery({
    queryKey: ['/api/agents/activities'],
  });

  // Generate mock data for charts
  const generateMarketTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      models: Math.floor(Math.random() * 50) + 800 + index * 10,
      volume: Math.floor(Math.random() * 100000) + 200000,
      performance: Math.random() * 20 + 80,
    }));
  };

  const generatePerformanceDistribution = () => {
    return [
      { range: '0-25%', count: 45, color: 'var(--quantum-red)' },
      { range: '25-50%', count: 128, color: 'var(--quantum-amber)' },
      { range: '50-75%', count: 234, color: 'var(--quantum-blue)' },
      { range: '75-100%', count: 189, color: 'var(--quantum-emerald)' },
      { range: '100%+', count: 67, color: 'var(--quantum-purple)' },
    ];
  };

  const generateAssetClassData = () => {
    return [
      { name: 'Cryptocurrency', value: 45, color: 'var(--quantum-blue)' },
      { name: 'Stocks', value: 30, color: 'var(--quantum-amber)' },
      { name: 'Forex', value: 15, color: 'var(--quantum-purple)' },
      { name: 'Commodities', value: 10, color: 'var(--quantum-emerald)' },
    ];
  };

  const generateRiskDistribution = () => {
    return [
      { risk: 'Low', models: 234, investment: 1200000 },
      { risk: 'Medium', models: 389, investment: 890000 },
      { risk: 'High', models: 124, investment: 560000 },
    ];
  };

  const marketTrendData = generateMarketTrendData();
  const performanceDistribution = generatePerformanceDistribution();
  const assetClassData = generateAssetClassData();
  const riskDistribution = generateRiskDistribution();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 quantum-text-gradient">Analytics Dashboard</h1>
            <p className="text-xl text-gray-300">
              Comprehensive insights into market trends, model performance, and platform analytics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Platform TVL</p>
                    <p className="text-2xl font-bold text-[var(--quantum-emerald)]">
                      ${marketStats?.totalInvestment ? parseFloat(marketStats.totalInvestment).toLocaleString() : '0'}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-[var(--quantum-emerald)]" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
                  <span className="text-sm text-[var(--quantum-emerald)]">+8.2%</span>
                  <span className="text-sm text-gray-400 ml-1">this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Models</p>
                    <p className="text-2xl font-bold text-[var(--quantum-blue)]">
                      {marketStats?.totalModels || 0}
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-[var(--quantum-blue)]" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
                  <span className="text-sm text-[var(--quantum-emerald)]">+23</span>
                  <span className="text-sm text-gray-400 ml-1">this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Global Investors</p>
                    <p className="text-2xl font-bold text-[var(--quantum-purple)]">
                      {marketStats?.totalInvestors?.toLocaleString() || 0}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[var(--quantum-purple)]" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
                  <span className="text-sm text-[var(--quantum-emerald)]">+156</span>
                  <span className="text-sm text-gray-400 ml-1">today</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Performance</p>
                    <p className="text-2xl font-bold text-[var(--quantum-amber)]">
                      +{marketStats?.bestRoi ? (parseFloat(marketStats.bestRoi) * 0.6).toFixed(1) : '0'}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-[var(--quantum-amber)]" />
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
                  <span className="text-sm text-[var(--quantum-emerald)]">+2.1%</span>
                  <span className="text-sm text-gray-400 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Market Trends */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--quantum-slate)', 
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="models" 
                        stroke="var(--quantum-blue)" 
                        fill="var(--quantum-blue)"
                        fillOpacity={0.3}
                        name="Active Models"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                      <XAxis 
                        dataKey="range" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--quantum-slate)', 
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="var(--quantum-purple)"
                        name="Models"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Asset Class Distribution */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Asset Class Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={assetClassData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {assetClassData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--quantum-slate)', 
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk vs Investment */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Risk vs Investment Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                      <XAxis 
                        dataKey="risk" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--quantum-slate)', 
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="models" fill="var(--quantum-blue)" name="Models" />
                      <Bar dataKey="investment" fill="var(--quantum-emerald)" name="Investment ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Models */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Performing Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topModels && topModels.length > 0 ? (
                  <div className="space-y-4">
                    {topModels.slice(0, 5).map((model: any, index: number) => (
                      <div key={model.id} className="flex items-center justify-between p-3 bg-[var(--quantum-dark)]/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-amber-600 text-white' :
                            'bg-[var(--quantum-purple)]/20 text-[var(--quantum-purple)]'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{model.name}</p>
                            <p className="text-sm text-gray-400">{model.totalInvestors} investors</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[var(--quantum-emerald)] font-bold">
                            +{parseFloat(model.currentRoi).toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-400">ROI</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No performance data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agent Activity Log */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)] flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  AI Agent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agentActivities && agentActivities.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                    {agentActivities.slice(0, 10).map((activity: any) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-2 bg-[var(--quantum-dark)]/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.agentType === 'market' ? 'bg-[var(--quantum-blue)]' :
                          activity.agentType === 'risk' ? 'bg-[var(--quantum-amber)]' :
                          activity.agentType === 'evaluation' ? 'bg-[var(--quantum-emerald)]' :
                          'bg-[var(--quantum-purple)]'
                        } animate-pulse`}></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.activity}</p>
                          <p className="text-xs text-gray-400 capitalize">{activity.agentType} agent</p>
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
