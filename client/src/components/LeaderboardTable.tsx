import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export default function LeaderboardTable() {
  const { data: topModels, isLoading } = useQuery({
    queryKey: ['/api/analytics/top-models'],
  });

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Loading top models...</div>;
  }

  if (!topModels || topModels.length === 0) {
    return <div className="text-center py-8 text-gray-400">No models available</div>;
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-[var(--quantum-emerald)]/20 text-[var(--quantum-emerald)]';
      case 'medium': return 'bg-[var(--quantum-amber)]/20 text-[var(--quantum-amber)]';
      case 'high': return 'bg-[var(--quantum-red)]/20 text-[var(--quantum-red)]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[var(--quantum-purple)]/20">
            <TableHead className="text-gray-400">Rank</TableHead>
            <TableHead className="text-gray-400">Model Name</TableHead>
            <TableHead className="text-gray-400">Developer</TableHead>
            <TableHead className="text-gray-400">ROI</TableHead>
            <TableHead className="text-gray-400">Sharpe Ratio</TableHead>
            <TableHead className="text-gray-400">Investors</TableHead>
            <TableHead className="text-gray-400">Risk Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topModels.map((model: any, index: number) => (
            <TableRow key={model.id} className="border-[var(--quantum-purple)]/10 hover:bg-[var(--quantum-purple)]/5">
              <TableCell>
                <div className="flex items-center">
                  <span className="text-lg">{getRankIcon(index)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[var(--quantum-emerald)]/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-[var(--quantum-emerald)]" />
                  </div>
                  <span className="font-medium">{model.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-300">@{model.developerId}</TableCell>
              <TableCell className="text-[var(--quantum-emerald)] font-bold">
                +{parseFloat(model.currentRoi).toFixed(1)}%
              </TableCell>
              <TableCell className="text-[var(--quantum-emerald)]">
                {parseFloat(model.sharpeRatio).toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-300">{model.totalInvestors}</TableCell>
              <TableCell>
                <Badge className={getRiskColor(model.riskLevel)}>
                  {model.riskLevel}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
