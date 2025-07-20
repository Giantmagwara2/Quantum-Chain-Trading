import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Brain, Trophy, Users, TrendingUp } from "lucide-react";

export default function StatsCards() {
  const { data: marketStats } = useQuery({
    queryKey: ['/api/analytics/market-stats'],
  });

  const { data: portfolioValue } = useQuery({
    queryKey: ['/api/portfolio/value'],
  });

  const stats = [
    {
      title: "Total Portfolio Value",
      value: portfolioValue ? `$${parseFloat(portfolioValue.totalValue).toLocaleString()}` : "$0",
      change: "+12.5%",
      icon: Wallet,
      color: "quantum-emerald",
    },
    {
      title: "Active AI Models",
      value: marketStats?.totalModels?.toLocaleString() || "0",
      change: "+23",
      icon: Brain,
      color: "quantum-blue",
    },
    {
      title: "Best Model ROI",
      value: marketStats ? `+${parseFloat(marketStats.bestRoi).toFixed(1)}%` : "0%",
      change: "QuantumNet v2.1",
      icon: Trophy,
      color: "quantum-purple",
    },
    {
      title: "Global Investors",
      value: marketStats?.totalInvestors?.toLocaleString() || "0",
      change: "+156",
      icon: Users,
      color: "quantum-amber",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="quantum-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className={`text-2xl font-bold text-[var(--${stat.color})]`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-[var(--${stat.color})]/20 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-[var(--${stat.color})]`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-[var(--quantum-emerald)] mr-1" />
              <span className="text-sm text-[var(--quantum-emerald)]">{stat.change}</span>
              <span className="text-sm text-gray-400 ml-1">this month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
