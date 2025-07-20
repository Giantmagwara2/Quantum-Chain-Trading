import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, RefreshCw } from "lucide-react";

export default function Portfolio() {
  const { data: investments, isLoading: investmentsLoading } = useQuery({
    queryKey: ['/api/investments'],
    refetchInterval: 30000,
  });

  const { data: portfolioValue } = useQuery({
    queryKey: ['/api/portfolio/value'],
    refetchInterval: 30000,
  });

  // Calculate portfolio analytics
  const totalInvested = investments?.reduce((sum: number, inv: any) => sum + parseFloat(inv.amount), 0) || 0;
  const currentValue = portfolioValue?.totalValue || 0;
  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  // Prepare data for charts
  const pieData = investments?.map((inv: any) => ({
    name: `Model ${inv.modelId.slice(-8)}`,
    value: parseFloat(inv.currentValue),
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  })) || [];

  const performanceData = investments?.map((inv: any, index: number) => {
    const invested = parseFloat(inv.amount);
    const current = parseFloat(inv.currentValue);
    const performance = ((current - invested) / invested) * 100;
    
    return {
      name: `Model ${index + 1}`,
      invested,
      current,
      performance,
    };
  }) || [];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-[var(--quantum-emerald)]';
      case 'medium': return 'text-[var(--quantum-amber)]';
      case 'high': return 'text-[var(--quantum-red)]';
      default: return 'text-gray-400';
    }
  };

  if (investmentsLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-[var(--quantum-slate)] rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-[var(--quantum-slate)] rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 quantum-text-gradient">Portfolio Management</h1>
              <p className="text-xl text-gray-300">Track your AI model investments and performance</p>
            </div>
            <Button className="quantum-button-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Rebalance Portfolio
            </Button>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">
                      ${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--quantum-blue)]/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[var(--quantum-blue)]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {returnPercentage >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[var(--quantum-red)] mr-1" />
                  )}
                  <span className={`text-sm font-medium ${returnPercentage >= 0 ? 'text-[var(--quantum-emerald)]' : 'text-[var(--quantum-red)]'}`}>
                    {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                  </span>
                  <span className="text-sm text-gray-400 ml-1">total return</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Invested</p>
                    <p className="text-2xl font-bold text-white">
                      ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--quantum-purple)]/20 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-[var(--quantum-purple)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Across {investments?.length || 0} models</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total P&L</p>
                    <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-[var(--quantum-emerald)]' : 'text-[var(--quantum-red)]'}`}>
                      {totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${totalReturn >= 0 ? 'bg-[var(--quantum-emerald)]/20' : 'bg-[var(--quantum-red)]/20'}`}>
                    <Percent className={`w-6 h-6 ${totalReturn >= 0 ? 'text-[var(--quantum-emerald)]' : 'text-[var(--quantum-red)]'}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Since inception</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Best Performer</p>
                    <p className="text-2xl font-bold text-[var(--quantum-emerald)]">
                      {investments && investments.length > 0 ? 
                        `+${Math.max(...investments.map((inv: any) => ((parseFloat(inv.currentValue) - parseFloat(inv.amount)) / parseFloat(inv.amount)) * 100)).toFixed(1)}%` : 
                        '0%'
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[var(--quantum-emerald)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Top model ROI</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)]">Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
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
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No investments yet</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="text-[var(--quantum-purple)]">Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                {performanceData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                        <XAxis 
                          dataKey="name" 
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
                        <Bar dataKey="performance" fill="var(--quantum-blue)" name="Performance %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No performance data available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Investment Details */}
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-[var(--quantum-purple)]">Investment Details</CardTitle>
            </CardHeader>
            <CardContent>
              {investments && investments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--quantum-purple)]/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Model ID</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Invested</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Current Value</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">P&L</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Performance</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((investment: any) => {
                        const invested = parseFloat(investment.amount);
                        const current = parseFloat(investment.currentValue);
                        const pnl = current - invested;
                        const performance = (pnl / invested) * 100;
                        
                        return (
                          <tr key={investment.id} className="border-b border-[var(--quantum-purple)]/10 hover:bg-[var(--quantum-purple)]/5">
                            <td className="py-4 px-4 font-mono text-sm">
                              {investment.modelId.slice(-12)}...
                            </td>
                            <td className="py-4 px-4">
                              ${invested.toFixed(2)}
                            </td>
                            <td className="py-4 px-4">
                              ${current.toFixed(2)}
                            </td>
                            <td className={`py-4 px-4 font-bold ${pnl >= 0 ? 'text-[var(--quantum-emerald)]' : 'text-[var(--quantum-red)]'}`}>
                              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                            </td>
                            <td className={`py-4 px-4 font-bold ${performance >= 0 ? 'text-[var(--quantum-emerald)]' : 'text-[var(--quantum-red)]'}`}>
                              {performance >= 0 ? '+' : ''}{performance.toFixed(2)}%
                            </td>
                            <td className="py-4 px-4 text-gray-400">
                              {new Date(investment.investmentDate).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Investments Yet</h3>
                  <p className="text-gray-400 mb-6">Start building your AI model portfolio today</p>
                  <Button className="quantum-button-primary">
                    Browse Marketplace
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
