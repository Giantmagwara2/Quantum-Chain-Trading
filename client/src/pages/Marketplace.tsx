import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ModelCard from "@/components/ModelCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Search, Filter, TrendingUp, Brain, DollarSign } from "lucide-react";

export default function Marketplace() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");

  const { data: models, isLoading, error } = useQuery({
    queryKey: ['/api/models'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const investmentMutation = useMutation({
    mutationFn: async (data: { modelId: string; amount: string }) => {
      return await apiRequest('POST', '/api/investments', data);
    },
    onSuccess: () => {
      toast({
        title: "Investment Successful",
        description: "Your investment has been processed successfully!",
      });
      setInvestmentDialogOpen(false);
      setInvestmentAmount("");
      queryClient.invalidateQueries({ queryKey: ['/api/models'] });
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio/value'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter models based on search and category
  const filteredModels = models?.filter((model: any) => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.developerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
                           model.assetClass.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  }) || [];

  const handleInvest = (modelId: string) => {
    const model = models?.find((m: any) => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      setInvestmentDialogOpen(true);
    }
  };

  const handleInvestmentSubmit = () => {
    if (!selectedModel || !investmentAmount) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(investmentAmount);
    const minInvestment = parseFloat(selectedModel.minInvestment);

    if (amount < minInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment is $${minInvestment}`,
        variant: "destructive",
      });
      return;
    }

    investmentMutation.mutate({
      modelId: selectedModel.id,
      amount: investmentAmount,
    });
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[var(--quantum-dark)] to-[var(--quantum-slate)] text-white">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <Card className="quantum-card">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-[var(--quantum-red)] mb-4">Error Loading Marketplace</h2>
                <p className="text-gray-400">Unable to load AI models. Please try again later.</p>
              </CardContent>
            </Card>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 quantum-text-gradient">AI Model Marketplace</h1>
            <p className="text-xl text-gray-300">
              Discover and invest in cutting-edge AI trading models from developers worldwide
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="quantum-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search models or developers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="quantum-input pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-[var(--quantum-blue)]" />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="quantum-input w-48">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                        <SelectItem value="stocks">Stock Market</SelectItem>
                        <SelectItem value="forex">Forex</SelectItem>
                        <SelectItem value="commodities">Commodities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="quantum-button-primary">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Sort by Performance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 text-[var(--quantum-blue)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--quantum-blue)]">{models?.length || 0}</div>
                <div className="text-gray-400">Available Models</div>
              </CardContent>
            </Card>
            
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-[var(--quantum-emerald)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--quantum-emerald)]">
                  {models?.length > 0 ? 
                    `+${Math.max(...models.map((m: any) => parseFloat(m.currentRoi))).toFixed(1)}%` : 
                    "0%"
                  }
                </div>
                <div className="text-gray-400">Best Performance</div>
              </CardContent>
            </Card>
            
            <Card className="quantum-card">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-[var(--quantum-purple)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--quantum-purple)]">$10</div>
                <div className="text-gray-400">Min Investment</div>
              </CardContent>
            </Card>
          </div>

          {/* Models Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="quantum-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-[var(--quantum-slate)] rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            <Card className="quantum-card">
              <CardContent className="p-8 text-center">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Models Found</h3>
                <p className="text-gray-400">
                  {searchTerm || categoryFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No AI models are currently available"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model: any) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onInvest={handleInvest}
                />
              ))}
            </div>
          )}

          {/* Investment Dialog */}
          <Dialog open={investmentDialogOpen} onOpenChange={setInvestmentDialogOpen}>
            <DialogContent className="bg-[var(--quantum-slate)] border border-[var(--quantum-purple)]/20">
              <DialogHeader>
                <DialogTitle className="quantum-text-gradient">
                  Invest in {selectedModel?.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="p-4 bg-[var(--quantum-dark)]/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Current ROI:</span>
                      <span className="text-[var(--quantum-emerald)] font-bold ml-2">
                        +{parseFloat(selectedModel?.currentRoi || "0").toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Risk Level:</span>
                      <span className="text-[var(--quantum-amber)] font-bold ml-2 capitalize">
                        {selectedModel?.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Min Investment:</span>
                      <span className="font-bold ml-2">${selectedModel?.minInvestment}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Investors:</span>
                      <span className="font-bold ml-2">{selectedModel?.totalInvestors}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="amount" className="text-gray-300">Investment Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Minimum $${selectedModel?.minInvestment}`}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="quantum-input mt-2"
                    min={selectedModel?.minInvestment}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setInvestmentDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleInvestmentSubmit}
                    disabled={investmentMutation.isPending}
                    className="flex-1 quantum-button-primary"
                  >
                    {investmentMutation.isPending ? "Processing..." : "Invest Now"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
